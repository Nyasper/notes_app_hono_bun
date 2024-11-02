CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(70) NOT NULL,
	`description` text(1000),
	`userId` text,
	`created` text DEFAULT 'Sat Nov 02 2024 15:04:55 GMT-0300 (hora estándar de Uruguay)',
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`created` text DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);