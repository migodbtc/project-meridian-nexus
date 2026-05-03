/**
 * Mock authentication data
 * Used for development and testing auth flows
 */

export const mockAuthUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'alice.johnson@example.com',
    created_at: '2025-12-01T08:30:00Z',
    last_sign_in_at: '2026-05-02T14:20:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'bob.smith@example.com',
    created_at: '2025-11-15T10:45:00Z',
    last_sign_in_at: '2026-05-02T09:15:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    email: 'carol.williams@example.com',
    created_at: '2025-10-20T13:00:00Z',
    last_sign_in_at: '2026-04-28T16:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    email: 'david.brown@example.com',
    created_at: '2025-09-05T11:20:00Z',
    last_sign_in_at: '2026-05-01T12:00:00Z',
  },
];

export const mockLoginCredentials = [
  {
    email: 'alice.johnson@example.com',
    password: 'SecurePass123!',
  },
  {
    email: 'bob.smith@example.com',
    password: 'TestPass456!',
  },
  {
    email: 'carol.williams@example.com',
    password: 'DemoPass789!',
  },
  {
    email: 'david.brown@example.com',
    password: 'MockPass000!',
  },
];

export type MockAuthUser = (typeof mockAuthUsers)[number];
export type MockLoginCredential = (typeof mockLoginCredentials)[number];
