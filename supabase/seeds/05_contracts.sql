/**
 * SEED FILE    05_contracts.sql
 * TABLE        public.contracts
 * ROWS         12
 *
 * UUIDs prefixed d0…
 * Links talent (b0…) and client (c0…) rows from previous seeds.
 *
 * Mix of DRAFT and FINALIZED statuses.
 * Intentionally includes unnormalized/unclean JSONB data:
 *   - Inconsistent formatting (extra spaces, varying date formats)
 *   - Missing optional fields
 *   - Realistic messy data from actual contract submissions
 *
 * FINALIZED contracts (001, 002, 005, 008, 010, 011) trigger auto-creation
 * of contract_vaults records upon insertion.
 *
 * DRAFT contracts (003, 004, 006, 007, 009, 012) remain editable.
 */

insert into public.contracts (
    id, talent_id, client_id,
    status,
    summary, project_timeline, payment_terms
) values

-- [001] FINALIZED: Carlos Mendoza + Ben Nakamura (Nakamura Digital K.K.)
('d0000000-0000-0000-0000-000000000001',
 'b0000000-0000-0000-0000-000000000001',
 'c0000000-0000-0000-0000-000000000001',
 'FINALIZED',
 'Build scalable e-commerce backend for Japanese retail chain with REST API, product catalog, and inventory management.',
 '{
    "start_date": "2026-04-15",
    "end_date":   "2026-07-15",
    "expected_hours": 480,
    "milestones": [
        {"name":"API Design & Prototype","target":"2026-05-15","status":"complete"},
        {"name":"Core Features","target":"2026-06-15","status":"in_progress"},
        {"name":"Integration & Testing","target":"2026-07-15","status":"pending"}
    ]
 }'::jsonb,
 '{
    "hourly_rate":    45.00,
    "currency":       "USD",
    "total_budget":   21600.00,
    "payment_schedule": [
        {"phase":"Kickoff","percent":25,"due":"2026-05-15","status":"paid"},
        {"phase":"Midpoint","percent":35,"due":"2026-06-15","status":"pending"},
        {"phase":"Final","percent":40,"due":"2026-07-30","status":"pending"}
    ],
    "deposit":        5400.00
 }'::jsonb),

-- [002] FINALIZED: Sofia Lim + Claire Wu
('d0000000-0000-0000-0000-000000000002',
 'b0000000-0000-0000-0000-000000000002',
 'c0000000-0000-0000-0000-000000000002',
 'FINALIZED',
 'Design system overhaul + 5 product screens for fintech startup. Includes wireframes, hi-fi mockups, and interactive prototypes.',
 '{
    "start_date":     "2026-03-01",
    "end_date":       "2026-05-30",
    "total_weeks":    12,
    "sprints": [
        {"week":"1-2","task":"Research & Competitive Analysis"},
        {"week":"3-4","task":"Design System Foundation"},
        {"week":"5-8","task":"Screen Design & Iteration"},
        {"week":"9-12","task":"Prototype & Handoff"}
    ]
 }'::jsonb,
 '{
    "rate_per_hour": 38.00,
    "currency":       "USD",
    "estimated_total":   9120.00,
    "payment_method":    "Monthly Invoice",
    "notes":"Part-time (20 hrs/week). Due 7 days after invoice."
 }'::jsonb),

-- [003] DRAFT: Jake Torres + Vertex Solutions Inc.
('d0000000-0000-0000-0000-000000000003',
 'b0000000-0000-0000-0000-000000000003',
 'c0000000-0000-0000-0000-000000000003',
 'DRAFT',
 'Microservices refactoring for legacy procurement system. Python FastAPI + AWS Lambda + RDS.',
 '{
    "start_date":     "2026-06-01",
    "end_date":       "2026-09-01",
    "duration_weeks": 13,
    "phases":[
        {"name":"System Analysis","weeks":"1-2"},
        {"name":"Lambda Migration","weeks":"3-6"},
        {"name":"Testing & QA","weeks":"7-10"},
        {"name":"Deployment & Docs","weeks":"11-13"}
    ]
 }'::jsonb,
 '{
    "hourly": 35.00,
    "currency": "USD",
    "estimated_hours": 520,
    "total_value": 18200.00,
    "billing_cycle": "Bi-weekly"
 }'::jsonb),

