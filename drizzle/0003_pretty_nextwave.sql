CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(70) NOT NULL,
	`description` text(1000),
	`userId` text,
	`created` text DEFAULT 'Mon Nov 04 2024 20:27:52 GMT-0300 (hora estándar de Uruguay)',
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text(16) NOT NULL,
	`password` text(26) NOT NULL,
	`admin` integer DEFAULT false,
	`created` text DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);