/* This file is to help setting up our SQL satabase.*/

-- 1. Remember to first start MySql from System Preferences
-- 2. Open a new terminal window and navigate to:
--  cd /usr/local/mysql/bin
-- 3. Then enter password after: ./mysql -u root -p 

/* Create and use our  db */
CREATE DATABASE  `Auth_With_Json_Web_Token`;
USE `Auth_With_Json_Web_Token`;

/* Create a table for all contacts */
CREATE TABLE `contacts` (
    `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
    `user_name` VARCHAR(25) NOT NULL,
    `password` VARCHAR(25) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    PRIMARY KEY ( `id` ) ); /* Set ID as primary key */

/* Add mock data to the table for testing */

INSERT INTO contacts user_name, password, email)
    VALUES ('jstheman', 'thelegend', 'js@google.com');


