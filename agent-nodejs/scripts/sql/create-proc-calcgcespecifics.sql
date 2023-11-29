-- Active: 1699976707876@@127.0.0.1@3306
DROP PROCEDURE P_CALC_GC_SPECIFICS;
CREATE PROCEDURE `P_CALC_GC_SPECIFICS`()
BEGIN

    DECLARE idRow INT;
    DECLARE local_gc_percentil_to_frequency DOUBLE;

    #VARS DE CONTADOR
    DECLARE local_qtd_gc25 INT DEFAULT 0;
    DECLARE local_qtd_gc50 INT DEFAULT 0;
    DECLARE local_qtd_gc75 INT DEFAULT 0;
    DECLARE local_qtd_total INT DEFAULT 0;
    
	DECLARE done BOOLEAN DEFAULT FALSE;
	
    DECLARE cur CURSOR FOR
        SELECT id, gc_percentil_to_frequency
        FROM tracegc
        ORDER BY id;
	
    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur;

	main_loop: LOOP

        FETCH cur INTO  idRow, 
                        local_gc_percentil_to_frequency;

        IF done THEN 
            LEAVE main_loop;
	    END IF;

        SET local_qtd_total = local_qtd_total + 1;

        IF local_gc_percentil_to_frequency > 25 AND local_gc_percentil_to_frequency < 50 THEN
            SET local_qtd_gc25 = local_qtd_gc25 + 1;
        END IF;
        IF local_gc_percentil_to_frequency > 50 AND local_gc_percentil_to_frequency < 75 THEN
            SET local_qtd_gc50 = local_qtd_gc50 + 1;
        END IF;
        IF local_gc_percentil_to_frequency > 75 AND local_gc_percentil_to_frequency < 100 THEN
            SET local_qtd_gc75 = local_qtd_gc75 + 1;
        END IF;

    END LOOP;

    SELECT  local_qtd_total, 
            local_qtd_gc25,
            local_qtd_gc50,
            local_qtd_gc75;
	
    CLOSE cur;

END