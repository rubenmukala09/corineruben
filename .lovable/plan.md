

# Internal Messaging System & Dashboard Integration Plan

## Problem
The 3 internal dashboards (Secretary, Coordinator, Staff) currently operate in isolation. There is no way for staff to send messages to each other. The `internal_messages` table exists in the database with proper RLS policies, but there is **zero UI** for composing, viewing, or managing internal messages. The dashboards only display unread message counts pointing to the client messages page (wrong table).

## What Will Be Built

### 1. Internal Messaging Page (`/portal/messages`)
A full internal messaging interface accessible from all 3 dashboards:
- **Inbox view**: List of received messages with sender name, subject, timestamp, read/unread status, urgency flag
- **Compose modal**: Select recipient from staff profiles, set subject, body, urgency, message type (direct/broadcast/announcement)
- **Message detail**: Click to read full message, auto-mark as read
- **Reply capability**: Reply to a message (creates new message to original sender)
- Recipient picker queries `profiles` table joined with `user_roles` to show only internal staff

### 2. Internal Messaging Hook (`/hooks/useInternalMessages.ts`)
A dedicated hook providing:
- `useInboxMessages(userId)` — fetch messages where `recipient_id = user`
- `useSentMessages(userId)` — fetch messages where `sender_id = user`
- `useSendInternalMessage()` — mutation to insert into `internal_messages`
- `useMarkInternalRead()` — mutation to update `is_read`
- Realtime subscription for instant message delivery

### 3. Dashboard Integration
Update all 3 dashboards to:
- Show correct unread count from `internal_messages` (Secretary and Coordinator currently don't query this table)
- Add a "Messages" stat card or notification indicator
- Link "Messages" quick access to `/portal/messages` instead of `/admin/clients/messages`
- Add realtime subscription so new messages appear without refresh

### 4. Realtime Setup
- Enable realtime on `internal_messages` table via migration
- Subscribe to new inserts where `recipient_id = current user` on each dashboard

### 5. Database Migration
- `ALTER PUBLICATION supabase_realtime ADD TABLE public.internal_messages;`
- Add RLS policy for admin to view all internal messages (currently only sender/recipient can see)

## Files to Create/Modify

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `src/hooks/useInternalMessages.ts` | Hook for CRUD on `internal_messages` |
| **Create** | `src/pages/portal/InternalMessages.tsx` | Full messaging inbox/compose UI |
| **Update** | `src/pages/portal/SecretaryDashboard.tsx` | Add unread internal messages count + link + realtime |
| **Update** | `src/pages/portal/CoordinatorDashboard.tsx` | Add unread internal messages count + link + realtime |
| **Update** | `src/pages/portal/StaffDashboard.tsx` | Fix messages link to `/portal/messages` + realtime |
| **Update** | `src/App.tsx` | Add `/portal/messages` route |
| **Migration** | Enable realtime on `internal_messages` | SQL migration |

## Design
- Same dark neon aesthetic (`bg-[#0B1120]`, `bg-[#1F2937]` cards, `border-gray-800/50`)
- No framer-motion animations — instant render
- Responsive layout: sidebar message list + detail pane on desktop, stacked on mobile
- Urgency indicator with red dot/badge for urgent messages
- Compose dialog using Radix Dialog component

## Data Flow
```text
Staff A (any dashboard) → Compose Message → INSERT internal_messages
                                                    ↓
                                          Realtime subscription
                                                    ↓
Staff B (any dashboard) → Notification badge updates → Click → /portal/messages → Read
```

