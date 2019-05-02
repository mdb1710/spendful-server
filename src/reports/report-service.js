const { DateTime } = require('luxon');
const { RRule }    = require('rrule');

const createRRule = function (startDate, frequency) {


  if (/biweekly/i.test(frequency)) {
    return new RRule({ dtstart: startDate, freq: RRule.WEEKLY, interval: 2 });
  }

  if (/weekly/i.test(frequency)) {
    return new RRule({ dtstart: startDate, freq: RRule.WEEKLY, interval: 1 });
  }

  if (/monthly/i.test(frequency)) {
    return new RRule({ dtstart: startDate, freq: RRule.MONTHLY, interval: 1 });
  }

  if (/yearly/i.test(frequency)) {
    return new RRule({ dtstart: startDate, freq: RRule.YEARLY, interval: 1 });
  }
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

                const rule = createRRule(r.start_date, r.recurring_rule);

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

                const rule = createRRule(r.start_date, r.recurring_rule);

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
