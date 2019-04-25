BEGIN;

INSERT INTO "users" ("id", "full_name", "email_address", "password_hash")
VALUES
  (
      1,
      'Spendful Admin',
      'admin@spendful.com',
      -- password = 'password'
      '$2y$12$fi2xhSbijogxWuCXYGruGOMa.2vrO.r2n8vYS4Q8Qd54//opflEQW'
  ),
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
      '$2y$12$q0r2E7xxZJT66HT5zb6yoeemlVUYy400SsXh3XRBNIJb1zuuuHhKu'
);

ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 4;

INSERT INTO "categories" ("id", "owner_id", "name", "type", "monthly_budget")
  VALUES
    (
        1,
        1,
        'Rent',
        'expense',
        1200.00
    ),
    (
        2,
        1,
        'Nexflix',
        'expense',
        20.00
    ),
    (
       3,
       1,
       'Car Note',
       'expense',
       580.00
    ),
    (
        4,
        1,
        'Car Insurance',
        'expense',
        350.00
    ),
    (
        5,
        1,
        'Groceries',
        'expense',
        250.00
    ),
    (
        6,
        1,
        'Direct Deposit',
        'income',
        2500.00
    ),
    (
        7,
        2,
        'Paycheck',
        'income',
        3500.00
    ),
    (
        8,
        2,
        'motorcycle',
        'expense',
        3500.00
    ),
    (
        9,
        3,
        'Paycheck',
        'income',
        250500.00
    ),
    (
        10,
        3,
        'office space',
        'expense',
        500000.00
    );

ALTER SEQUENCE IF EXISTS categories_id_seq RESTART WITH 11;

INSERT INTO "incomes" ("id", "owner_id", "category_id", "description", "amount", "start_date", "recurring_rule")
  VALUES
    (
        1,
        1,
        6,
        'Direct Deposit',
        2500.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        null
    ),
    (
        2,
        2,
        7,
        'Paycheck',
        3500.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        null
    ),
    (
        3,
        3,
        8,
        'Direct Deposit',
        250500.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        null
    );

ALTER SEQUENCE IF EXISTS incomes_id_seq RESTART WITH 4;

INSERT INTO "expenses" ("id", "owner_id", "category_id", "description", "amount", "start_date", "recurring_rule")
  VALUES
    (
        1,
        1,
        1,
        'Rent',
        1200.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'RRULE:FREQ=MONTHLY;INTERVAL=1;WKST=MO'
    ),
    (
        2,
        1,
        2,
        'Netflix',
        20.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'RRULE:FREQ=MONTHLY;INTERVAL=1;WKST=MO'
    ),
    (
        3,
        1,
        3,
        'Car Repairs',
        580.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        null
    ),
    (
        4,
        1,
        4,
        'Car Insurance',
        350.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'RRULE:FREQ=MONTHLY;INTERVAL=1;WKST=MO'
    ),
    (
        5,
        1,
        5,
        'Groceries',
        250.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        null
    ),
    (
        6,
        2,
        8,
        'Motorcycle',
        3500.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'RRULE:FREQ=MONTHLY;INTERVAL=1;WKST=MO'
    ),
    (
        7,
        3,
        10,
        'Office Space',
        500000.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'RRULE:FREQ=MONTHLY;INTERVAL=1;WKST=MO'
    );

ALTER SEQUENCE IF EXISTS expenses_id_seq RESTART WITH 8;

 COMMIT;
