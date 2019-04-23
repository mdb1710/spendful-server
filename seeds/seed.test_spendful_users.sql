BEGIN;

TRUNCATE
  "users";

INSERT INTO "users" ("id", "full_name", "email", "password_hash", "created_at", "updated_at") 
VALUES
  (
      1,
      'Spendful Admin',
      'admin@spendful.com',
      -- password = 'password'
      '$2y$12$fi2xhSbijogxWuCXYGruGOMa.2vrO.r2n8vYS4Q8Qd54//opflEQW',  
  ) ,
  (
      2,
      'Steve Rogers',
      'firstavenger@gmail.com',
      -- password = 'tonyisstupid'
      '$2y$12$VFZKj3oaK0qD1bb9Srl5j.zD0yk716Eu6WQlglha96CWjSfBPOeTa'
  ),
  (
      3, 
      'Tony Stark',
      'richman@stark.com',
      -- password = 'rogersisweak'
      'rogersisweak'
      '$2y$12$q0r2E7xxZJT66HT5zb6yoeemlVUYy400SsXh3XRBNIJb1zuuuHhKu'
);

COMMIT;