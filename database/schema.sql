-- Users table
create table users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    password_hash text not null,
    created_at timestamp with time zone default now()
);

-- Goals table
create table goals (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references users(id) on delete cascade,
    title text not null,
    description_content text not null,
    is_completed boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS) on goals table
alter table goals enable row level security;

-- Policy: Allow users to view (SELECT) their own goals
create policy "Users can view their own goals"
on goals
for select
using (auth.uid() = owner_id);

-- Policy: Allow users to insert goals with their own id as owner
create policy "Users can insert their own goals"
on goals
for insert
with check (auth.uid() = owner_id);

-- Policy: Allow users to update their own goals
create policy "Users can update their own goals"
on goals
for update
using (auth.uid() = owner_id);

-- Policy: Allow users to delete their own goals
create policy "Users can delete their own goals"
on goals
for delete
using (auth.uid() = owner_id);