describe('sn.date', function () {

    var monthsOf2016;
    var today;

    function getDate() {
        return new Date(1987, 11, 14);
    }


    beforeEach(function () {
        today = new Date();
        monthsOf2016 = [];
        for (var i = 0; i < 12; i++) {
            var month = {
                month: i,
                firstDayOfMonth: new Date(2016, i, 1),
                middleOfMonth: new Date(2016, i, 15),
                lastDayOfMonth: i !== 11 ? new Date(2016, i + 1, 0) : new Date(2017, 0, 0)
            };

            var lastDate = month.lastDayOfMonth;
            month.dayBeforeLastDayOfMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() - 1);

            monthsOf2016.push(month);
        }

    });

    describe('isLastDayOfMonth', function () {

        it('Should correctly show if date is last day of month', function () {
            monthsOf2016.forEach(function (month) {
                expect(sn(month.lastDayOfMonth).is.lastDayOfMonth()).toEqual(true);
                expect(sn(month.middleOfMonth).is.lastDayOfMonth()).toEqual(false);
                expect(sn(month.dayBeforeLastDayOfMonth).is.lastDayOfMonth()).toEqual(false);
                expect(sn(month.firstDayOfMonth).is.lastDayOfMonth()).toEqual(false);
            });
        });

    });

    describe('setLastDayOfMonth', function () {

        it('Should correctly set last day of month', function () {
            monthsOf2016.forEach(function (month) {
                expect(month.middleOfMonth.getDate()).not.toEqual(month.lastDayOfMonth.getDate());
                sn(month.middleOfMonth).setLastDayOfMonth();
                expect(month.middleOfMonth.getDate()).toEqual(month.lastDayOfMonth.getDate());
                expect(month.middleOfMonth.getMonth()).toEqual(month.lastDayOfMonth.getMonth());
            });
        });

    });

    describe('getLastDayOfMonth', function () {

        it('Should correctly get last day of month from date', function () {
            monthsOf2016.forEach(function (month) {
                expect(sn(month.middleOfMonth).getLastDayOfMonth()).toEqual(month.lastDayOfMonth.getDate());
                var lastDayOfMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate();
                expect(sn().getLastDayOfMonth()).toEqual(lastDayOfMonth);
            });
        });

    });

    describe('addMilliseconds', function () {

        it('should correctly add milliseconds', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addMilliseconds(10);
            sn(d3).addMilliseconds(-5);
            expect(d2 - d1).toEqual(10);
            expect(d3 - d1).toEqual(-5);
        });

    });


    describe('addSeconds', function () {

        it('should correctly add seconds', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addSeconds(10);
            sn(d3).addSeconds(-5);
            expect(d2 - d1).toEqual(10 * 1000);
            expect(d3 - d1).toEqual(-5 * 1000);
        });

    });

    describe('addMinutes', function () {

        it('should correctly add minutes', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addMinutes(10);
            sn(d3).addMinutes(-5);
            expect(d2 - d1).toEqual(10 * 1000 * 60);
            expect(d3 - d1).toEqual(-5 * 1000 * 60);
        });

    });

    describe('addHours', function () {

        it('should correctly add hours', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addHours(10);
            sn(d3).addHours(-5);
            expect(d2 - d1).toEqual(10 * 1000 * 60 * 60);
            expect(d3 - d1).toEqual(-5 * 1000 * 60 * 60);
        });

    });

    describe('addDays', function () {

        it('should correctly add days', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addDays(10);
            sn(d3).addDays(-5);
            expect(d2 - d1).toEqual(10 * 1000 * 60 * 60 * 24);
            expect(d3 - d1).toEqual(-5 * 1000 * 60 * 60 * 24);
        });

    });

    describe('addMonths', function () {

        it('should correctly add months', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addMonths(10);
            sn(d3).addMonths(-5);

            expect(d2).toEqual(new Date(d1.getFullYear(), d1.getMonth() + 10, d1.getDate()));
            expect(d3).toEqual(new Date(d1.getFullYear(), d1.getMonth() - 5, d1.getDate()));

        });

    });

    describe('addYears', function () {

        it('should correctly add years', function () {
            var d1 = getDate();
            var d2 = getDate();
            var d3 = getDate();
            expect(d1 - d2).toEqual(0);
            sn(d2).addYears(10);
            sn(d3).addYears(-5);

            expect(d2).toEqual(new Date(d1.getFullYear() + 10, d1.getMonth(), d1.getDate()));
            expect(d3).toEqual(new Date(d1.getFullYear() - 5, d1.getMonth(), d1.getDate()));

        });

    });

    describe('getMonths', function () {

        it('should display list of months', function () {
            var months = sn.getMonths();
            expect(months.length).toEqual(12);
            expect(months[0].name).toEqual('January');
            expect(months[5].shortName).toEqual('Jun');

            months.forEach(function (month) {
                expect(month.month).toEqual(month.index + 1);
            });
        });

    });


    describe('Readme examples', function () {
        it('Readme examples should be correct', function () {
            var d1 = new Date(1987, 10, 14);
            var d2 = new Date(1987, 10, 30);

            //is.lastDayOfMonth
            expect(sn(d1).is.lastDayOfMonth()).toEqual(false);
            expect(sn(d2).is.lastDayOfMonth()).toEqual(true);

            //getLastDayOfMonth
            expect(sn(d1).getLastDayOfMonth()).toEqual(30);

            sn(d1).setLastDayOfMonth();
            expect(sn(d1).is.lastDayOfMonth()).toEqual(true);
            expect(sn(sn().setLastDayOfMonth()).is.lastDayOfMonth()).toEqual(true);

        });
    });


});
