PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(70) NOT NULL,
	`description` text(1000),
	`userId` text,
	`created` text DEFAULT 'Sat Nov 02 2024 15:12:08 GMT-0300 (hora estándar de Uruguay)',
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_notes`("id", "title", "description", "userId", "created") SELECT "id", "title", "description", "userId", "created" FROM `notes`;--> statement-breakpoint
DROP TABLE `notes`;--> statement-breakpoint
ALTER TABLE `__new_notes` RENAME TO `notes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;