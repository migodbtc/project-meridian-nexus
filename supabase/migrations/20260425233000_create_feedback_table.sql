/**
 * MIGRATION NAME       Create Feedback Table
 * PURPOSE              Store collective feedback from select QA testers
 * 
 * DESCRIPTION
 * It enforces referential integrity with auth.users via cascading deletions and optimizes reads with a foreign key index.
 * Security is handled natively via Row Level Security (RLS), restricting data access to the authenticated user's own ID.
 * RLS policies include the 'to authenticated' condition to optimize the query planner by bypassing anonymous users.
 * Finally, metadata is documented using 'COMMENT ON', which PostgREST exposes in the auto-generated API docs.
 */

---! Table Schema !---
create table public.feedback (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    email text not null,
    topic text not null,
    subject text not null check (char_length(subject) <= 100),
    message text not null check (char_length(message) <= 1000),
    created_at timestamptz default now() not null
);

---! Indexes !---
create index feedback_user_id_idx on public.feedback(user_id);

---! Row Level Securities !---
alter table public.feedback enable row level security;

create policy "Users can insert their own feedback"
    on public.feedback for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can read their own feedback"
    on public.feedback for select
    to authenticated
    using (auth.uid() = user_id);

---! Table + Column Documentation/Commenting !---
comment on table public.feedback is 'Stores user-submitted feedback, bug reports, and feature requests.';
comment on column public.feedback.id is 'Unique identifier for the feedback submission.';
comment on column public.feedback.user_id is 'The authenticated user who submitted the feedback. Cascades on user deletion.';
comment on column public.feedback.email is 'The email address of the user at the time of submission.';
comment on column public.feedback.topic is 'Categorization of the feedback (e.g., bug, feature, general).';
comment on column public.feedback.subject is 'A brief summary of the feedback, capped at 100 characters.';
comment on column public.feedback.message is 'The detailed body of the feedback, capped at 1000 characters.';
