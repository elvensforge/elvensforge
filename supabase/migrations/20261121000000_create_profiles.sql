begin;

create table public.profiles (
  clerk_user_id text primary key,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on public.profiles from public, anon, authenticated;
grant select on public.profiles to authenticated;
grant insert (clerk_user_id) on public.profiles to authenticated;

create policy "Read own profile"
  on public.profiles for select
  to authenticated
  using (clerk_user_id = (select auth.jwt() ->> 'sub'));

create policy "Create own profile"
  on public.profiles for insert
  to authenticated
  with check (clerk_user_id = (select auth.jwt() ->> 'sub'));

commit;