-- [004] DRAFT: Carlos Mendoza + James Uy
('d0000000-0000-0000-0000-000000000004',
 'b0000000-0000-0000-0000-000000000001',
 'c0000000-0000-0000-0000-000000000004',
 'DRAFT',
 'Build internal tools dashboard for inventory management and reporting.',
 '{
    "start_date": "2026-05-20",
    "end_date": "2026-07-20",
    "scope": "React frontend + Node.js backend + PostgreSQL",
    "requirements": [
        "Real-time inventory tracking",
        "CSV export functionality",
        "Role-based dashboards"
    ]
 }'::jsonb,
 '{
    "rate":  45.00,
    "unit":  "USD/hr",
    "estimated_hours":  320,
    "approx_total": 14400,
    "terms": "Net 30, monthly invoicing"
 }'::jsonb),

-- [005] FINALIZED: Ryan Ong + Brightline Media
('d0000000-0000-0000-0000-000000000005',
 'b0000000-0000-0000-0000-000000000005',
 'c0000000-0000-0000-0000-000000000005',
 'FINALIZED',
 'Flutter mobile app for content distribution platform with offline support and push notifications.',
 '{
    "timeline": {
        "kickoff": "2026-02-15",
        "alpha": "2026-04-01",
        "beta": "2026-05-15",
        "launch": "2026-06-30"
    },
    "platforms": ["iOS", "Android"],
    "features": ["User Auth", "Content Feed", "Offline Sync", "Push Notif"]
 }'::jsonb,
 '{
    "monthly_retainer": 8000.00,
    "currency": "USD",
    "duration_months": 5,
    "total_contract_value": 40000.00,
    "payment_due": "1st of month"
 }'::jsonb),

-- [006] DRAFT: Sofia Lim + Patricia Lam
('d0000000-0000-0000-0000-000000000006',
 'b0000000-0000-0000-0000-000000000002',
 'c0000000-0000-0000-0000-000000000006',
 'DRAFT',
 'Brand identity design package: logo, color palette, typography guide, and brand guidelines document.',
 '{
    "start": "2026-06-01",
    "finish": "2026-08-01",
    "deliverables": [
        "Logo Concepts (3 options)",
        "Color Palette (primary + secondary)",
        "Typography System",
        "Brand Guidelines PDF (20+ pages)"
    ]
 }'::jsonb,
 '{
    "fixed_price": 5500.00,
    "currency": "USD",
    "payment_structure": [
        {"milestone": "Logo Concepts", "percent": 33, "amount": 1815.00},
        {"milestone": "Guidelines Draft", "percent": 33, "amount": 1815.00},
        {"milestone": "Final Deliverables", "percent": 34, "amount": 1870.00}
    ]
 }'::jsonb),

-- [007] DRAFT: Ana Cruz + Ryan Ong (cross-talent assignment, odd but unclean data allows this)
('d0000000-0000-0000-0000-000000000007',
 'b0000000-0000-0000-0000-000000000004',
 'c0000000-0000-0000-0000-000000000005',
 'DRAFT',
 'Data analytics project: SQL queries, Power BI dashboards, and monthly reporting automation.',
 '{
    "project_start": "2026-05-15",
    "project_end": "2026-08-15",
    "reporting_cadence": "monthly",
    "deliverables": [
        "Automated ETL Pipeline",
        "3 Power BI Dashboards",
        "Documentation"
    ]
 }'::jsonb,
 '{
    "rate": "TBD",
    "payment_method": "Fixed Monthly",
    "notes": "To be finalized with finance team"
 }'::jsonb),

