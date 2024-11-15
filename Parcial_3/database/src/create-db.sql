CREATE TABLE specialty (
    id SERIAL PRIMARY KEY,
    names VARCHAR(50) NOT NULL
);

CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    names VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwords VARCHAR(255) NOT NULL,
    specialty_id INT REFERENCES specialty(id)
);

CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    names VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwords VARCHAR(255) NOT NULL
);

CREATE TABLE appointment (
    id SERIAL PRIMARY KEY,
    dates DATE NOT NULL,
    hora TIME NOT NULL,
    patient_id INT REFERENCES patient(id),
    doctor_id INT REFERENCES doctor(id),
    UNIQUE (dates, hora, doctor_id),
    UNIQUE (dates, hora, patient_id)
);
