create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Anyone can insert (submit a contact form)
create policy "Anyone can submit contact messages"
  on public.contact_messages for insert
  with check (true);

-- Only authenticated users (admins) can read
create policy "Authenticated users can read contact messages"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

-- Only authenticated users can update (mark as read)
create policy "Authenticated users can update contact messages"
  on public.contact_messages for update
  using (auth.role() = 'authenticated');

-- Only authenticated users can delete
create policy "Authenticated users can delete contact messages"
  on public.contact_messages for delete
  using (auth.role() = 'authenticated');
