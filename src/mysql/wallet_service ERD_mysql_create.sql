CREATE TABLE `users` (
	`id` VARCHAR(255) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`token` VARCHAR(255) NOT NULL UNIQUE,
	`balance` FLOAT,
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `transactions` (
	`id` INT NOT NULL,
	`sender_id` VARCHAR(255) NOT NULL,
	`recipient_id` VARCHAR(255) NOT NULL,
	`type(fund,withdraw, transfer)` FLOAT NOT NULL,
	`amount` FLOAT NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk0` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk1` FOREIGN KEY (`recipient_id`) REFERENCES `users`(`id`);



