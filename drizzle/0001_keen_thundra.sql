PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(70) NOT NULL,
	`description` text(1000),
	`userId` text,
	`created` text DEFAULT 'Mon Nov 04 2024 20:10:53 GMT-0300 (hora estándar de Uruguay)',
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_notes`("id", "title", "description", "userId", "created") SELECT "id", "title", "description", "userId", "created" FROM `notes`;--> statement-breakpoint
DROP TABLE `notes`;--> statement-breakpoint
ALTER TABLE `__new_notes` RENAME TO `notes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;