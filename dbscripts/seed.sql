
\connect sistemadeponto

CREATE TABLE "user"
(
    id serial PRIMARY KEY,
    name VARCHAR (100) NOT NULL
);

ALTER TABLE "user" OWNER TO usuario;

INSERT INTO "user"(name)
VALUES('Jackson');

CREATE TABLE ponto
(
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    dia DATE NOT NULL,
    entrada TIME NOT NULL,
    saida_almoco TIME NOT NULL,
    entrada_almoco TIME NOT NULL,
    saida TIME NOT NULL,
);

ALTER TABLE "ponto" OWNER TO usuario;

INSERT INTO ponto(user_id, dia, entrada, saida_almoco, entrada_almoco, saida)
VALUES(1, '2020-03-11', '08:00:00', '09:00:00', '10:00:00', '12:00:00'),
      (1, '2020-03-11', '09:00:00', '11:00:00', '12:00:00', '17:00:00'),
      (1, '2020-03-11', '07:00:00', '10:00:00', '12:00:00', '18:00:00');
