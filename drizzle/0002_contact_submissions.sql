-- drizzle/0002_contact_submissions.sql
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` integer PRIMARY KEY AUTOINCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `mobile_number` text,
  `message` text NOT NULL,
  `status` text NOT NULL DEFAULT 'unread',
  `created_at` text NOT NULL
);