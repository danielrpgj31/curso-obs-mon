-- Active: 1699963435334@@127.0.0.1@3306@mydatabase
DROP PROCEDURE IF EXISTS P_WAIT;

CREATE PROCEDURE P_WAIT() 
BEGIN  
	SELECT SLEEP(16);
	SELECT 1 as idCostumer,
	    'Daniel Ribeiro' AS name;
END;


call `P_WAIT`