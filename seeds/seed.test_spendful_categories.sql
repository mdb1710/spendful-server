BEGIN;

TRUNCATE
 "categories"

INSERT INTO 'categories' ('id', 'owner_id', 'name', 'type', 'monthly_budget')
  VALUES
    (
        1,
        1,
        'Rent',
        'expense',
        1200.00,
    ),
    (
        2,
        1,
        'Nexflix',
        'expense',
        20.00,
    ),
    (
       3,
       1,
       'Car Note',
       'expense',
       580.00,
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


COMMIT;