-- [008] FINALIZED: Mia Ramos + Ben Nakamura (repeat client, different talent)
('d0000000-0000-0000-0000-000000000008',
 'b0000000-0000-0000-0000-000000000008',
 'c0000000-0000-0000-0000-000000000001',
 'FINALIZED',
 'Cloud infrastructure audit and cost optimization: review existing AWS/GCP setup, identify redundancies, implement savings.',
 '{
    "phase_1": "2026-04-01",
    "phase_1_end": "2026-04-30",
    "phase_2_start": "2026-05-01",
    "phase_2_end": "2026-06-30",
    "activities": ["Infra Audit", "Cost Analysis", "Optimization Plan", "Implementation Support"]
 }'::jsonb,
 '{
    "hourly": 55.00,
    "currency": "USD",
    "phase_1_hours": 40,
    "phase_2_hours": 120,
    "total_cost": 8800.00,
    "payment_terms": "Monthly advance"
 }'::jsonb),

-- [009] DRAFT: Dino Reyes + Nina Castro
('d0000000-0000-0000-0000-000000000009',
 'b0000000-0000-0000-0000-000000000009',
 'c0000000-0000-0000-0000-000000000009',
 'DRAFT',
 'QA automation testing suite for web application. Selenium scripts, regression tests, CI/CD integration.',
 '{
    "start": "2026-06-15",
    "end": "2026-09-15",
    "scope": "End-to-end, regression, and smoke tests",
    "frameworks": ["Selenium", "Cypress", "Jenkins CI/CD"]
 }'::jsonb,
 '{
    "base_rate": 30.00,
    "currency": "USD",
    "commitment": "Part-time (15 hrs/week minimum)",
    "duration_weeks": 13
 }'::jsonb),

-- [010] FINALIZED: Cris Bautista (offboarded) + RedPeak Ventures (inactive client)
('d0000000-0000-0000-0000-00000000000a',
 'b0000000-0000-0000-0000-00000000000a',
 'c0000000-0000-0000-0000-000000000007',
 'FINALIZED',
 'Project management and agile coaching for 6-month product development engagement.',
 '{
    "engagement_start": "2026-01-15",
    "engagement_end": "2026-06-30",
    "scope": "Scrum Master + Product Owner support",
    "sprints": 13
 }'::jsonb,
 '{
    "rate": 60.00,
    "unit": "USD/hr",
    "monthly_budget": 12000.00,
    "duration": "6 months",
    "total_value": 72000.00,
    "status": "completed"
 }'::jsonb),

-- [011] FINALIZED: Tess Aquino + Hiroshi Yamamoto
('d0000000-0000-0000-0000-00000000000b',
 'b0000000-0000-0000-0000-00000000000b',
 'c0000000-0000-0000-0000-000000000008',
 'FINALIZED',
 'Full-stack development for B2B SaaS platform: frontend (React), backend (Node), database design.',
 '{
    "contract_start": "2026-03-15",
    "contract_end": "2026-09-15",
    "development_phases": {
        "phase_1": "Frontend & UI (6 weeks)",
        "phase_2": "Backend APIs (6 weeks)",
        "phase_3": "Integration & Deployment (4 weeks)"
    }
 }'::jsonb,
 '{
    "monthly_retainer": 10000,
    "currency": "USD",
    "term_months": 6,
    "total_contract_value": 60000,
    "payment_day": 15,
    "notes": "Retainer includes 160 hrs/month, overage at $65/hr"
 }'::jsonb),

-- [012] DRAFT: Kevin Tan + Leo Fernandez
('d0000000-0000-0000-0000-00000000000c',
 'b0000000-0000-0000-0000-000000000007',
 'c0000000-0000-0000-0000-00000000000b',
 'DRAFT',
 'Graphic design for marketing materials: brochures, social media assets, email templates.',
 '{
    "start_date": "2026-07-01",
    "end_date": "2026-09-30",
    "scope": "20 deliverables per month",
    "asset_types": ["Brochures", "Social Posts", "Email Templates", "Presentations"]
 }'::jsonb,
 '{
    "pricing_model": "Monthly Subscription",
    "monthly_cost": 2500.00,
    "currency": "USD",
    "included_revisions": 3,
    "additional_revision_cost": 75.00
 }'::jsonb)

on conflict (id) do nothing;
