/**
 * SEED FILE    01_profiles.sql
 * TABLE        public.profiles
 * ROWS         12
 *
 * handle_new_user() fires on 00_auth.sql and inserts bare rows (id only).
 * This seed upserts those rows to fill in names, roles, and optional fields.
 * ON CONFLICT (id) DO UPDATE makes this idempotent.
 *
 * Happy paths (rows 001–003): fully populated, all optional fields present.
 * Sparse rows: missing middle_name, phone, address, bio, etc.
 */

insert into public.profiles (
    id, role,
    first_name, middle_name, last_name, suffix,
    username, phone, birthday,
    address_line1, address_line2, city, province, country,
    bio
) values

-- [001] superadmin — happy path: every field filled
('a0000000-0000-0000-0000-000000000001','superadmin',
 'Rafael','Jose','Santos',null,
 'rafael_santos','+639171234001','1985-03-14',
 '12 Acacia St','Brgy. Poblacion','Makati','Metro Manila','Philippines',
 'System owner and principal architect of Polaris.'),

-- [002] superadmin — happy path: every field filled
('a0000000-0000-0000-0000-000000000002','superadmin',
 'Diana','Marie','Reyes',null,
 'diana_reyes','+639171234002','1988-07-22',
 '88 Sampaguita Ave',null,'Quezon City','Metro Manila','Philippines',
 'Co-founder and lead systems administrator.'),

-- [003] admin — happy path: every field filled
('a0000000-0000-0000-0000-000000000003','admin',
 'Marco','Luis','Garcia',null,
 'marco_garcia','+639171234003','1990-11-05',
 '5 Narra Blvd','Unit 3B','Taguig','Metro Manila','Philippines',
 'Operations admin, manages talent onboarding and client assignments.'),

-- [004] admin — no middle name, no phone, no bio
('a0000000-0000-0000-0000-000000000004','admin',
 'Pia',null,'Villanueva',null,
 'pia_v',null,'1992-04-18',
 null,null,'Pasig','Metro Manila','Philippines',
 null),

-- [005] talent — no birthday, no address
('a0000000-0000-0000-0000-000000000005','talent',
 'Carlos',null,'Mendoza',null,
 'carlos_mendoza','+639171234005',null,
 null,null,'Cebu City','Cebu','Philippines',
 'Full-stack developer with 5 years experience in React and Node.'),

-- [006] talent — no address_line2, no province
('a0000000-0000-0000-0000-000000000006','talent',
 'Sofia','Ana','Lim',null,
 'sofia_lim','+639171234006','1995-09-30',
 '23 Mahogany St',null,'Davao City',null,'Philippines',
 'UI/UX designer specializing in product design and Figma workflows.'),

-- [007] talent — minimal: no phone, no bio, no address at all
('a0000000-0000-0000-0000-000000000007','talent',
 'Jake',null,'Torres',null,
 'jake_t',null,'1993-01-17',
 null,null,null,null,'Philippines',
 null),

-- [008] external_client — no birthday, no bio
('a0000000-0000-0000-0000-000000000008','external_client',
 'Ben',null,'Nakamura',null,
 'ben_nakamura','+819011234001',null,
 '3F Roppongi Hills','Minato-ku','Tokyo',null,'Japan',
 null),

-- [009] external_client — no address at all
('a0000000-0000-0000-0000-000000000009','external_client',
 'Claire','Ying','Wu',null,
 'claire_wu','+85291234001','1991-06-12',
 null,null,null,null,'Hong Kong',
 'Startup founder looking for development talent.'),

-- [010] operations — no middle name, minimal address
('a0000000-0000-0000-0000-00000000000a','operations',
 'Mario',null,'De Vera',null,
 'mario_devera','+639171234010','1987-08-03',
 '9 Lantana Lane',null,'Manila','Metro Manila','Philippines',
 null),

-- [011] finance — no username, no address
('a0000000-0000-0000-0000-00000000000b','finance',
 'Tina','Rose','Flores',null,
 null,'+639171234011','1989-12-25',
 null,null,null,null,'Philippines',
 null),

-- [012] guest — bare minimum: only role is set, all optional fields null
('a0000000-0000-0000-0000-00000000000c','guest',
 null,null,null,null,
 null,null,null,
 null,null,null,null,'Philippines',
 null)

on conflict (id) do update set
    role         = excluded.role,
    first_name   = excluded.first_name,
    middle_name  = excluded.middle_name,
    last_name    = excluded.last_name,
    suffix       = excluded.suffix,
    username     = excluded.username,
    phone        = excluded.phone,
    birthday     = excluded.birthday,
    address_line1= excluded.address_line1,
    address_line2= excluded.address_line2,
    city         = excluded.city,
    province     = excluded.province,
    country      = excluded.country,
    bio          = excluded.bio,
    updated_at   = now();
