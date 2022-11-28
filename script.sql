CREATE TABLE
    IF NOT EXISTS clients (
        "id" varchar(155) NOT NULL,
        name varchar(155) NOT NULL,
        date_of_birth date NOT NULL,
        email varchar(100) NOT NULL,
        phone_number varchar(155) NOT NULL,
        address varchar(1000) NOT NULL,
        CONSTRAINT PK_CLIENT PRIMARY KEY ("id")
    );

CREATE TABLE
    IF NOT EXISTS places (
        "id" serial NOT NULL,
        capacity int NOT NULL,
        measurements numeric NOT NULL,
        measure_units varchar(10) NOT NULL,
        address varchar(1000) NOT NULL,
        no_of_bathrooms int NOT NULL,
        no_of_rooms int NOT NULL,
        description varchar(5000) NOT NULL,
        price numeric(18, 4) NOT NULL,
        CONSTRAINT PK_PLACES PRIMARY KEY ("id")
    );

CREATE TABLE
    IF NOT EXISTS hosts (
        "id" serial NOT NULL,
        client_id varchar(155) NOT NULL,
        place_id int NOT NULL,
        start_date date NOT NULL,
        end_date date NOT NULL,
        CONSTRAINT PK_HOST PRIMARY KEY ("id"),
        CONSTRAINT FK_HOST_CLIENT FOREIGN KEY (client_id) REFERENCES clients ("id"),
        CONSTRAINT FK_HOST_PLACE FOREIGN KEY (place_id) REFERENCES places ("id")
    );

CREATE INDEX IDX_HOST_CLIENT ON hosts ( client_id );

CREATE INDEX IDX_HOST_PLACE ON hosts ( place_id );

CREATE TABLE
    IF NOT EXISTS accounts (
        "id" serial NOT NULL,
        balance numeric(18, 4) NOT NULL,
        client_id varchar(155) NOT NULL,
        CONSTRAINT PK_ACCOUNTS PRIMARY KEY ("id"),
        CONSTRAINT FK_ACCOUNTS_CLIENT FOREIGN KEY (client_id) REFERENCES clients ("id")
    );

CREATE INDEX IDX_ACCOUNTS_CLIENT ON accounts ( client_id );

CREATE TABLE
    IF NOT EXISTS authentication (
        email varchar(100) NOT NULL,
        password_hash varchar(500) NOT NULL,
        CONSTRAINT PK_AUTHENTICATION PRIMARY KEY (email)
    );