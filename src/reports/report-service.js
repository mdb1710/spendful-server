const { DateTime } = require('luxon');
const { RRule }    = require('rrule');

const createRRule = function (startDate, frequency, endDate = null) {

  const options = {};

  options.dtstart = startDate;

  if (frequency === 'biweekly') {
    options.freq     = RRule.WEEKLY;
    options.interval = 2;
  }

  if (frequency === 'weekly') {
    options.freq     = RRule.WEEKLY;
    options.interval = 1;
  }

  if (frequency === 'monthly') {
    options.freq     = RRule.MONTHLY;
    options.interval = 1;
  }

  if (frequency === 'yearly') {
    options.freq     = RRule.YEARLY;
    options.interval = 1;
  }

  if (endDate) {
    options.until = endDate;
  }

  return new RRule(options);
};

const reportService = {
  getIncomesByYear(db, year, owner_id){
    return db('incomes')
      .select('*')
      .where({owner_id})
      .andWhere(db.raw('cast(EXTRACT(Year from start_date) as integer)'), year)
  },

  getIncomesByYearAndMonth(db, year, month, owner_id){

    return db('incomes')
      .select('*')
      .andWhere({owner_id})
      .andWhere(db.raw('cast(EXTRACT(YEAR from start_date) as integer)'), year)
      .andWhere(db.raw('cast(EXTRACT(MONTH from start_date) as integer)'), month)
      .whereNull('recurring_rule')
      .then(nonRecurringEvents => {


        return db('incomes')
          .select('*')
          .where({owner_id})
          .whereNotNull('recurring_rule')
          .then(recurringEvents => {

            const list = [];

            recurringEvents.forEach(r => {

              if (r.recurring_rule && r.start_date) {

                const start = new Date(r.start_date);
                const end = (r.end_date) ? new Date(r.end_date) : null;

                const rule = createRRule(start, r.recurring_rule, end);

                const firstDayOfMonth = DateTime.fromObject({ year: year, month: month, day: 1, zone: 'UTC' });
                const lastDayOfMonth  = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

                const occurences = rule.between(
                  firstDayOfMonth.toJSDate(),
                  lastDayOfMonth.toJSDate(),
                  true
                );

                if (occurences.length) {
                  // add recurring event to results
                  list.push(r);
                }

              } else {

                // add non-recurring event to results
                list.push(r);
              }
            });

            return  nonRecurringEvents.concat(list);
          });
      });
  },

  getExpensesByYear(db, year, owner_id){
    return db('expenses')
      .select('*')
      .where({owner_id})
      .andWhere(db.raw('cast(EXTRACT(Year from start_date) as integer)'), year)
  },

  getExpensesByYearAndMonth(db, year, month, owner_id){
    return db('expenses')
      .select('*')
      .andWhere({owner_id})
      .andWhere(db.raw('cast(EXTRACT(YEAR from start_date) as integer)'), year)
      .andWhere(db.raw('cast(EXTRACT(MONTH from start_date) as integer)'), month)
      .whereNull('recurring_rule')
      .then(nonRecurringEvents => {


        return db('expenses')
          .select('*')
          .where({owner_id})
          .whereNotNull('recurring_rule')
          .then(recurringEvents => {

            const list = [];

            recurringEvents.forEach(r => {

              if (r.recurring_rule && r.start_date) {

                const start = new Date(r.start_date);
                const end = (r.end_date) ? new Date(r.end_date) : null;

                const rule = createRRule(start, r.recurring_rule, end);

                const firstDayOfMonth = DateTime.fromObject({ year: year, month: month, day: 1, zone: 'UTC' });
                const lastDayOfMonth  = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

                const occurences = rule.between(
                  firstDayOfMonth.toJSDate(),
                  lastDayOfMonth.toJSDate(),
                  true
                );

                // add each occurrence of recurring event to results
                occurences.forEach(o => {
                  list.push(r);
                });

              } else {

                // add non-recurring event to results
                list.push(r);
              }
            });

            return  nonRecurringEvents.concat(list);
          });
      });
  },
}

module.exports = reportService;
