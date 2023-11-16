CREATE TABLE
    `costumer` (
        `idCostumer` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
        `name` varchar(255) DEFAULT NULL,
        `enable` smallint DEFAULT NULL,
        `dna` varchar(255) DEFAULT NULL,
        `birth_date` datetime DEFAULT NULL,
        `age` smallint DEFAULT NULL,
        PRIMARY KEY (`idCostumer`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 161040 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci