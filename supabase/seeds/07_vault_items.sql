/**
 * SEED FILE    07_vault_items.sql
 * TABLE        public.vault_files
 * ROWS         24
 *
 * UUIDs prefixed f0…
 * Multiple files per vault from 06_file_vaults.sql (e0…).
 *
 * Unnormalized/unclean data patterns:
 *   - Inconsistent file_type naming (application/pdf vs PDF, image/png vs PNG)
 *   - Inconsistent bucket_path structures (contracts/[uuid] vs talent-uploads/[uuid])
 *   - Varying file_size units (bytes stored consistently, but naming suggests inconsistency)
 *   - Missing uploader_id for some files (nulled, representing admin uploads)
 *   - Mixed category usage per vault (not always semantically consistent)
 *   - File names with typos, inconsistent casing, extra spaces
 *
 * Distribution: 4 files per vault (6 vaults × 4 files = 24 total)
 * File categories mix: mostly LEGAL_CONTRACT for contracts, varied others
 */

insert into public.vault_files (
    id, vault_id, uploader_id,
    file_name, file_size, file_type, category,
    bucket_path
) values

---! Vault 001: Nakamura Digital E-commerce Backend !---
('f0000000-0000-0000-0000-000000000001',
 'e0000000-0000-0000-0000-000000000001',
 'a0000000-0000-0000-0000-000000000005',
 'Contract_FINAL-ecommerce-api.pdf',
 245120,
 'application/pdf',
 'LEGAL_CONTRACT',
 'contracts/e0000000-0000-0000-0000-000000000001/contract-signed.pdf'),

('f0000000-0000-0000-0000-000000000002',
 'e0000000-0000-0000-0000-000000000001',
 'a0000000-0000-0000-0000-000000000001',
 'API_Spec_v2.3  .docx',
 512000,
 'application/msword',
 'TECHNICAL_PROJECT_SPEC',
 'talent-uploads/carlos-mendoza/API-specification-v2.3.docx'),

('f0000000-0000-0000-0000-000000000003',
 'e0000000-0000-0000-0000-000000000001',
 null,
 'Database_Schema.sql',
 89600,
 'text/plain',
 'TECHNICAL_PROJECT_SPEC',
 'contracts/e0000000-0000-0000-0000-000000000001/db-schema.sql'),

('f0000000-0000-0000-0000-000000000004',
 'e0000000-0000-0000-0000-000000000001',
 'a0000000-0000-0000-0000-000000000008',
 'Nakamura_Brand_Guidelines.PDF',
 1024000,
 'application/PDF',
 'CLIENT_BRAND_ASSET',
 'client-assets/nakamura-digital/brand-guide-2026.pdf'),

-- Vault 002: Claire Wu Fintech Design System
('f0000000-0000-0000-0000-000000000005',
 'e0000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000006',
 'Design_System_Figma_Export.fig',
 2048000,
 'application/x-figma',
 'TECHNICAL_PROJECT_SPEC',
 'design-files/sofia-lim/design-system-export.fig'),

('f0000000-0000-0000-0000-000000000006',
 'e0000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000009',
 'Signed_Design_Contract.pdf',
 356400,
 'application/pdf',
 'LEGAL_CONTRACT',
 'contracts/e0000000-0000-0000-0000-000000000002/contract-signed.pdf'),

('f0000000-0000-0000-0000-000000000007',
 'e0000000-0000-0000-0000-000000000002',
 null,
 'Wireframes_v1-2.sketch',
 4096000,
 'application/x-sketch',
 'TECHNICAL_PROJECT_SPEC',
 'design-files/sofia-lim/wireframes-v1-2.sketch'),

('f0000000-0000-0000-0000-000000000008',
 'e0000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000001',
 'Brand_Color_Palette.png',
 156800,
 'image/png',
 'CLIENT_BRAND_ASSET',
 'design-files/sofia-lim/color-palette.png'),

-- Vault 003: Brightline Content Distribution Flutter App
('f0000000-0000-0000-0000-000000000009',
 'e0000000-0000-0000-0000-000000000005',
 'a0000000-0000-0000-0000-000000000006',
 'Flutter_App_Contract_FINALIZED.pdf',
 267200,
 'application/pdf',
 'LEGAL_CONTRACT',
 'contracts/e0000000-0000-0000-0000-000000000005/signed-contract.pdf'),

('f0000000-0000-0000-0000-00000000000a',
 'e0000000-0000-0000-0000-000000000005',
 'a0000000-0000-0000-0000-000000000005',
 'Project_Roadmap_Q2-Q3_2026.xlsx',
 345600,
 'application/vnd.ms-excel',
 'TECHNICAL_PROJECT_SPEC',
 'project-docs/brightline/roadmap-2026.xlsx'),

('f0000000-0000-0000-0000-00000000000b',
 'e0000000-0000-0000-0000-000000000005',
 null,
 'App_Screenshots_Mobile_UI.zip',
 8192000,
 'application/zip',
 'TECHNICAL_PROJECT_SPEC',
 'design-files/ryan-ong/ui-screenshots.zip'),

('f0000000-0000-0000-0000-00000000000c',
 'e0000000-0000-0000-0000-000000000005',
 'a0000000-0000-0000-0000-000000000009',
 'brightline_logo_variations.ai',
 2560000,
 'application/postscript',
 'CLIENT_BRAND_ASSET',
 'client-assets/brightline-media/logo-variations.ai'),

-- Vault 004: Mia Ramos Cloud Infrastructure Audit
('f0000000-0000-0000-0000-00000000000d',
 'e0000000-0000-0000-0000-000000000008',
 'a0000000-0000-0000-0000-000000000008',
 'Cloud_Audit_Report_FINAL.pdf',
 523400,
 'application/pdf',
 'LEGAL_CONTRACT',
 'contracts/e0000000-0000-0000-0000-000000000008/audit-report.pdf'),

('f0000000-0000-0000-0000-00000000000e',
 'e0000000-0000-0000-0000-000000000008',
 'a0000000-0000-0000-0000-000000000003',
 'AWS_GCP_Cost_Analysis.xlsx',
 612800,
 'application/vnd.ms-excel',
 'TECHNICAL_PROJECT_SPEC',
 'analysis/mia-ramos/cost-breakdown.xlsx'),

('f0000000-0000-0000-0000-00000000000f',
 'e0000000-0000-0000-0000-000000000008',
 null,
 'Infrastructure_Recommendations.docx',
 287600,
 'application/msword',
 'TECHNICAL_PROJECT_SPEC',
 'reports/cloud-audit/recommendations.docx'),

('f0000000-0000-0000-0000-000000000010',
 'e0000000-0000-0000-0000-000000000008',
 'a0000000-0000-0000-0000-000000000001',
 'Architecture Diagrams_v3.png',
 1789400,
 'image/png',
 'OTHER',
 'design-files/mia-ramos/arch-diagrams-v3.png'),

-- Vault 005: Cris Bautista RedPeak Ventures PM Engagement (Historical/Archived)
('f0000000-0000-0000-0000-000000000011',
 'e0000000-0000-0000-0000-00000000000a',
 null,
 'PM_Contract_COMPLETED.pdf',
 445600,
 'application/pdf',
 'LEGAL_CONTRACT',
 'contracts/e0000000-0000-0000-0000-00000000000a/pm-contract.pdf'),

('f0000000-0000-0000-0000-000000000012',
 'e0000000-0000-0000-0000-00000000000a',
 'a0000000-0000-0000-0000-00000000000a',
 'Sprint_Retrospectives_All_Quarters.pdf',
 2156000,
 'application/pdf',
 'OTHER',
 'project-docs/cris-bautista/retrospectives-compiled.pdf'),

('f0000000-0000-0000-0000-000000000013',
 'e0000000-0000-0000-0000-00000000000a',
 'a0000000-0000-0000-0000-000000000003',
 'Final_Project_Deliverables_Checklist.xlsx',
 178900,
 'application/vnd.ms-excel',
 'TECHNICAL_PROJECT_SPEC',
 'project-docs/redpeak-ventures/deliverables.xlsx'),

('f0000000-0000-0000-0000-000000000014',
 'e0000000-0000-0000-0000-00000000000a',
 null,
 'Team_Photo_Graduation_Ceremony.jpeg',
 4534000,
 'image/jpeg',
 'OTHER',
 'memories/cris-bautista/team-photo-final-day.jpeg'),

-- Vault 006: Tess Aquino + Hiroshi B2B SaaS Platform
('f0000000-0000-0000-0000-000000000015',
 'e0000000-0000-0000-0000-00000000000b',
 'a0000000-0000-0000-0000-00000000000b',
 'B2B_SaaS_Contract_FINALIZED.pdf',
 398200,
 'application/pdf',
 'LEGAL_CONTRACT',
 'contracts/e0000000-0000-0000-0000-00000000000b/saas-contract.pdf'),

('f0000000-0000-0000-0000-000000000016',
 'e0000000-0000-0000-0000-00000000000b',
 'a0000000-0000-0000-0000-000000000008',
 'Hiroshi_Tech_Brand_Book.pdf',
 1267400,
 'application/pdf',
 'CLIENT_BRAND_ASSET',
 'client-assets/hiroshi-tech/brand-book-2026.pdf'),

('f0000000-0000-0000-0000-000000000017',
 'e0000000-0000-0000-0000-00000000000b',
 'a0000000-0000-0000-0000-00000000000b',
 'API Documentation v1.2.3  .md',
 534800,
 'text/markdown',
 'TECHNICAL_PROJECT_SPEC',
 'documentation/tess-aquino/api-docs-v1.2.3.md'),

('f0000000-0000-0000-0000-000000000018',
 'e0000000-0000-0000-0000-00000000000b',
 null,
 'Dashboard_Frontend_Mockups.fig',
 3072000,
 'application/x-figma',
 'TECHNICAL_PROJECT_SPEC',
 'design-files/tess-aquino/dashboard-mockups.fig')


on conflict (id) do nothing;
