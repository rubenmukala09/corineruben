-- Site-wide settings persisted to DB (replaces local component state)
create table if not exists public.site_settings (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  value       text,
  group_name  text not null default 'general',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users(id)
);

alter table public.site_settings enable row level security;

create policy "Admin can manage site_settings"
  on public.site_settings
  for all
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

create policy "Public can read site_settings"
  on public.site_settings
  for select
  using (true);

-- Seed default values
insert into public.site_settings (key, value, group_name) values
  ('site_name',        'InVision Network',                                      'general'),
  ('tagline',          'AI Scam Protection & Business Solutions',               'general'),
  ('description',      'Empowering seniors and businesses with cutting-edge technology solutions and cybersecurity protection.', 'general'),
  ('phone',            '(407) 446-5749',                                        'contact'),
  ('primary_email',    'hello@invisionnetwork.org',                             'contact'),
  ('support_email',    'support@invisionnetwork.org',                           'contact'),
  ('business_email',   'consulting@invisionnetwork.org',                        'contact'),
  ('training_email',   'training@invisionnetwork.org',                          'contact'),
  ('address',          'Kettering, OH 45429',                                   'contact'),
  ('service_area',     'Serving Dayton, Kettering & Greater Miami Valley',      'contact'),
  ('timezone',         'America/New_York',                                      'general'),
  ('facebook',         '',                                                       'social'),
  ('linkedin',         '',                                                       'social'),
  ('instagram',        '',                                                       'social'),
  ('twitter',          '',                                                       'social'),
  ('youtube',          '',                                                       'social'),
  ('business_hours',   '{"monday":{"open":"09:00","close":"18:00","closed":false},"tuesday":{"open":"09:00","close":"18:00","closed":false},"wednesday":{"open":"09:00","close":"18:00","closed":false},"thursday":{"open":"09:00","close":"18:00","closed":false},"friday":{"open":"09:00","close":"18:00","closed":false},"saturday":{"open":"10:00","close":"15:00","closed":false},"sunday":{"open":"","close":"","closed":true}}', 'general'),
  ('maintenance_mode', 'false',                                                  'system'),
  ('og_image',         '/og-image.png',                                          'seo'),
  ('meta_title_template', '%s | InVision Network',                              'seo')
on conflict (key) do nothing;

-- Per-page content managed from admin (hero, SEO, sections)
create table if not exists public.page_content (
  id              uuid primary key default gen_random_uuid(),
  page_id         text not null,          -- e.g. 'home', 'about', 'services'
  section         text not null,          -- e.g. 'hero', 'seo', 'features'
  field           text not null,          -- e.g. 'headline', 'meta_title'
  value           text,
  is_published    boolean not null default true,
  updated_at      timestamptz not null default now(),
  updated_by      uuid references auth.users(id),
  unique (page_id, section, field)
);

alter table public.page_content enable row level security;

create policy "Admin can manage page_content"
  on public.page_content
  for all
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

create policy "Public can read published page_content"
  on public.page_content
  for select
  using (is_published = true);

-- Trigger: auto-update updated_at on site_settings
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute procedure public.touch_updated_at();

create trigger page_content_updated_at
  before update on public.page_content
  for each row execute procedure public.touch_updated_at();

-- Grant access to authenticated users for reading
grant select on public.site_settings to authenticated, anon;
grant select on public.page_content to authenticated, anon;
grant all on public.site_settings to authenticated;
grant all on public.page_content to authenticated;
