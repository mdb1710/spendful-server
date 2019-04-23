BEGIN;

TRUNCATE
  'expenses'

INSERT INTO 'expenses' ('id', 'owner_id', 'category_id', 'description', 'amount', 'recurring_rule')
  VALUES
    (
        1,
        1,
        1,
        'Rent',
        1200.00,
        null
    ),
    (
        2,
        1,
        2,
        'Netflix',
        20.00,
        null
    ),
    (
        3,
        1,
        3,
        'Car Note',
        580.00,
        null
    ),
    (
        4,
        1,
        4,
        'Car Insurance',
        350.00,
        null
    ),
    (
        5,
        1,
        5,
        'Groceries',
        250.00,
        null
    ), 
    (
        6,
        2,
        8,
        'Motorcycle',
        3500.00,
        null
    ),
    (
        7,
        3,
        10,
        'Office Space',
        500000.00,
        null
    ),    
   

 COMMIT;        