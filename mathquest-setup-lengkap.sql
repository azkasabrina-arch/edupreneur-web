-- =====================================================================
-- MathQuest: SETUP LENGKAP (aman dijalankan berulang kali)
-- Cara pakai:
--   1. Buka Supabase -> pilih project yang URL-nya sama dengan SUPABASE_URL di app.js
--   2. Klik SQL Editor -> New query
--   3. Tempel SEMUA isi file ini -> klik Run
--   4. Kalau berhasil, muncul tabel hasil: status "OK"
-- File ini membuat semua tabel dan fungsi yang dipakai web (akun, kelas,
-- progres materi, kuis, dan hasil kuis). Data yang sudah ada tidak dihapus.
-- =====================================================================

-- ---------- TABEL ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  xp integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.kelas (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  kode text unique not null
);

create table if not exists public.anggota_kelas (
  user_id uuid references auth.users on delete cascade,
  kelas_id uuid references public.kelas on delete cascade,
  primary key (user_id, kelas_id)
);

create table if not exists public.progres (
  user_id uuid references auth.users on delete cascade,
  materi_urutan integer,
  skor integer not null,
  total integer not null,
  updated_at timestamptz default now(),
  primary key (user_id, materi_urutan)
);

create table if not exists public.kuis (
  id uuid primary key default gen_random_uuid(),
  pembuat uuid references auth.users on delete cascade default auth.uid(),
  judul text not null,
  deskripsi text,
  soal jsonb not null,
  kode text unique not null default upper(substr(md5(gen_random_uuid()::text), 1, 6)),
  created_at timestamptz default now()
);

create table if not exists public.hasil_kuis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade default auth.uid(),
  kuis_id uuid,
  judul text,
  skor integer not null,
  total integer not null,
  created_at timestamptz default now()
);

-- ---------- KEAMANAN BARIS (RLS) ----------
alter table public.profiles enable row level security;
alter table public.kelas enable row level security;
alter table public.anggota_kelas enable row level security;
alter table public.progres enable row level security;
alter table public.kuis enable row level security;
alter table public.hasil_kuis enable row level security;

drop policy if exists "profil sendiri dibaca" on public.profiles;
create policy "profil sendiri dibaca" on public.profiles for select using (id = auth.uid());
-- XP hanya boleh berubah lewat fungsi di bawah, jadi izin ubah langsung dicabut
drop policy if exists "profil sendiri diubah" on public.profiles;

drop policy if exists "anggota sendiri dibaca" on public.anggota_kelas;
create policy "anggota sendiri dibaca" on public.anggota_kelas for select using (user_id = auth.uid());

drop policy if exists "kelas milik anggota" on public.kelas;
create policy "kelas milik anggota" on public.kelas for select
  using (exists (select 1 from public.anggota_kelas a where a.kelas_id = kelas.id and a.user_id = auth.uid()));

drop policy if exists "progres sendiri dibaca" on public.progres;
create policy "progres sendiri dibaca" on public.progres for select using (user_id = auth.uid());

drop policy if exists "kuis sendiri dibaca" on public.kuis;
create policy "kuis sendiri dibaca" on public.kuis for select using (pembuat = auth.uid());
drop policy if exists "kuis sendiri dibuat" on public.kuis;
create policy "kuis sendiri dibuat" on public.kuis for insert with check (pembuat = auth.uid());
drop policy if exists "kuis sendiri dihapus" on public.kuis;
create policy "kuis sendiri dihapus" on public.kuis for delete using (pembuat = auth.uid());

drop policy if exists "hasil sendiri dibaca" on public.hasil_kuis;
create policy "hasil sendiri dibaca" on public.hasil_kuis for select using (user_id = auth.uid());

-- ---------- FUNGSI ----------
-- Profil dibuat otomatis saat akun baru terdaftar
create or replace function public.buat_profil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
exception when unique_violation then
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)) || '_' || substr(md5(random()::text), 1, 4))
  on conflict do nothing;
  return new;
end $$;

drop trigger if exists saat_daftar on auth.users;
create trigger saat_daftar after insert on auth.users
  for each row execute function public.buat_profil();

-- Membuatkan profil untuk akun lama yang belum punya
create or replace function public.pastikan_profil() returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  select u.id, coalesce(u.raw_user_meta_data->>'username', split_part(u.email, '@', 1)) || '_' || substr(md5(u.id::text), 1, 4)
  from auth.users u where u.id = auth.uid()
  on conflict do nothing;
end $$;

insert into public.profiles (id, username)
select u.id, coalesce(u.raw_user_meta_data->>'username', split_part(u.email, '@', 1))
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
on conflict do nothing;

-- Gabung kelas lewat kode kelas
create or replace function public.gabung_kelas(kode_input text) returns text
language plpgsql security definer set search_path = public as $$
declare k public.kelas%rowtype;
begin
  select * into k from public.kelas where upper(kode) = upper(trim(kode_input));
  if not found then raise exception 'Kode tidak ditemukan'; end if;
  insert into public.anggota_kelas (user_id, kelas_id) values (auth.uid(), k.id) on conflict do nothing;
  return k.nama;
end $$;

-- Menyimpan skor latihan materi dan menambah XP (10 XP per jawaban benar baru)
create or replace function public.simpan_latihan(m integer, s integer, t integer) returns integer
language plpgsql security definer set search_path = public as $$
declare lama integer; tambah integer; xp_baru integer;
begin
  perform public.pastikan_profil();
  select skor into lama from public.progres where user_id = auth.uid() and materi_urutan = m;
  tambah := greatest(s - coalesce(lama, 0), 0) * 10;
  insert into public.progres (user_id, materi_urutan, skor, total) values (auth.uid(), m, s, t)
  on conflict (user_id, materi_urutan) do update
    set skor = greatest(progres.skor, excluded.skor), total = excluded.total, updated_at = now();
  update public.profiles set xp = xp + tambah where id = auth.uid() returning xp into xp_baru;
  return coalesce(xp_baru, 0);
end $$;

-- Mengerjakan kuis lewat kode (kuis lain tidak bisa dilihat tanpa kode)
create or replace function public.ambil_kuis(kode_input text) returns setof public.kuis
language sql security definer set search_path = public as $$
  select * from public.kuis where kode = upper(trim(kode_input));
$$;

-- Menyimpan hasil kuis dan menambah XP (5 XP per jawaban benar)
create or replace function public.simpan_hasil_kuis(kid uuid, jdl text, s integer, t integer) returns integer
language plpgsql security definer set search_path = public as $$
declare xp_baru integer;
begin
  perform public.pastikan_profil();
  insert into public.hasil_kuis (user_id, kuis_id, judul, skor, total) values (auth.uid(), kid, jdl, s, t);
  update public.profiles set xp = xp + s * 5 where id = auth.uid() returning xp into xp_baru;
  return coalesce(xp_baru, 0);
end $$;

-- ---------- IZIN AKSES ----------
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant execute on all functions in schema public to authenticated;

-- ---------- DATA AWAL ----------
insert into public.kelas (nama, kode) values ('Kelas VIII Demo', 'MATH8') on conflict (kode) do nothing;

-- Memuat ulang cache skema supaya tabel baru langsung terbaca oleh web
notify pgrst, 'reload schema';

select 'OK: semua tabel dan fungsi MathQuest siap' as status,
       (select count(*) from public.kuis) as jumlah_kuis,
       (select count(*) from public.profiles) as jumlah_profil;
