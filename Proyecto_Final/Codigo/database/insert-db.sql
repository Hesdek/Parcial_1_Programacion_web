BEGIN TRANSACTION;


INSERT INTO
    Users (names, passwords, is_admin)
VALUES
    ('Juan Perez', 'password123', FALSE),
    ('Bob Martinez', 'hashed_password2', TRUE),
    ('Daniela Gomez', 'securepass456', FALSE),
    ('Elver Galarga', 'hashed_password1', FALSE);


INSERT INTO 
     Events (event_name, locations, date_start, date_finish, id_user) 
VALUES
    ('Feria de las Flores', 'Medellín', '2024-08-03', '2024-08-12', 2), --bob (id_user=2) es admin
    ('Desfile de Silleteros', 'Avenida del Río, Medellín', '2024-08-11', '2024-08-11', 2),
    ('Concierto de Apertura', 'Plaza Mayor, Medellín', '2024-08-02', '2024-08-02', 2),
    ('Festival Nacional de la Trova', 'Teatro Metropolitano', '2024-08-10', '2024-08-10', 4);


INSERT INTO 
    Participation (id_user, id_event) 
VALUES 
    (1, 1), -- juan Feria de las Flores
    (1, 3), -- juan Concierto de Apertura
    (3, 4); -- daniela Festival Nacional de la Trova

COMMIT;