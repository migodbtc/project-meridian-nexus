/**
 * SEED FILE    02_feedback.sql
 * TABLE        public.feedback
 * ROWS         12
 *
 * All rows require: user_id, email, topic, subject, message.
 * user_id → auth.users from 00_auth.sql.
 * created_at has a default so it is omitted on some rows to test the default.
 *
 * Happy paths (rows 001–003): all fields explicit including created_at.
 * Other rows: created_at omitted (uses default now()).
 */

insert into public.feedback (
    id, user_id, email, topic, subject, message
) values

-- [001] happy path — bug report, all fields explicit
('f0000000-0000-0000-0000-000000000001',
 'a0000000-0000-0000-0000-000000000005',
 'carlos.mendoza@talent.dev','bug',
 'Profile photo upload fails on mobile',
 'When I try to upload a profile photo from my iPhone 14, the file picker opens but after selecting the image, nothing happens. Tested on Chrome 123 and Safari. Desktop works fine.'),

-- [002] happy path — feature request, all fields explicit
('f0000000-0000-0000-0000-000000000002',
 'a0000000-0000-0000-0000-000000000006',
 'sofia.lim@talent.dev','feature',
 'Add calendar view for session scheduling',
 'It would be really helpful to have a calendar-style view when booking sessions. Right now the list view makes it hard to spot availability gaps at a glance. A weekly calendar grid would be ideal.'),

-- [003] happy path — general feedback, all fields explicit
('f0000000-0000-0000-0000-000000000003',
 'a0000000-0000-0000-0000-000000000008',
 'ben.nakamura@clients.dev','general',
 'Overall very smooth onboarding experience',
 'Just wanted to say the onboarding flow was straightforward and clean. The confirmation email arrived quickly and the profile setup was intuitive. Minor suggestion: add a progress bar to the multi-step form.'),

-- [004] bug report, no explicit created_at
('f0000000-0000-0000-0000-000000000004',
 'a0000000-0000-0000-0000-000000000007',
 'jake.torres@talent.dev','bug',
 'Session timer resets on page refresh',
 'The active session timer loses its count when I refresh the browser tab. Expected it to persist via localStorage or the server.'),

-- [005] feature request, no explicit created_at
('f0000000-0000-0000-0000-000000000005',
 'a0000000-0000-0000-0000-000000000009',
 'claire.wu@clients.dev','feature',
 'Bulk download option for File Vault documents',
 'It would save a lot of time to select multiple files and download them as a ZIP instead of downloading one by one.'),

-- [006] bug
('f0000000-0000-0000-0000-000000000006',
 'a0000000-0000-0000-0000-000000000005',
 'carlos.mendoza@talent.dev','bug',
 'Timezone dropdown missing Asia/Manila',
 'The timezone selector does not include Asia/Manila in the list. I had to pick Asia/Singapore as a workaround.'),

-- [007] general feedback
('f0000000-0000-0000-0000-000000000007',
 'a0000000-0000-0000-0000-00000000000a',
 'mario.devera@polaris.dev','general',
 'Navigation feels sluggish after latest deploy',
 'Page transitions seem slower compared to last week. Not a hard bug but noticeable on slower connections.'),

-- [008] feature request
('f0000000-0000-0000-0000-000000000008',
 'a0000000-0000-0000-0000-00000000000b',
 'tina.flores@polaris.dev','feature',
 'Export invoices as PDF from Finance panel',
 'Currently I screenshot invoices manually. A one-click PDF export would be much more efficient for record keeping.'),

-- [009] bug, short message
('f0000000-0000-0000-0000-000000000009',
 'a0000000-0000-0000-0000-000000000003',
 'marco.garcia@polaris.dev','bug',
 'Delete talent button not responding',
 'Clicking the delete button on a talent record does nothing. No loading state, no error toast.'),

-- [010] general
('f0000000-0000-0000-0000-00000000000a',
 'a0000000-0000-0000-0000-000000000004',
 'pia.villanueva@polaris.dev','general',
 'Dark mode contrast could be improved',
 'Some labels in the sidebar are hard to read in dark mode on lower brightness screens. Especially the secondary text color.'),

-- [011] bug
('f0000000-0000-0000-0000-00000000000b',
 'a0000000-0000-0000-0000-000000000006',
 'sofia.lim@talent.dev','bug',
 'Bio field strips line breaks on save',
 'When I write a multi-line bio and save, all line breaks are removed. Renders as a single block of text on the profile page.'),

-- [012] feature request
('f0000000-0000-0000-0000-00000000000c',
 'a0000000-0000-0000-0000-000000000008',
 'ben.nakamura@clients.dev','feature',
 'In-app notifications for contract status changes',
 'Would love to get notified inside the app when a contract moves from draft to active, rather than having to check manually.')

on conflict (id) do nothing;
