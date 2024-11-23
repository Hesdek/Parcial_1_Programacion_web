#!/bin/bash
set -e

# Variables para el nombre de usuario y la base de datos
POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_DB=${POSTGRES_DB:-app}
DB_USER=${DB_USER:-new_user}
DB_PASSWORD=${DB_PASSWORD:-new_password}

# Comando para crear el usuario y otorgar permisos
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    BEGIN;
        CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

        GRANT CONNECT ON DATABASE $POSTGRES_DB TO $DB_USER;

        GRANT INSERT, SELECT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $DB_USER;

        GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;
    COMMIT;
EOSQL
