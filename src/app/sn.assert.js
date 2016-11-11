(function (global) {

    var internals = {
        isString: function (testVar) {
            return typeof testVar === 'string';
        },
        isNumber: function (testVar) {
            //NaN will produce false because NaN !== NaN
            return typeof testVar === 'number' && testVar === testVar;
        },
        isDate: function (testVar) {
            return Object.prototype.toString.call(testVar) === '[object Date]';
        },
        assert: function (val, assertMessage) {
            if (val) {
                return val;
            }
            throw new TypeError(assertMessage);
        }

    };



    /****************************************
    * Safely check if two variables are the same without JS coercion gotchas
    * == is used when comparing string and numbers (with exception for emptySting == 0 which is false as it should be)
    * == is used for compering null and undefined
    * for everything else === is used.
    * ********************************* */
    global.is = function (t2) {
        var t1 = __EC__;
        if ((internals.isString(t1) || internals.isNumber(t1)) && (internals.isString(t2) || internals.isNumber(t2))) {
            //this covers coercion between string and number without any gotchas
            return (typeof t1 === typeof t2)
                ? t1 === t2
                : t1 == t2 && t1 !== '' && t2 !== '';

        } else if (t1 == null && t2 == null) {
            //This covers when vars are either null or undefined without any gotchas
            return true;
        }

        return t1 === t2;

    };


    /****************************************************
     * Test if variable has been defined and is not empty,
     * Following will be treated as false
     * sn(null).is.empty(); => true
     * sn(undefined).is.empty(); => true
     * sn({}).is.empty(); => true
     * sn([]).is.empty(); => true
     * sn(' ').is.empty(); => true
     * sn('\n\t').is.empty(); => true
    ********************************************************/
    global.is.empty = function () {
        if (__EC__ == null
            || (typeof __EC__ === 'string' && (/^\s*$/).test(__EC__))) {
            return true;
        }

        if (typeof __EC__ === 'object') {
            for (var key in __EC__) {
                if (__EC__.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }

        return false;
    };


    /***************************************
     * START: data type checks
     **************************************/
    global.is.string = function () {
        return internals.isString(__EC__);
    };

    global.is.number = function () {
        return internals.isNumber(__EC__);
    };

    global.is.boolean = function () {
        return typeof __EC__ === 'boolean';
    };

    global.is.null = function () {
        return __EC__ === null;
    };

    global.is.undefined = function () {
        return typeof __EC__ === 'undefined';
    };

    //not null and undefined
    global.is.defined = function () {
        return __EC__ != null;
    };

    global.is.object = function () {
        return typeof __EC__ === 'object'
            && __EC__ !== null
            && !Array.isArray(__EC__);
    };

    global.is.function = function () {
        return typeof __EC__ === 'function';
    };

    global.is.array = function () {
        return typeof __EC__ === 'object' && Array.isArray(__EC__);
    };

    global.is.date = function () {
        return internals.isDate(__EC__);
    };

    /***************************************
    * END: data type checks
    **************************************/


    /*************************************
    * START: ASSERT && NOT MODULE DEFINITION
    **************************************/
    global.not = function (val) {
        return !global.is(val);
    };

    global.assert = {
        is: function (val) {
            return internals.assert(global.is(val), 'Values are not the same.');
        },
        not: function (val) {
            return internals.assert(!global.is(val), 'Values are the same.');
        }
    };

    for (var prop in global.is) {
        if (global.is.hasOwnProperty(prop)) {
            (function (prop) {
                global.not[prop] = function () {
                    return !global.is[prop]();
                };
                global.assert.is[prop] = function () {
                    return internals.assert(global.is[prop](), 'Provided value is not ' + prop + '.');
                };
                global.assert.not[prop] = function () {
                    return internals.assert(!global.is[prop](), 'Provided value is ' + prop + '.');
                };
            })(prop);
        }
    }

    /*************************************
    * END: ASSERT MODULE DEFINITION
    **************************************/


})(sn);
