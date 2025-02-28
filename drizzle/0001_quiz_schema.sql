CREATE TABLE `categories` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `icon` text NOT NULL
);

CREATE TABLE `questions` (
  `id` integer PRIMARY KEY NOT NULL,
  `category_id` integer NOT NULL,
  `question` text NOT NULL,
  `options` text NOT NULL,
  `correct_answer` integer NOT NULL,
  `explanation` text NOT NULL,
  `reference_title` text NOT NULL,
  `reference_url` text NOT NULL,
  `reference_copyright` text NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
);