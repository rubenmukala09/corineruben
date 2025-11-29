import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SuspiciousPattern {
  type: 'multiple_failed_logins' | 'privilege_escalation' | 'unusual_access' | 'mass_export';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  ip_address?: string;
  user_id?: string;
  timestamp: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Detect suspicious patterns
    const patterns: SuspiciousPattern[] = [];

    // 1. Check for multiple failed logins (>5 in last 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: failedLogins, error: failError } = await supabase
      .from('auth_audit_logs')
      .select('ip_address, email')
      .eq('success', false)
      .eq('event_type', 'login')
      .gte('created_at', fifteenMinutesAgo);

    if (!failError && failedLogins) {
      const ipCounts = new Map<string, number>();
      failedLogins.forEach(log => {
        if (log.ip_address) {
          ipCounts.set(log.ip_address, (ipCounts.get(log.ip_address) || 0) + 1);
        }
      });

      ipCounts.forEach((count, ip) => {
        if (count >= 5) {
          patterns.push({
            type: 'multiple_failed_logins',
            severity: count >= 10 ? 'critical' : 'high',
            details: `${count} failed login attempts from ${ip} in the last 15 minutes`,
            ip_address: ip,
            timestamp: new Date().toISOString(),
          });
        }
      });
    }

    // 2. Check for privilege escalation attempts (role changes outside business hours)
    const now = new Date();
    const hour = now.getHours();
    const isBusinessHours = hour >= 8 && hour <= 18;

    if (!isBusinessHours) {
      const { data: roleChanges, error: roleError } = await supabase
        .from('auth_audit_logs')
        .select('*')
        .in('event_type', ['role_assignment', 'role_change'])
        .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

      if (!roleError && roleChanges && roleChanges.length > 0) {
        patterns.push({
          type: 'privilege_escalation',
          severity: 'high',
          details: `${roleChanges.length} role modification(s) detected outside business hours (${hour}:00)`,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // 3. Check for unusual access patterns (same user accessing many sensitive tables rapidly)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: accessLogs, error: accessError } = await supabase
      .from('activity_log')
      .select('user_id, entity_type')
      .in('entity_type', ['profiles', 'clients', 'healthcare_professional_profiles', 'senior_client_profiles'])
      .gte('created_at', oneHourAgo);

    if (!accessError && accessLogs) {
      const userAccess = new Map<string, Set<string>>();
      accessLogs.forEach(log => {
        if (log.user_id && log.entity_type) {
          if (!userAccess.has(log.user_id)) {
            userAccess.set(log.user_id, new Set());
          }
          userAccess.get(log.user_id)!.add(log.entity_type);
        }
      });

      userAccess.forEach((tables, userId) => {
        if (tables.size >= 3) {
          patterns.push({
            type: 'unusual_access',
            severity: 'medium',
            details: `User accessed ${tables.size} different sensitive tables in the last hour`,
            user_id: userId,
            timestamp: new Date().toISOString(),
          });
        }
      });
    }

    // 4. Check for mass data exports (large SELECT queries)
    const { data: selectQueries, error: selectError } = await supabase
      .from('activity_log')
      .select('user_id, entity_type')
      .eq('action', 'SELECT')
      .gte('created_at', oneHourAgo);

    if (!selectError && selectQueries) {
      const userQueries = new Map<string, number>();
      selectQueries.forEach(log => {
        if (log.user_id) {
          userQueries.set(log.user_id, (userQueries.get(log.user_id) || 0) + 1);
        }
      });

      userQueries.forEach((count, userId) => {
        if (count >= 50) {
          patterns.push({
            type: 'mass_export',
            severity: 'high',
            details: `${count} SELECT queries from single user in the last hour - possible data export attempt`,
            user_id: userId,
            timestamp: new Date().toISOString(),
          });
        }
      });
    }

    // If critical or high severity patterns detected, send alert email
    const criticalPatterns = patterns.filter(p => p.severity === 'critical' || p.severity === 'high');
    
    if (criticalPatterns.length > 0) {
      const alertHtml = `
        <h1>🚨 Security Alert - InVision Network</h1>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Severity:</strong> ${criticalPatterns.some(p => p.severity === 'critical') ? 'CRITICAL' : 'HIGH'}</p>
        
        <h2>Detected Threats:</h2>
        <ul>
          ${criticalPatterns.map(p => `
            <li>
              <strong>[${p.severity.toUpperCase()}] ${p.type.replace(/_/g, ' ').toUpperCase()}</strong><br/>
              ${p.details}<br/>
              ${p.ip_address ? `IP: ${p.ip_address}<br/>` : ''}
              ${p.user_id ? `User ID: ${p.user_id}<br/>` : ''}
              <em>${new Date(p.timestamp).toLocaleString()}</em>
            </li>
          `).join('')}
        </ul>
        
        <h3>Recommended Actions:</h3>
        <ul>
          <li>Review security logs immediately at /admin/system-health</li>
          <li>Verify all recent authentication attempts</li>
          <li>Check user role assignments</li>
          <li>Consider temporarily blocking suspicious IP addresses</li>
        </ul>
        
        <p><strong>This is an automated alert from the InVision Network security monitoring system.</strong></p>
      `;

      // Send alert to admin team
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "InVision Security <security@invisionnetwork.org>",
          to: ["admin@invisionnetwork.org"],
          subject: `🚨 Security Alert: ${criticalPatterns.length} Threat(s) Detected`,
          html: alertHtml,
        }),
      });

      console.log(`Security alert sent for ${criticalPatterns.length} critical patterns`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        patterns_detected: patterns.length,
        critical_alerts: criticalPatterns.length,
        patterns: patterns,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in security-alert function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
