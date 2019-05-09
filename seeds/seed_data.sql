--psql -U postgres -d spendful  -f ./seeds/seed_data.sql

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
  ),
  (  
      4,
     'Demo User',
     'demo@spendful.com',
     --password = 'password'
     '$2y$12$fi2xhSbijogxWuCXYGruGOMa.2vrO.r2n8vYS4Q8Qd54//opflEQW'
  );

ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 5;

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
        'Netflix',
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
    ),
    (
        11,
        4,
        'Selling Things',
        'income',
        100.00
    ),
    (
        12,
        4,
        'Gift',
        'income',
        50.00
    ),
    (
        13,
        4,
        'Primary Income',
        'income',
        1600.00
    ),
    (
        14,
        4,
        'Secondary Income',
        'income',
        500.00
    ),
    (
        15,
        4,
        'Vehicle',
        'expense',
        2000.00
    ),
    (
        16,
        4,
        'Food',
        'expense',
        400.00
    ),
    (
        17,
        4,
        'Utilities',
        'expense',
        500.00
    );

ALTER SEQUENCE IF EXISTS categories_id_seq RESTART WITH 18;

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
    ),
    (
        4,
        4,
        12,
        'Birthday',
        50.00,
        make_timestamptz(2019, 5, 8, 0, 0, 0),
        null
    ),
    (
        5,
        4,
        11,
        'E-Bay',
        250.00, 
        make_timestamptz(2019, 5, 8, 0, 0, 0), 
        null
    ),
    (
        6,
        4,
        14,
        'Freelance',
        2000.00,
        make_timestamptz(2019, 5, 2, 0, 0, 0),
        null
    ),
    (
        7,
        4,
        13,
        'Direct Deposit',
        3200.00,
        make_timestamptz(2019, 5, 5, 0, 0, 0),
        'bi-weekly'
    );

ALTER SEQUENCE IF EXISTS incomes_id_seq RESTART WITH 8;

INSERT INTO "expenses" ("id", "owner_id", "category_id", "description", "amount", "start_date", "recurring_rule")
  VALUES
    (
        1,
        1,
        1,
        'Rent',
        1200.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'monthly'
    ),
    (
        2,
        1,
        2,
        'Netflix',
        20.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'monthly'
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
        'monthly'
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
        'monthly'
    ),
    (
        7,
        3,
        10,
        'Office Space',
        500000.00,
        make_timestamptz(2019, 1, 1, 0, 0, 0),
        'monthly'
    ),
    (
        8,
        4,
        16,
        'Groceries',
        100.00,
        make_timestamptz(2019, 5, 4, 0, 0, 0),
        'weekly'
    ),
    (
        9,
        4,
        15,
        'Gas',
        35.00,
        make_timestamptz(2019, 5, 5, 0, 0, 0),
        'weekly'
    ),
    (
        10,
        4,
        16,
        'Take-Out',
        20.00,
        make_timestamptz(2019, 5, 2, 0, 0, 0),
        'daily'
    ),
    (
        11,
        4,
        17,
        'Electric',
        75.00,
        make_timestamptz(2019, 5, 6, 0, 0, 0),
        'monthly'
    ),
    (
        12,
        4,
        17,
        'Cell Phone',
        90.00,
        make_timestamptz(2019, 5, 20, 0, 0, 0),
        'monthly'
    ),
    (
        13,
        4,
        17,
        'Internet',
        50.00,
        make_timestamptz(2019, 5, 15, 0, 0, 0),
        'monthly'
    ),
    (
        14,
        4,
        15,
        'Vehicle Loan',
        300.00,
        make_timestamptz(2019, 5, 9, 0, 0, 0),
        'monthly'
    ); 


ALTER SEQUENCE IF EXISTS expenses_id_seq RESTART WITH 15;

 COMMIT;
