-- 1. Create a storage bucket for files
insert into storage.buckets (id, name, public) values ('uploads', 'uploads', true);

-- 2. Create the folders table
create table public.folders (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    parent_id uuid references public.folders(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create the files table
create table public.files (
    id uuid default gen_random_uuid() primary key,
    filename text not null,
    original_filename text not null,
    file_type text not null,
    mime_type text not null,
    file_size bigint not null,
    storage_path text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS (Row Level Security) - currently set to allow all operations for simplicity (you can restrict later)
alter table public.folders enable row level security;
alter table public.files enable row level security;

create policy "Allow all operations on folders" on public.folders for all using (true);
create policy "Allow all operations on files" on public.files for all using (true);

-- 5. Storage Policies
create policy "Allow public read on uploads" on storage.objects for select using ( bucket_id = 'uploads' );
create policy "Allow insert on uploads" on storage.objects for insert with check ( bucket_id = 'uploads' );
create policy "Allow delete on uploads" on storage.objects for delete using ( bucket_id = 'uploads' );
