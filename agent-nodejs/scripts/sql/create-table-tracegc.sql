-- Active: 1699976707876@@127.0.0.1@3306@mydatabase

CREATE TABLE
    tracegc(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        type VARCHAR(255),
        timegc DECIMAL(10, 2),
        heap_used DECIMAL(10, 2),
        heap_cleaned DECIMAL(10, 2),
        gcfrequency INT,
        gcfrequency_diff INT
    ) COMMENT '';