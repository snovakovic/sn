(function (global) {

    //PRIVATE
    var getDate = function () {
        if (__EC__) {
            global.assert.is.date(__EC__);
            return __EC__;
        }
        return new Date();
    };



    //PUBLIC

    /**********************************************
    * Change provided date so that it point to last day of current month
    ************************************************/
    global.setLastDayOfMonth = function () {
        var dt = getDate();
        dt.setMonth(dt.getMonth() + 1, 0);
        return _return(dt);
    };


    /**********************************************
    * Check if day in date is last day of month
    * @return true -> day is last day of month; false - day is not last day of month
    ************************************************/
    global.is.lastDayOfMonth = function () {
        var dt = getDate();
        var test = new Date(dt.getTime());
        test.setDate(test.getDate() + 1);
        return _return(test.getDate() === 1);
    };


    /**********************************************
    * Check if day in date is last day of month
    * @return true -> day is last day of month; false - day is not last day of month
    ************************************************/
    global.getLastDayOfMonth = function () {
        var dt = getDate();
        return _return((new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate());
    };


    /**********************************************
    * Add or remove dates from provided date
    * @param milliseconds {Number} +/- milliseconds to add or remove from date
    ************************************************/
    global.addMilliseconds = function (milliseconds) {
        var dt = getDate();
        dt.setMilliseconds(dt.getMilliseconds() + milliseconds);
        return _return(dt);
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param seconds {Number} +/- seconds to add or remove from date
    ************************************************/
    global.addSeconds = function (seconds) {
        var dt = getDate();
        dt.setSeconds(dt.getSeconds() + seconds);
        return _return(dt);
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param minutes {Number} +/- minutes to add or remove from date
    ************************************************/
    global.addMinutes = function (minutes) {
        var dt = getDate();
        dt.setMinutes(dt.getMinutes() + minutes);
        return _return(dt);
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param hours {Number} +/- hours to add or remove from date
    ************************************************/
    global.addHours = function (hours) {
        var dt = getDate();
        dt.setHours(dt.getHours() + hours);
        return _return(dt);
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param days {Number} +/- days to add or remove from date
    ************************************************/
    global.addDays = function (days) {
        var dt = getDate();
        dt.setDate(dt.getDate() + days);
        return _return(dt);
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param months {Number} +/- months to add or remove from date
    ************************************************/
    global.addMonths = function (months) {
        var dt = getDate();
        dt.setMonth(dt.getMonth() + months);
        return _return(dt);
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param years {Number} +/- years to add or remove from date
    ************************************************/
    global.addYears = function (years) {
        var dt = getDate();
        dt.setFullYear(dt.getFullYear() + years);
        return _return(dt);
    };

    /**********************************************
    * Get the list of english months with fullName, shortName and month index
    ************************************************/
    global.getMonths = function () {
        return _return([
            {
                index: 0,
                get month() {
                    return this.index + 1;
                },
                name: 'January',
                shortName: 'Jan',
                days: 31
            }, {
                index: 1,
                get month() {
                    return this.index + 1;
                },
                name: 'February',
                shortName: 'Feb',
                days: [28, 29]
            }, {
                index: 2,
                get month() {
                    return this.index + 1;
                },
                name: 'March',
                shortName: 'Mar',
                days: 31
            }, {
                index: 3,
                get month() {
                    return this.index + 1;
                },
                name: 'April',
                shortName: 'Apr',
                days: 30
            }, {
                index: 4,
                get month() {
                    return this.index + 1;
                },
                name: 'May',
                shortName: 'May',
                days: 31
            }, {
                index: 5,
                get month() {
                    return this.index + 1;
                },
                name: 'June',
                shortName: 'Jun',
                days: 30
            }, {
                index: 6,
                get month() {
                    return this.index + 1;
                },
                name: 'July',
                shortName: 'Jul',
                days: 31
            }, {
                index: 7,
                get month() {
                    return this.index + 1;
                },
                name: 'August',
                shortName: 'Aug',
                days: 31
            }, {
                index: 8,
                get month() {
                    return this.index + 1;
                },
                name: 'September',
                shortName: 'Sep',
                days: 30
            }, {
                index: 9,
                get month() {
                    return this.index + 1;
                },
                name: 'October',
                shortName: 'Oct',
                days: 31
            }, {
                index: 10,
                get month() {
                    return this.index + 1;
                },
                name: 'November',
                shortName: 'Nov',
                days: 30
            }, {
                index: 11,
                get month() {
                    return this.index + 1;
                },
                name: 'December',
                shortName: 'Dec',
                days: 31
            }
        ]);
    };

})(sn);
