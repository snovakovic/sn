(function (sn) {

  var internals = {
    getDate: function () {
      if (sn.__EC__) {
        // sn.assert.is.date(sn.__EC__);
        return sn.__EC__;
      }

      return new Date();
    }
  };

  /**********************************************
  * Change provided date so that it point to last day of current month
  ************************************************/
  sn.setLastDayOfMonth = function () {
    var dt = internals.getDate();
    dt.setMonth(dt.getMonth() + 1, 0);
    return dt;
  };


  /**********************************************
  * Check if day in date is last day of month
  * @param dt {Date} date we want ot check
  * @return true -> day is last day of month; false - day is not last day of month
  ************************************************/
  sn.getLastDayOfMonth = function () {
    var dt = internals.getDate();
    return (new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate();
  };


  /**********************************************
  * Add or remove dates from provided date
  * @param milliseconds {Number} +/- milliseconds to add or remove from date
  ************************************************/
  sn.addMilliseconds = function (milliseconds) {
    var dt = internals.getDate();
    dt.setMilliseconds(dt.getMilliseconds() + milliseconds);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param seconds {Number} +/- seconds to add or remove from date
  ************************************************/
  sn.addSeconds = function (seconds) {
    var dt = internals.getDate();
    dt.setSeconds(dt.getSeconds() + seconds);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param minutes {Number} +/- minutes to add or remove from date
  ************************************************/
  sn.addMinutes = function (minutes) {
    var dt = internals.getDate();
    dt.setMinutes(dt.getMinutes() + minutes);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param hours {Number} +/- hours to add or remove from date
  ************************************************/
  sn.addHours = function (hours) {
    var dt = internals.getDate();
    dt.setHours(dt.getHours() + hours);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param days {Number} +/- days to add or remove from date
  ************************************************/
  sn.addDays = function (days) {
    var dt = internals.getDate();
    dt.setDate(dt.getDate() + days);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param months {Number} +/- months to add or remove from date
  ************************************************/
  sn.addMonths = function (months) {
    var dt = internals.getDate();
    dt.setMonth(dt.getMonth() + months);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param years {Number} +/- years to add or remove from date
  ************************************************/
  sn.addYears = function (years) {
    var dt = internals.getDate();
    dt.setFullYear(dt.getFullYear() + years);
    return dt;
  };

  /**********************************************
  * Get the list of english months with fullName, shortName and month index
  ************************************************/
  sn.getMonths = function () {
    return [
      {
        index: 0,
        get month() {
          return this.index + 1;
        },
        name: 'January',
        shortName: 'Jan',
        days: 31,
      }, {
        index: 1,
        get month() {
          return this.index + 1;
        },
        name: 'February',
        shortName: 'Feb',
        days: [28, 29],
      }, {
        index: 2,
        get month() {
          return this.index + 1;
        },
        name: 'March',
        shortName: 'Mar',
        days: 31,
      }, {
        index: 3,
        get month() {
          return this.index + 1;
        },
        name: 'April',
        shortName: 'Apr',
        days: 30,
      }, {
        index: 4,
        get month() {
          return this.index + 1;
        },
        name: 'May',
        shortName: 'May',
        days: 31,
      }, {
        index: 5,
        get month() {
          return this.index + 1;
        },
        name: 'June',
        shortName: 'Jun',
        days: 30,
      }, {
        index: 6,
        get month() {
          return this.index + 1;
        },
        name: 'July',
        shortName: 'Jul',
        days: 31,
      }, {
        index: 7,
        get month() {
          return this.index + 1;
        },
        name: 'August',
        shortName: 'Aug',
        days: 31,
      }, {
        index: 8,
        get month() {
          return this.index + 1;
        },
        name: 'September',
        shortName: 'Sep',
        days: 30,
      }, {
        index: 9,
        get month() {
          return this.index + 1;
        },
        name: 'October',
        shortName: 'Oct',
        days: 31,
      }, {
        index: 10,
        get month() {
          return this.index + 1;
        },
        name: 'November',
        shortName: 'Nov',
        days: 30,
      }, {
        index: 11,
        get month() {
          return this.index + 1;
        },
        name: 'December',
        shortName: 'Dec',
        days: 31,
      }
    ];
  };

})(sn);

