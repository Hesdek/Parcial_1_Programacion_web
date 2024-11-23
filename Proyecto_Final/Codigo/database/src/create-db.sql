BEGIN TRANSACTION;

CREATE TABLE Users (
    id_user INT PRIMARY KEY,
    names VARCHAR(100) NOT NULL,
    passwords VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE Events (
    id_event INT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    locations VARCHAR(100),
    date_start DATE,
    date_finish DATE,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES Users(id_user)
);

-- Tabla intermedia para la relación muchos a muchos entre usuario y evento
CREATE TABLE Participation (
    id_user INT,
    id_event INT,
    PRIMARY KEY (id_user, id_event),
    FOREIGN KEY (id_user) REFERENCES Users(id_user),
    FOREIGN KEY (id_event) REFERENCES Events(id_event)
);

COMMIT;