DROP PROCEDURE IF EXISTS P_WAIT;

CREATE PROCEDURE P_WAIT() BEGIN SELECT 
	SELECT SLEEP(16);
	SELECT
	    1 as idCostumer,
	    'kyvqvdbxdmmwjadecvkzbbllupblfxtjuenoroxtuiucdeabgo' AS name;
	END;


call `P_WAIT`