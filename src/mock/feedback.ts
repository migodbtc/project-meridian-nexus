/**
 * Mock feedback data
 * Corresponds to the feedback table schema
 */

export const mockFeedback: Array<{
  id: string;
  user_id: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  created_at: string;
}> = [
  {
    id: 'feedback-001-550e8400-e29b-41d4',
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'alice.johnson@example.com',
    topic: 'feature',
    subject: 'Dark mode support',
    message:
      'Would love to see a dark mode option in the dashboard. Many of us work late hours and the bright interface can strain the eyes.',
    created_at: '2026-05-02T14:30:00Z',
  },
  {
    id: 'feedback-002-550e8400-e29b-41d4',
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'bob.smith@example.com',
    topic: 'bug',
    subject: 'Profile picture upload fails',
    message:
      'When trying to upload a PNG file larger than 2MB, the upload fails silently with no error message. Please improve error handling.',
    created_at: '2026-04-28T10:15:00Z',
  },
  {
    id: 'feedback-003-550e8400-e29b-41d4',
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    email: 'carol.williams@example.com',
    topic: 'general',
    subject: 'Excellent product update',
    message:
      'Just want to say the latest update is amazing. The new dashboard layout is much more intuitive and the performance improvements are noticeable.',
    created_at: '2026-05-01T16:45:00Z',
  },
  {
    id: 'feedback-004-550e8400-e29b-41d4',
    user_id: '550e8400-e29b-41d4-a716-446655440004',
    email: 'david.brown@example.com',
    topic: 'feature',
    subject: 'Export data to CSV',
    message:
      'It would be helpful to have the ability to export reports and data tables to CSV format for use in spreadsheets and other analysis tools.',
    created_at: '2026-04-25T12:00:00Z',
  },
  {
    id: 'feedback-005-550e8400-e29b-41d4',
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'alice.johnson@example.com',
    topic: 'bug',
    subject: 'Notification bell not updating',
    message:
      'The notification badge count sometimes does not update when I receive new messages. Have to refresh the page to see the correct count.',
    created_at: '2026-04-20T09:30:00Z',
  },
];

export type MockFeedbackItem = (typeof mockFeedback)[number];
