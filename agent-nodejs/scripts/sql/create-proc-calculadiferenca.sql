
CREATE PROCEDURE CALCULARDIFERENCA() 
BEGIN
	
    DECLARE gcfrequency_anterior INT;
	DECLARE gcfrequency_atual INT;
    DECLARE idRow INT;
    
	DECLARE done BOOLEAN DEFAULT FALSE;
	
    DECLARE cur CURSOR FOR
        SELECT id, gcfrequency
        FROM tracegc
        ORDER BY
            id;
	
    -- Substitua 'sua_tabela' pelo nome real da sua tabela e 'algum_campo_de_ordem' pelo campo que define a ordem dos registros
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur;

	FETCH cur INTO idRow, gcfrequency_anterior;

	main_loop: LOOP

        FETCH cur INTO idRow, gcfrequency_atual;
	    IF done THEN 
            LEAVE main_loop;
	    END IF;

        -- Calcular a diferença e armazenar no campo 'diferenca'
        UPDATE tracegc
        SET
            gcfrequency_diff = gcfrequency_atual - gcfrequency_anterior
        WHERE
            Id = idRow;

    	SET gcfrequency_anterior = gcfrequency_atual;
	
    END LOOP;
	
    CLOSE cur;

END 