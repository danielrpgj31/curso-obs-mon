-- Active: 1699976707876@@127.0.0.1@3306
DROP PROCEDURE P_CALC_GC_STATISTICS;
CREATE PROCEDURE `P_CALC_GC_STATISTICS`()
BEGIN
	
    DECLARE gcfrequency_anterior INT;
	DECLARE gcfrequency_atual INT;
    DECLARE var_gcfrequency_diff DOUBLE;
    DECLARE timegc_anterior DECIMAL(10,2);
    DECLARE timegc_atual DECIMAL(10,2);
    DECLARE gc_percentil DOUBLE;
    DECLARE idRow INT;
    
	DECLARE done BOOLEAN DEFAULT FALSE;
	
    DECLARE cur CURSOR FOR
        SELECT id, gcfrequency, timegc
        FROM tracegc
        ORDER BY
            id;
	
    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur;
	FETCH cur INTO idRow, gcfrequency_anterior, timegc_anterior;

	main_loop: LOOP

        FETCH cur INTO idRow, gcfrequency_atual, timegc_atual;
	    IF done THEN 
            LEAVE main_loop;
	    END IF;

        SET var_gcfrequency_diff = (gcfrequency_atual - gcfrequency_anterior);

        IF var_gcfrequency_diff > 0 THEN
            SET gc_percentil = (timegc_atual/var_gcfrequency_diff)*100;
        ELSE 
            SET gc_percentil = 0;
        END IF;
        
        UPDATE tracegc
        SET
            gcfrequency_diff = var_gcfrequency_diff,
            gc_percentil_to_frequency = gc_percentil
        WHERE
            Id = idRow;

    	SET gcfrequency_anterior = gcfrequency_atual, timegc_anterior = timegc_atual;

    END LOOP;
	
    CLOSE cur;

END