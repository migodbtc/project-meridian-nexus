/**
 * SEED FILE    00_auth.sql
 * TABLE        auth.users
 * ROWS         13
 *
 * Covers all user_role values used by the system.
 * Inserting here fires handle_new_user(), which auto-creates bare profile rows.
 * 01_profiles.sql then fills those rows in via ON CONFLICT DO UPDATE.
 *
 * Password for all seed accounts: Password123!
 *
 * UUID map (a0…001 → a0…00d):
 *   001–002  superadmin
 *   003–004  admin
 *   005–007  talent
 *   008–009  external_client
 *   00a      operations
 *   00b      finance
 *   00c      guest (unconfirmed)
 *   00d      admin
 */

insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) values
-- [001] superadmin — happy path, confirmed
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000001','authenticated','authenticated',
 'rafael.santos@polaris.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '90 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '90 days', now() - interval '90 days'),

-- [002] superadmin — happy path, confirmed
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000002','authenticated','authenticated',
 'diana.reyes@polaris.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '85 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '85 days', now() - interval '85 days'),

-- [003] admin — happy path, confirmed
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000003','authenticated','authenticated',
 'marco.garcia@polaris.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '80 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '80 days', now() - interval '80 days'),

-- [004] admin
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000004','authenticated','authenticated',
 'pia.villanueva@polaris.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '75 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '75 days', now() - interval '75 days'),

-- [005] talent
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000005','authenticated','authenticated',
 'carlos.mendoza@talent.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '60 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '60 days', now() - interval '60 days'),

-- [006] talent
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000006','authenticated','authenticated',
 'sofia.lim@talent.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '55 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '55 days', now() - interval '55 days'),

-- [007] talent
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000007','authenticated','authenticated',
 'jake.torres@talent.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '50 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '50 days', now() - interval '50 days'),

-- [008] external_client
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000008','authenticated','authenticated',
 'ben.nakamura@clients.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '45 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '45 days', now() - interval '45 days'),

-- [009] external_client
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-000000000009','authenticated','authenticated',
 'claire.wu@clients.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '40 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '40 days', now() - interval '40 days'),

-- [010] operations
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-00000000000a','authenticated','authenticated',
 'mario.devera@polaris.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '70 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '70 days', now() - interval '70 days'),

-- [011] finance
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-00000000000b','authenticated','authenticated',
 'tina.flores@polaris.dev', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '65 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '65 days', now() - interval '65 days'),

-- [012] guest — email_confirmed_at is null (unconfirmed signup)
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-00000000000c','authenticated','authenticated',
 'newuser@example.com', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 null,'{"provider":"email","providers":["email"]}','{}',
 now() - interval '2 days', now() - interval '2 days'),

-- [013] admin — legit admin account
('00000000-0000-0000-0000-000000000000','a0000000-0000-0000-0000-00000000000d','authenticated','authenticated',
 'migueljustin.bunda@gmail.com', '$2a$10$PznXR5VSG0kHGXvUqGBJcuDCi3DmBRiIl.DV4J5JlOD0SjJZImYHu',
 now() - interval '1 days','{"provider":"email","providers":["email"]}','{}',
 now() - interval '1 days', now() - interval '1 days')

on conflict (id) do nothing;
