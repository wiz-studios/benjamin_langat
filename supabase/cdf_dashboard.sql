-- Create table for CDF Allocations
create table if not exists public.cdf_allocations (
    id uuid not null default gen_random_uuid(),
    financial_year text not null,
    amount_allocated numeric not null,
    amount_disbursed numeric default 0,
    status text default 'Allocated',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint cdf_allocations_pkey primary key (id),
    constraint cdf_allocations_financial_year_key unique (financial_year)
);

-- Create table for CDF Projects
create table if not exists public.cdf_projects (
    id uuid not null default gen_random_uuid(),
    title text not null,
    description text,
    sector text not null, -- e.g. Education, Security, Health
    financial_year text, -- e.g. 2023/2024
    amount numeric,
    status text default 'Ongoing', -- e.g. Completed, Ongoing, Planned
    location text,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint cdf_projects_pkey primary key (id)
);

-- Enable RLS
alter table public.cdf_allocations enable row level security;
alter table public.cdf_projects enable row level security;

-- Policies for public read access
create policy "Allow public read access on cdf_allocations"
on public.cdf_allocations for select
to public
using (true);

create policy "Allow public read access on cdf_projects"
on public.cdf_projects for select
to public
using (true);

-- Policies for admin write access (using service role or authenticated admin logic if implemented)
-- For now, assuming standard authenticated users logic or similar to other tables
create policy "Allow authenticated insert on cdf_allocations"
on public.cdf_allocations for insert
to authenticated
with check (true);

create policy "Allow authenticated update on cdf_allocations"
on public.cdf_allocations for update
to authenticated
using (true);

create policy "Allow authenticated insert on cdf_projects"
on public.cdf_projects for insert
to authenticated
with check (true);

create policy "Allow authenticated update on cdf_projects"
on public.cdf_projects for update
to authenticated
using (true);
