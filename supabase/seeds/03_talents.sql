/**
 * SEED FILE    03_talents.sql
 * TABLE        public.talents
 * ROWS         12
 *
 * UUIDs prefixed b0…
 * Rows 001–003 linked to talent-role profiles (a0…005–007).
 * Rows 004–012 unlinked (admin-managed, profile_id null).
 *
 * Happy paths (001–003): all optional fields filled, status active/onboarding, is_verified.
 * Sparse rows: missing headline, bio, hourly_rate, availability, etc.
 */

insert into public.talents (
    id, profile_id, status,
    display_name, headline, bio,
    location, timezone, primary_role,
    skills, years_experience, hourly_rate, currency,
    availability, is_verified, onboarded_at, offboarded_at
) values

-- [001] linked to carlos.mendoza — happy path
('b0000000-0000-0000-0000-000000000001','a0000000-0000-0000-0000-000000000005','active',
 'Carlos Mendoza','Full-Stack Dev | React & Node.js',
 'Senior full-stack developer with 5 years building SaaS products. Proficient in React, TypeScript, Node.js, and PostgreSQL.',
 'Cebu City, Philippines','Asia/Manila','Full-Stack Developer',
 ARRAY['React','TypeScript','Node.js','PostgreSQL','Docker'],
 5,45.00,'USD','Full-time (40hrs/week)',true,
 now() - interval '55 days',null),

-- [002] linked to sofia.lim — happy path
('b0000000-0000-0000-0000-000000000002','a0000000-0000-0000-0000-000000000006','active',
 'Sofia Lim','UI/UX Designer | Figma & Design Systems',
 'Product designer with 4 years crafting user-centered interfaces. Skilled in Figma, design systems, and usability testing.',
 'Davao City, Philippines','Asia/Manila','UI/UX Designer',
 ARRAY['Figma','UX Research','Design Systems','Prototyping'],
 4,38.00,'USD','Part-time (20hrs/week)',true,
 now() - interval '50 days',null),

-- [003] linked to jake.torres — happy path, onboarding
('b0000000-0000-0000-0000-000000000003','a0000000-0000-0000-0000-000000000007','onboarding',
 'Jake Torres','Backend Engineer | Python & FastAPI',
 'Backend engineer specializing in Python microservices and REST APIs. Familiar with FastAPI, Redis, and AWS Lambda.',
 'Manila, Philippines','Asia/Manila','Backend Engineer',
 ARRAY['Python','FastAPI','Redis','AWS'],
 3,35.00,'USD','Contract-based',false,null,null),

-- [004] unlinked — no headline, no bio, no hourly_rate
('b0000000-0000-0000-0000-000000000004',null,'active',
 'Ana Cruz',null,null,
 'Pasig, Philippines','Asia/Manila','Data Analyst',
 ARRAY['Excel','SQL','Power BI'],2,null,null,
 'Full-time',false,now() - interval '40 days',null),

-- [005] unlinked — no location, no bio
('b0000000-0000-0000-0000-000000000005',null,'active',
 'Ryan Ong','Mobile Developer | Flutter',null,
 null,'Asia/Manila','Mobile Developer',
 ARRAY['Flutter','Dart','Firebase'],3,40.00,'USD',
 null,true,now() - interval '35 days',null),

-- [006] unlinked — paused, no availability, no rate
('b0000000-0000-0000-0000-000000000006',null,'paused',
 'Lena Sy','Graphic Designer | Branding',
 'Freelance designer focused on brand identity and print media.',
 'Cebu City, Philippines','Asia/Manila','Graphic Designer',
 ARRAY['Illustrator','Photoshop','Branding'],6,null,null,
 null,false,now() - interval '80 days',null),

-- [007] unlinked — onboarding, almost no data
('b0000000-0000-0000-0000-000000000007',null,'onboarding',
 'Kevin Tan',null,null,null,'Asia/Manila',null,
 ARRAY[]::text[],null,null,null,null,false,null,null),

-- [008] unlinked — no years_experience, no currency
('b0000000-0000-0000-0000-000000000008',null,'active',
 'Mia Ramos','Cloud Engineer | AWS & GCP',
 'Cloud infrastructure engineer with expertise in multi-cloud deployments.',
 'Taguig, Philippines','Asia/Manila','Cloud Engineer',
 ARRAY['AWS','GCP','Terraform','Kubernetes'],null,55.00,null,
 'Full-time',true,now() - interval '20 days',null),

-- [009] unlinked — active, short bio
('b0000000-0000-0000-0000-000000000009',null,'active',
 'Dino Reyes','QA Engineer','Manual and automated QA engineer.',
 'Quezon City, Philippines','Asia/Manila','QA Engineer',
 ARRAY['Selenium','Cypress','JIRA'],4,30.00,'USD',
 'Part-time',false,now() - interval '28 days',null),

-- [010] unlinked — offboarded
('b0000000-0000-0000-0000-00000000000a',null,'offboarded',
 'Cris Bautista','Project Manager',
 'Experienced PM with agile and scrum background.',
 'Makati, Philippines','Asia/Manila','Project Manager',
 ARRAY['JIRA','Confluence','Agile'],8,60.00,'USD',
 null,true,now() - interval '120 days',now() - interval '10 days'),

-- [011] unlinked — active, no primary_role, no bio
('b0000000-0000-0000-0000-00000000000b',null,'active',
 'Tess Aquino',null,null,
 'Iloilo City, Philippines','Asia/Manila',null,
 ARRAY['WordPress','PHP','MySQL'],7,25.00,'USD',
 'Full-time',false,now() - interval '15 days',null),

-- [012] unlinked — paused, minimal
('b0000000-0000-0000-0000-00000000000c',null,'paused',
 'Noel Castillo','Video Editor | Adobe Suite',null,
 'Baguio City, Philippines','Asia/Manila','Video Editor',
 ARRAY['Premiere Pro','After Effects'],3,null,null,
 null,false,now() - interval '45 days',null)

on conflict (id) do nothing;
