BEGIN;

TRUNCATE
  'incomes'

INSERT INTO 'incomes' ('id', 'owner_id', 'category_id', 'description', 'amount', 'recurring_rule')
  VALUES
    (
        1,
        1,
        6,
        'Direct Deposit',
        2500.00,
        null
    ),
    (
        2,
        2,
        7,
        'Paycheck',
        3500.00,
        null
    ),
    (
        3,
        3,
        8,
        'Direct Deposit',
        250500.00,
        null
    ); 

 COMMIT;        