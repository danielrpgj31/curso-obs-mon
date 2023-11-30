DELIMITER //

CREATE PROCEDURE calcularDiferenca()
BEGIN
    DECLARE valor_anterior INT;
    DECLARE valor_atual INT;

    DECLARE done BOOLEAN DEFAULT FALSE;

    DECLARE cur CURSOR FOR
        SELECT campo_numerico
        FROM sua_tabela
        ORDER BY algum_campo_de_ordem; -- Substitua 'sua_tabela' pelo nome real da sua tabela e 'algum_campo_de_ordem' pelo campo que define a ordem dos registros

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    FETCH cur INTO valor_anterior;

    main_loop: LOOP
        FETCH cur INTO valor_atual;

        IF done THEN
            LEAVE main_loop;
        END IF;

        -- Calcular a diferença e armazenar no campo 'diferenca'
        UPDATE sua_tabela
        SET diferenca = valor_atual - valor_anterior
        WHERE campo_numerico = valor_atual;

        SET valor_anterior = valor_atual;
    END LOOP;

    CLOSE cur;
END //

DELIMITER ;
