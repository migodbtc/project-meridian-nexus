/**
 * SEED FILE    04_clients.sql
 * TABLE        public.clients
 * ROWS         12
 *
 * UUIDs prefixed c0…
 * Rows 001–002: linked to external_client profiles (a0…008, a0…009).
 * Rows 003–012: unlinked (admin-managed, profile_id null).
 *
 * Mix of client_type 'individual' and 'company'.
 * Constraint: type='company' requires company_name to be non-null.
 *
 * Talent-to-client linkage is now managed via contracts table.
 *
 * Happy paths (001–003): all optional fields filled, status active.
 * Sparse rows: missing address, phone, notes, etc.
 */

insert into public.clients (
    id, profile_id,
    status, type,
    display_name, company_name,
    contact_email, contact_phone,
    address_line1, address_line2, city, province, country,
    notes
) values

-- [001] linked to ben.nakamura — happy path, company
('c0000000-0000-0000-0000-000000000001',
 'a0000000-0000-0000-0000-000000000008',
 'active','company',
 'Ben Nakamura','Nakamura Digital K.K.',
 'ben.nakamura@clients.dev','+819011234001',
 '3F Roppongi Hills','Minato-ku','Tokyo',null,'Japan',
 'Long-term contract client. Prefers async communication via email.'),

-- [002] linked to claire.wu — happy path, individual
('c0000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000009',
 'active','individual',
 'Claire Wu',null,
 'claire.wu@clients.dev','+85291234001',
 '12F One Island East','Quarry Bay','Hong Kong',null,'Hong Kong',
 'Startup founder. Prefers weekly Zoom check-ins.'),

-- [003] unlinked — happy path, company, all fields filled
('c0000000-0000-0000-0000-000000000003',
 null,
 'active','company',
 'Vertex Solutions Inc.','Vertex Solutions Inc.',
 'procurement@vertexsolutions.ph','+63289001234',
 '8F Ayala Tower One','Ayala Ave','Makati','Metro Manila','Philippines',
 'Referred by admin Marco. Handles procurement for 3 subsidiaries.'),

-- [004] unlinked — individual, no phone, no address
('c0000000-0000-0000-0000-000000000004',
 null,
 'active','individual',
 'James Uy',null,
 'james.uy@gmail.com',null,
 null,null,null,null,'Philippines',
 null),

-- [005] unlinked — company, no address_line2, no notes
('c0000000-0000-0000-0000-000000000005',
 null,
 'pending','company',
 'Brightline Media','Brightline Media Pte. Ltd.',
 'ops@brightlinemedia.sg','+6591234567',
 '1 Fusionopolis Way',null,'Singapore',null,'Singapore',
 null),

-- [006] unlinked — individual, pending, no phone, no address
('c0000000-0000-0000-0000-000000000006',
 null,
 'pending','individual',
 'Patricia Lam',null,
 'plam@outlook.com',null,
 null,null,null,null,'Malaysia',
 'Referred through talent Sofia. Awaiting contract draft approval.'),

-- [007] unlinked — company, inactive, no talent assigned
('c0000000-0000-0000-0000-000000000007',
 null,
 'inactive','company',
 'RedPeak Ventures','RedPeak Ventures LLC',
 'hello@redpeakventures.com','+12025551234',
 '900 K St NW',null,'Washington DC',null,'United States',
 'Paused engagement. Revisit Q3 2026.'),

-- [008] unlinked — individual, active, no notes, no address_line2
('c0000000-0000-0000-0000-000000000008',
 null,
 'active','individual',
 'Hiroshi Yamamoto',null,
 'hiroshi.yamamoto@techlab.jp','+81311234001',
 '2-4-1 Nihonbashi',null,'Tokyo',null,'Japan',
 null),

-- [009] unlinked — individual, no phone, minimal
('c0000000-0000-0000-0000-000000000009',
 null,
 'active','individual',
 'Nina Castro',null,
 'nina.castro@freelance.ph',null,
 null,null,'Quezon City','Metro Manila','Philippines',
 null),

-- [010] unlinked — company, archived, no talent assigned, short notes
('c0000000-0000-0000-0000-00000000000a',
 null,
 'archived','company',
 'Silverstone Corp.','Silverstone Corp.',
 'info@silverstone.com.ph','+63289004321',
 null,null,'Makati','Metro Manila','Philippines',
 'Contract ended. Archived per client request.'),

-- [011] unlinked — individual, pending, no address at all
('c0000000-0000-0000-0000-00000000000b',
 null,
 'pending','individual',
 'Leo Fernandez',null,
 'leo.fernandez@design.co','+639171234099',
 null,null,null,null,'Philippines',
 null),

-- [012] unlinked — individual, inactive, no phone, no notes
('c0000000-0000-0000-0000-00000000000c',
 null,
 'inactive','individual',
 'Sandra Park',null,
 'sandra.park@corp.kr',null,
 '101 Gangnam-daero',null,'Seoul',null,'South Korea',
 null)

on conflict (id) do nothing;
