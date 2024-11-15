INSERT INTO 
    specialty (names) 
VALUES 
    ('Medicina General'), 
    ('Cardiología'), 
    ('Urología'), 
    ('Fisiología'), 
    ('Pediatría');

INSERT INTO 
    doctor (names, age, email, passwords, specialty_id) 
VALUES
    ('Dr. Juan Pérez', 45, 'jperez@hospital.com', 'password1', 1),
    ('Dr. Ana García', 50, 'agarcia@hospital.com', 'password2', 2),
    ('Dr. Carlos Ramírez', 39, 'cramirez@hospital.com', 'password3', 3),
    ('Dr. Luisa Torres', 42, 'ltorres@hospital.com', 'password4', 4),
    ('Dr. María López', 37, 'mlopez@hospital.com', 'password5', 5);

INSERT INTO 
    patient (names, age, email, passwords) 
VALUES
    ('Paciente 1', 25, 'paciente1@correo.com', 'password6'),
    ('Paciente 2', 34, 'paciente2@correo.com', 'password7'),
    ('Paciente 3', 28, 'paciente3@correo.com', 'password8'),
    ('Paciente 4', 45, 'paciente4@correo.com', 'password9'),
    ('Paciente 5', 30, 'paciente5@correo.com', 'password10'),
    ('Paciente 6', 32, 'paciente6@correo.com', 'password11'),
    ('Paciente 7', 29, 'paciente7@correo.com', 'password12'),
    ('Paciente 8', 50, 'paciente8@correo.com', 'password13'),
    ('Paciente 9', 41, 'paciente9@correo.com', 'password14'),
    ('Paciente 10', 26, 'paciente10@correo.com', 'password15');
