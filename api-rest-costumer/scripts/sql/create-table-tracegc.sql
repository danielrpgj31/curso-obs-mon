-- Active: 1699976707876@@127.0.0.1@3306@mydatabase
CREATE TABLE tracegc(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    started DATETIME,
    finished DATETIME, 
    type VARCHAR(10), -- mark-sweep / Scavenge 
    gc_cost TIMESTAMP, 
    heap_used DECIMAL(8,2), 
    heap_cleaned DECIMAL(8,2)
);