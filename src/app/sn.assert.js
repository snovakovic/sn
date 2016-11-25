(function(global) {

    /****************************************
    * Safely check if two variables are the same without JS coercion gotchas
    * == is used when comparing string and numbers (with exception for emptySting == 0 which is false as it should be)
    * == is used for compering null and undefined
    * for everything else === is used.
    * ********************************* */
    global.is = function(t2) {
        var t1 = __EC__;
        if ((_isString(t1) || _isNumber(t1)) && (_isString(t2) || _isNumber(t2))) {
            //this covers coercion between string and number without any gotchas
            return _returnImmediate((typeof t1 === typeof t2)
                ? t1 === t2
                : t1 == t2 && t1 !== '' && t2 !== '');

        } else if (t1 == null && t2 == null) {
            //This covers when vars are either null or undefined without any gotchas
            return _returnImmediate(true);
        }

        return _returnImmediate(t1 === t2);

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
    global.is.empty = function() {
        if (__EC__ == null
            || (typeof __EC__ === 'string' && (/^\s*$/).test(__EC__))) {
            return _returnImmediate(true);
        }

        if (typeof __EC__ === 'object') {
            for (var key in __EC__) {
                if (__EC__.hasOwnProperty(key)) {
                    return _returnImmediate(false);
                }
            }
            return _returnImmediate(true);
        }

        return _returnImmediate(false);
    };


    /***************************************
     * START: data type checks
     **************************************/
    global.is.string = function() {
        return _returnImmediate(_isString(__EC__));
    };


    global.is.number = function() {
        return _returnImmediate(_isNumber(__EC__));
    };


    global.is.boolean = function() {
        return _returnImmediate(typeof __EC__ === 'boolean');
    };


    global.is.null = function() {
        return _returnImmediate(__EC__ === null);
    };


    global.is.undefined = function() {
        return _returnImmediate(typeof __EC__ === 'undefined');
    };


    //not null and undefined
    global.is.defined = function() {
        return _returnImmediate(__EC__ != null);
    };


    global.is.object = function() {
        return _returnImmediate(typeof __EC__ === 'object'
            && __EC__ !== null
            && !_isArray(__EC__));
    };


    global.is.function = function() {
        return _returnImmediate(typeof __EC__ === 'function');
    };


    global.is.array = function() {
        return _returnImmediate(_isArray(__EC__));
    };


    global.is.date = function() {
        return _returnImmediate(_isDate(__EC__));
    };


    /*************************************
    * START: ASSERT && NOT MODULE DEFINITION
    **************************************/

    global.not = function(val) {
        return !global.is(val);
    };

    function assert(val, assertMessage) {
        if (val) {
            return val;
        }
        throw new TypeError(assertMessage);
    }

    global.assert = {
        is: function(val) {
            return assert(global.is(val), 'Values are not the same.');
        },
        not: function(val) {
            return assert(!global.is(val), 'Values are the same.');
        }
    };


    for (var prop in global.is) {
        if (global.is.hasOwnProperty(prop)) {
            (function(prop) {
                global.not[prop] = function() {
                    return !global.is[prop]();
                };
                global.assert.is[prop] = function() {
                    return assert(global.is[prop](), 'Provided value is not ' + prop + '.');
                };
                global.assert.not[prop] = function() {
                    return assert(!global.is[prop](), 'Provided value is ' + prop + '.');
                };
            })(prop);
        }
    }


})(sn);
