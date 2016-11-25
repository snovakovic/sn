describe('sn().assert', function () {

    var notDefined;
    var date;
    var obj;
    var obj1;
    var arr;
    var arr1;
    var num;
    var numObj;
    var emptyNumObj;
    var zero;
    var empty;
    var str;
    var strObj;
    var emptyStrObj;
    var emptyString;
    var spacesOnly;
    var bool;
    var falseBool;
    var func;

    beforeEach(function () {
        notDefined = undefined;
        obj = {};
        obj1 = { test: 'test' };
        strObj = String('test');
        emptyStrObj = String();
        numObj = Number(33);
        emptyNumObj = Number();
        arr = [];
        arr1 = ['1'];
        num = 3;
        zero = 0;
        empty = null;
        str = 'string';
        emptyString = '';
        spacesOnly = '    ';
        bool = true;
        falseBool = false;
        date = new Date();
        func = function () { };
    });


    describe('is', function () {

        it('should correctly handle is', function () {
            expect(sn(date).is(date)).toEqual(true);
            expect(sn(date.toString()).is(date)).toEqual(false);

            //HANDLE UH OH COERCION GOTCHAS
            expect(sn('0').is(false)).toEqual(false);
            expect(sn(false).is(0)).toEqual(false);
            expect(sn(false).is('')).toEqual(false);
            expect(sn(false).is([])).toEqual(false);
            expect(sn('').is(0)).toEqual(false);
            expect(sn('').is([])).toEqual(false);
            expect(sn(0).is([])).toEqual(false);

            //CASES THAT SHOULD BE LEGAL
            expect(sn('0').is(0)).toEqual(true);
            expect(sn('10').is(10)).toEqual(true);
            expect(sn('-10').is(-10)).toEqual(true);
            expect(sn(30).is(30)).toEqual(true);
            expect(sn(null).is(undefined)).toEqual(true);
            expect(sn(false).is(false)).toEqual(true);
            expect(sn(strObj).is(strObj)).toEqual(true);
            expect(sn(emptyStrObj).is(strObj)).toEqual(false);
            expect(sn(emptyStrObj).is(emptyStrObj)).toEqual(true);
            expect(sn(strObj).is(strObj)).toEqual(true);

            expect(sn({}).is({})).toEqual(false);

        });

        it('should correctly handle not', function () {
            expect(sn(false).not('')).toEqual(true);
            expect(sn(false).not([])).toEqual(true);
            expect(sn(emptyStrObj).not(emptyStrObj)).toEqual(false);
            expect(sn(strObj).not(strObj)).toEqual(false);
        });

        it('should correctly handle assert is', function () {
            expect(sn(date).assert.is(date)).toEqual(true);
            expect(sn('0').assert.is(0)).toEqual(true);
            expect(sn('10').assert.is(10)).toEqual(true);
            expect(sn('-10').assert.is(-10)).toEqual(true);
            expect(sn(30).assert.is(30)).toEqual(true);
            expect(sn(null).assert.is(undefined)).toEqual(true);
            expect(sn(false).assert.is(false)).toEqual(true);

            expect(function () {
                expect(sn(date.toString()).assert.is(date)).toEqual(false);
            }).toThrow(new TypeError('Values are not the same.'));
            expect(function () {
                expect(sn('0').assert.is(false)).toEqual(false);
            }).toThrow(new TypeError('Values are not the same.'));
            expect(function () {
                expect(sn(false).assert.is(0)).toEqual(false);
            }).toThrow(new TypeError('Values are not the same.'));
            expect(function () {
                expect(sn('').assert.is(0)).toEqual(false);
            }).toThrow(new TypeError('Values are not the same.'));

        });

    });

    describe('is.empty', function () {
        it('should correctly handle is.empty', function () {
            expect(sn(notDefined).is.empty()).toEqual(true);
            expect(sn(obj).is.empty()).toEqual(true);
            expect(sn(arr).is.empty()).toEqual(true);
            expect(sn(empty).is.empty()).toEqual(true);
            expect(sn(emptyString).is.empty()).toEqual(true);
            expect(sn(spacesOnly).is.empty()).toEqual(true);
            expect(sn('').is.empty()).toEqual(true);
            expect(sn('\n\t').is.empty()).toEqual(true);
            expect(sn('   ').is.empty()).toEqual(true);
            expect(sn(obj1).is.empty()).toEqual(false);
            expect(sn(arr1).is.empty()).toEqual(false);
            expect(sn(num).is.empty()).toEqual(false);
            expect(sn(zero).is.empty()).toEqual(false);
            expect(sn(str).is.empty()).toEqual(false);
            expect(sn(bool).is.empty()).toEqual(false);
            expect(sn(falseBool).is.empty()).toEqual(false);
            expect(sn('as').is.empty()).toEqual(false);

            expect(sn(emptyStrObj).is.empty()).toEqual(true);
            expect(sn(emptyNumObj).is.empty()).toEqual(false); // 0 is not considered empty
            expect(sn(strObj).is.empty()).toEqual(false);
            expect(sn(numObj).is.empty()).toEqual(false);
        });

        it('should correctly handle not.empty', function () {
            expect(sn('   ').not.empty()).toEqual(false);
            expect(sn(obj1).not.empty()).toEqual(true);
            expect(sn(arr1).not.empty()).toEqual(true);
        });

        it('should correctly handle assert.is.empty', function () {
            expect(sn('   ').assert.is.empty()).toEqual(true);

            expect(function () {
                sn('   ').assert.not.empty();
            }).toThrow(new TypeError('Provided value is empty.'));

            expect(function () {
                sn(obj1).assert.is.empty();
            }).toThrow(new TypeError('Provided value is not empty.'));

            expect(sn(obj1).assert.not.empty()).toEqual(true);

            expect(function () {
                sn(arr1).assert.is.empty();
            }).toThrow(new TypeError('Provided value is not empty.'));

            expect(sn(arr1).not.empty()).toEqual(true);

        });

    });


    describe('is.number', function () {
        it('should show correct values for is.number', function () {
            expect(sn(notDefined).is.number()).toEqual(false);
            expect(sn(obj).is.number()).toEqual(false);
            expect(sn(num).is.number()).toEqual(true);
            expect(sn(1.23).is.number()).toEqual(true);
            expect(sn(-1.23).is.number()).toEqual(true);
            expect(sn(empty).is.number()).toEqual(false);
            expect(sn(str).is.number()).toEqual(false);
            expect(sn(emptyString).is.number()).toEqual(false);
            expect(sn(bool).is.number()).toEqual(false);
        });

        it('should show correct values for not.number', function () {
            expect(sn(num).not.number()).toEqual(false);
            expect(sn(empty).not.number()).toEqual(true);
        });

        it('should show correctly assert number', function () {
            expect(sn(num).assert.is.number()).toEqual(true);
            expect(sn(empty).assert.not.number()).toEqual(true);
            expect(function () {
                sn(empty).assert.is.number();
            }).toThrow(new TypeError('Provided value is not number.'));
            expect(function () {
                sn(num).assert.not.number();
            }).toThrow(new TypeError('Provided value is number.'));
        });

    });

    describe('is.string', function () {
        it('should show correct values for is.string', function () {
            expect(sn(notDefined).is.string()).toEqual(false);
            expect(sn(obj).is.string()).toEqual(false);
            expect(sn(num).is.string()).toEqual(false);
            expect(sn(empty).is.string()).toEqual(false);
            expect(sn(str).is.string()).toEqual(true);
            expect(sn(emptyString).is.string()).toEqual(true);
            expect(sn(bool).is.string()).toEqual(false);
        });

        it('should show correct values for not.string', function () {
            expect(sn(notDefined).not.string()).toEqual(true);
            expect(sn(str).not.string()).toEqual(false);
        });


        it('should handle assert string', function () {
            expect(sn(str).assert.is.string()).toEqual(true);
            expect(sn(notDefined).assert.not.string()).toEqual(true);
            expect(function () {
                sn(notDefined).assert.is.string();
            }).toThrow(new TypeError('Provided value is not string.'));
            expect(function () {
                sn(str).assert.not.string();
            }).toThrow(new TypeError('Provided value is string.'));
        });
    });

    describe('is.boolean', function () {
        it('should show correct values for is.boolean', function () {
            expect(sn(notDefined).is.boolean()).toEqual(false);
            expect(sn(obj).is.boolean()).toEqual(false);
            expect(sn(num).is.boolean()).toEqual(false);
            expect(sn(empty).is.boolean()).toEqual(false);
            expect(sn(str).is.boolean()).toEqual(false);
            expect(sn(emptyString).is.boolean()).toEqual(false);
            expect(sn(bool).is.boolean()).toEqual(true);
        });

        it('should show correct values for not.boolean', function () {
            expect(sn(emptyString).not.boolean()).toEqual(true);
            expect(sn(bool).not.boolean()).toEqual(false);
        });

        it('should correctly handle assert boolean', function () {
            expect(sn(bool).assert.is.boolean()).toEqual(true);
            expect(sn(emptyString).assert.not.boolean()).toEqual(true);
            expect(function () {
                sn(emptyString).assert.is.boolean();
            }).toThrow(new TypeError('Provided value is not boolean.'));
            expect(function () {
                sn(bool).assert.not.boolean();
            }).toThrow(new TypeError('Provided value is boolean.'));
        });
    });

    describe('is.object', function () {
        it('should show correct values for is.object', function () {
            expect(sn(notDefined).is.object()).toEqual(false);
            expect(sn(obj).is.object()).toEqual(true);
            expect(sn(num).is.object()).toEqual(false);
            expect(sn(empty).is.object()).toEqual(false);
            expect(sn(str).is.object()).toEqual(false);
            expect(sn(emptyString).is.object()).toEqual(false);
            expect(sn(bool).is.object()).toEqual(false);
            expect(sn(arr).is.object()).toEqual(false);
            expect(sn(func).is.object()).toEqual(false);
        });

        it('should show correct values for not.object', function () {
            expect(sn(obj).not.object()).toEqual(false);
            expect(sn(arr).not.object()).toEqual(true);
        });

        it('should correctly handle assert.object', function () {
            expect(sn(obj).not.object()).toEqual(false);
            expect(sn(arr).not.object()).toEqual(true);
        });
    });

    describe('is.function', function () {
        it('should show correct values for is.function', function () {
            expect(sn(func).is.function()).toEqual(true);
            expect(sn(notDefined).is.function()).toEqual(false);
            expect(sn(obj).is.function()).toEqual(false);
            expect(sn(num).is.function()).toEqual(false);
            expect(sn(empty).is.function()).toEqual(false);
            expect(sn(emptyString).is.function(str)).toEqual(false);
            expect(sn(bool).is.function()).toEqual(false);
            expect(sn().is.function()).toEqual(false);
            expect(sn(arr).is.function()).toEqual(false);
        });

        it('should show correct values for not.function', function () {
            expect(sn(func).not.function()).toEqual(false);
            expect(sn(arr).not.function()).toEqual(true);
        });

        it('should correctly handle assert function', function () {
            expect(sn(arr).assert.not.function()).toEqual(true);
            expect(sn(func).assert.is.function()).toEqual(true);
            expect(function () {
                sn(func).assert.not.function();
            }).toThrow(new TypeError('Provided value is function.'));
            expect(function () {
                sn(arr).assert.is.function();
            }).toThrow(new TypeError('Provided value is not function.'));
        });
    });

    describe('is.array', function () {
        it('should show correct values for is.array', function () {
            expect(sn(notDefined).is.array()).toEqual(false);
            expect(sn(obj).is.array()).toEqual(false);
            expect(sn(num).is.array()).toEqual(false);
            expect(sn(empty).is.array()).toEqual(false);
            expect(sn(str).is.array()).toEqual(false);
            expect(sn(emptyString).is.array()).toEqual(false);
            expect(sn(bool).is.array()).toEqual(false);
            expect(sn(arr).is.array()).toEqual(true);
            expect(sn(func).is.array()).toEqual(false);
        });

        it('should show correct values for not.array', function () {
            expect(sn(arr).not.array()).toEqual(false);
            expect(sn(func).not.array()).toEqual(true);
        });

        it('should correctly handle assert array', function () {
            expect(sn(arr).assert.is.array()).toEqual(true);
            expect(sn(func).assert.not.array()).toEqual(true);
            expect(function () {
                sn(func).assert.is.array();
            }).toThrow(new TypeError('Provided value is not array.'));
            expect(function () {
                sn(arr).assert.not.array();
            }).toThrow(new TypeError('Provided value is array.'));
        });
    });

    describe('is.null', function () {
        it('should show correct values for is.null', function () {
            expect(sn(undefined).is.null()).toEqual(false);
            expect(sn(null).is.null()).toEqual(true);
            expect(sn(func).is.null()).toEqual(false);
        });

        it('should show correct values for not.null', function () {
            expect(sn(undefined).not.null()).toEqual(true);
            expect(sn(null).not.null()).toEqual(false);
        });
    });

    describe('is.undefined', function () {
        it('should show correct values for is.undefined', function () {
            expect(sn(null).is.undefined()).toEqual(false);
            expect(sn(undefined).is.undefined()).toEqual(true);
            expect(sn(func).is.undefined()).toEqual(false);
        });

        it('should show correct values for not.undefined', function () {
            expect(sn(null).not.undefined()).toEqual(true);
            expect(sn(undefined).not.undefined()).toEqual(false);
        });
    });

    describe('is.date', function () {

        it('should correctly handle is date', function () {
            // expect(sn(date).is.date()).toEqual(true);
            // expect(sn(date.toString()).is.date()).toEqual(false);
            // expect(sn({}).is.date()).toEqual(false);
            expect(sn().is.date()).toEqual(false);
        });

        it('should correctly handle not date', function () {
            expect(sn(date).not.date()).toEqual(false);
            expect(sn(date.toString()).not.date()).toEqual(true);
        });

        it('should correctly handle assert is date', function () {
            var date = new Date();

            expect(sn(date).assert.is.date()).toEqual(true);
            expect(sn(date.toString()).assert.not.date()).toEqual(true);
            expect(function () {
                sn(date.toString()).assert.is.date();
            }).toThrow(new TypeError('Provided value is not date.'));
            expect(function () {
                sn({}).assert.is.date();
            }).toThrow(new TypeError('Provided value is not date.'));
            expect(function () {
                sn().assert.is.date();
            }).toThrow(new TypeError('Provided value is not date.'));
            expect(function () {
                sn(date).assert.not.date();
            }).toThrow(new TypeError('Provided value is date.'));

        });

    });


    describe('Readme examples', function () {

        it('Readme examples should be correct', function () {
            //s.is examples
            expect(sn('0').is(false)).toEqual(false);
            expect(sn('').is(0)).toEqual(false);
            expect(sn(0).is([])).toEqual(false);
            expect(sn(false).is([])).toEqual(false);
            expect(sn('3').is(3)).toEqual(true);
            expect(sn('-3').is(-3)).toEqual(true);
            expect(sn(null).is(undefined)).toEqual(true);
            expect(sn(false).not([])).toEqual(true);
            expect(sn(10).assert.is('10')).toEqual(true);

            expect(function () {
                sn(0).assert.is('');
            }).toThrow(new TypeError('Values are not the same.'));
            expect(function () {
                sn(10).assert.not('10');
            }).toThrow(new TypeError('Values are the same.'));

            //s.is.empty
            expect(sn(null).is.empty()).toEqual(true);
            expect(sn(undefined).is.empty()).toEqual(true);
            expect(sn({}).is.empty()).toEqual(true);
            expect(sn([]).is.empty()).toEqual(true);
            expect(sn(' ').is.empty()).toEqual(true);
            expect(sn('\n\t').is.empty()).toEqual(true);
            expect(sn(0).is.empty(0)).toEqual(false);
            expect(sn(false).is.empty()).toEqual(false);
            expect(sn(null).not.empty()).toEqual(false);
            expect(function () {
                sn(null).assert.not.empty();
            }).toThrow(new TypeError('Provided value is empty.'));
            expect(function () {
                sn(0).assert.is.empty();
            }).toThrow(new TypeError('Provided value is not empty.'));

            //is.defined
            expect(sn(undefined).is.defined()).toEqual(false);
            expect(sn(null).is.defined()).toEqual(false);
            expect(sn([]).is.defined()).toEqual(true);
            expect(sn(0).is.defined()).toEqual(true);
            expect(sn(true).not.defined()).toEqual(false);
            expect(function () {
                sn(null).assert.is.defined();
            }).toThrow(new TypeError('Provided value is not defined.'));
            expect(function () {
                sn({}).assert.not.defined();
            }).toThrow(new TypeError('Provided value is defined.'));

            //is.string
            expect(sn('').is.string()).toEqual(true);
            expect(sn(2).is.string()).toEqual(false);

            //is.number
            expect(sn(2).is.number()).toEqual(true);
            expect(sn('').is.number()).toEqual(false);

            //is.boolean
            expect(sn(false).is.boolean()).toEqual(true);
            expect(sn(2).is.boolean()).toEqual(false);

            //is.object
            expect(sn({}).is.object()).toEqual(true);
            expect(sn([]).is.object()).toEqual(false);
            expect(sn(null).is.object()).toEqual(false);
            expect(sn(function () { }).is.object()).toEqual(false);
            expect(sn(false).is.object()).toEqual(false);

            //is.function
            expect(sn(function () { }).is.function()).toEqual(true);
            expect(sn([]).is.function()).toEqual(false);
            expect(sn({}).is.function()).toEqual(false);
            expect(sn(false).is.function()).toEqual(false);

            //is.array
            expect(sn([]).is.array()).toEqual(true);
            expect(sn({}).is.array()).toEqual(false);
            expect(sn(null).is.array()).toEqual(false);
        });

    });


});
