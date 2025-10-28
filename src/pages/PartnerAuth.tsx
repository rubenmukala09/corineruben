import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Store, Users, Truck } from 'lucide-react';

const PartnerAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Sign in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [partnerType, setPartnerType] = useState<'vendor' | 'affiliate' | 'distributor'>('vendor');
  const [description, setDescription] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roleData?.role === 'partner') {
        navigate('/partner/dashboard');
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (roleData?.role === 'partner') {
          toast({ title: 'Success', description: 'Signed in successfully!' });
          navigate('/partner/dashboard');
        } else {
          await supabase.auth.signOut();
          toast({ 
            title: 'Access Denied', 
            description: 'This account is not registered as a partner.',
            variant: 'destructive'
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call secure Edge Function for partner signup with validation
      const { data, error } = await supabase.functions.invoke('partner-signup', {
        body: {
          email: signupEmail,
          password: signupPassword,
          partnerType,
          businessName,
          businessEmail,
          businessPhone,
          description,
        },
      });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || 'Signup failed');
      }

      toast({
        title: 'Success!',
        description: 'Your partner account has been created. Please sign in to continue.',
      });

      // Now sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: signupEmail,
        password: signupPassword,
      });

      if (signInError) throw signInError;

      navigate('/partner/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Sign up failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const partnerTypes = [
    { value: 'vendor', label: 'Vendor', icon: Store, description: 'Sell your products directly' },
    { value: 'affiliate', label: 'Affiliate', icon: Users, description: 'Earn commissions on referrals' },
    { value: 'distributor', label: 'Distributor', icon: Truck, description: 'Wholesale distribution' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Partner Portal</CardTitle>
          <CardDescription className="text-center">
            Join our partner program and grow your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="partner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label>Partner Type</Label>
                  <Select value={partnerType} onValueChange={(v: any) => setPartnerType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {partnerTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Account Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    placeholder="Your Company LLC"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input
                      id="business-email"
                      type="email"
                      placeholder="contact@business.com"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Business Phone</Label>
                    <Input
                      id="business-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Partner Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerAuth;
