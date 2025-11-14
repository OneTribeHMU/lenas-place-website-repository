CREATE TABLE `contactSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`read` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`date` timestamp NOT NULL,
	`time` varchar(10),
	`location` varchar(255) DEFAULT 'Lena''s Place',
	`ticketPrice` int,
	`maxAttendees` int,
	`image` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`tier` enum('community','vip','elite') NOT NULL,
	`price` int NOT NULL,
	`billingCycle` varchar(20) DEFAULT 'monthly',
	`status` enum('active','inactive','cancelled') DEFAULT 'active',
	`startDate` timestamp NOT NULL DEFAULT (now()),
	`renewalDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `memberships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSignups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`phone` varchar(20),
	`subscribed` int NOT NULL DEFAULT 1,
	`source` varchar(100) DEFAULT 'website',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletterSignups_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSignups_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `memberships` ADD CONSTRAINT `memberships_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;