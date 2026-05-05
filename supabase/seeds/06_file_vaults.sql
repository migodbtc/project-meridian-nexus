/**
 * SEED FILE    06_file_vaults.sql
 * TABLE        public.contract_vaults
 * ROWS         6
 *
 * UUIDs prefixed e0…
 * One vault per FINALIZED contract from 05_contracts.sql
 * (contracts 001, 002, 005, 008, 010, 011).
 *
 * NOTES
 * - Vaults are auto-created by the trigger in create_contracts_table migration
 *   when a contract transitions to FINALIZED. These seeds override/verify those rows.
 * - vault_name can be customized (defaults to "Vault for Contract [UUID]").
 * - is_active flag allows logical archiving without cascading to vault_files.
 *
 * This seeder demonstrates vault customization and state variety.
 */

insert into public.contract_vaults (
    id, contract_id,
    vault_name, is_active
) values

-- [001] Vault for Carlos Mendoza + Ben Nakamura e-commerce contract
('e0000000-0000-0000-0000-000000000001',
 'd0000000-0000-0000-0000-000000000001',
 'Nakamura Digital — E-commerce Backend',
 true),

-- [002] Vault for Sofia Lim + Claire Wu design system contract
('e0000000-0000-0000-0000-000000000002',
 'd0000000-0000-0000-0000-000000000002',
 'Claire Wu Fintech Design System',
 true),

-- [003] Vault for Ryan Ong + Brightline Media Flutter app
('e0000000-0000-0000-0000-000000000005',
 'd0000000-0000-0000-0000-000000000005',
 'Brightline Content Distribution App',
 true),

-- [004] Vault for Mia Ramos + Ben Nakamura cloud audit (repeat client)
('e0000000-0000-0000-0000-000000000008',
 'd0000000-0000-0000-0000-000000000008',
 'Nakamura Digital — Cloud Infrastructure Audit',
 true),

-- [005] Vault for Cris Bautista + RedPeak Ventures PM engagement (archived/historical)
('e0000000-0000-0000-0000-00000000000a',
 'd0000000-0000-0000-0000-00000000000a',
 'RedPeak Ventures PM Engagement (Completed)',
 false),

-- [006] Vault for Tess Aquino + Hiroshi Yamamoto B2B SaaS
('e0000000-0000-0000-0000-00000000000b',
 'd0000000-0000-0000-0000-00000000000b',
 'Hiroshi Tech B2B SaaS Platform',
 true)

on conflict (id) do nothing;
