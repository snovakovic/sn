/*****************************************************
	  s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 0.0.1
 ***************************************************/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.sn = factory());
} (this, (function () {

  'use strict';

  var __EC__; //execution context

  function sn(executionContext) {
    __EC__ = executionContext;
    return sn;
  }

  //app files will be concatenated here and then this will be closed with sn.end.js


(function (global) {

    var internals = {
        stackQueueBase: function (baseArray) {
            var _arr = this.__array__ = baseArray || [];

            this.add = function (val) {
                Array.isArray(val)
                    ? Array.prototype.push.apply(_arr, val)
                    : _arr.push(val);
            };

            this.length = function () {
                return _arr.length;
            };

            return this;

        }
    };

    /**********************************************
    * Loop over array or string. this in callback function will be set to array we are looping over.
    * @param callback {Function} callback function that will be called on each iteration
    ************************************************/
    global.each = function (callback) {
        if (__EC__ && __EC__.length) {
            for (var i = 0; i < __EC__.length; i++) {
                if (callback.call(__EC__, __EC__[i], i) === false) {
                    break;
                }
            }
        }
        return sn;
    };


    /**********************************************
    * Iterate specific number of times.
    * @param l {Number} number of times we want to iterate
    * @param callback {Function} callback function that will be called on each iteration
    ************************************************/
    global.iterate = function (callback) {
        var iterations = Number(__EC__);
        if (sn(iterations).is.number()) {
            for (var i = 0; i < iterations; i++) {
                if (callback.call(null, i) === false) {
                    break;
                }
            }
        }

        return sn;
    };


    /*******************************************************
    * Shuffle values in the array
    * https://github.com/Daplie/knuth-shuffle
    * @return {Array} shuffled array
    ********************************************************/
    global.shuffle = function () {
        if (sn(__EC__).not.array()) {
            return;
        }

        var currentIndex = __EC__.length;
        var temporaryValue;
        var randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = __EC__[currentIndex];
            __EC__[currentIndex] = __EC__[randomIndex];
            __EC__[randomIndex] = temporaryValue;
        }

        return __EC__;
    };


    /*********************************************
    * Get new array filled with default values
    * @param val {Any} default array value
    * @return len {Integer} size of the new array
    **********************************************/
    global.fillArray = function (len) {
        var rv = new Array(len);
        while (--len >= 0) {
            rv[len] = __EC__;
        }
        return rv;
    };

    /*********************************************
    * If array return unmodified array if not array creates array from provided value
    **********************************************/
    global.toArray = function () {
        if (__EC__ == null) {
            return [];
        }

        if (Array.isArray(__EC__)) {
            return __EC__;
        }

        //convert array like object to array or otherwise wrap values with array.
        return typeof __EC__ === 'object' && __EC__.hasOwnProperty('length') && typeof __EC__.length === 'number'
            ? Array.prototype.slice.call(__EC__)
            : [__EC__];
    };



    /*************************************************
    * Returns new array containing only unique values from original array
    * Doesn't support nested objects and array
    * @param path {String} path to object property to compare for uniqueness
    * @return array without duplicate values
    ***********************************************/
    global.unique = function (path) {
        if (global.is.array()) {
            var pathUniqueValues = [];
            var arr = [];
            for (var i = 0; i < __EC__.length; i++) {
                if (path) {
                    var pathTokens = path.split('.');
                    var val = __EC__[i];
                    for (var n = 0; n < pathTokens.length; n++) {
                        val = val[pathTokens[n]];
                        if (!val) {
                            throw TypeError('Invalid path. Object property does not exist');
                        }
                    }

                    if (pathUniqueValues.indexOf(val) === -1) {
                        arr.push(__EC__[i]);
                        pathUniqueValues.push(val);
                    }

                }
                else if (arr.indexOf(__EC__[i]) === -1) {
                    arr.push(__EC__[i]);
                }
            }
            return arr;
        }

        return __EC__;
    };


    /********************************************s
    * Returns first element of array if no condition is passed,
    * else if there is condition returns first element of array that meets condition
    * @param condition {Function} function that returns true if value is found.
    * @return array item if found or undefined if not found
    **********************************************/
    global.first = function (condition) {
        if (__EC__ && __EC__.length) {
            if (condition) {
                for (var i = 0; i < __EC__.length; i++) {
                    if (condition(__EC__[i])) {
                        return __EC__[i];
                    }
                }
            } else {
                return __EC__[0];
            }
        }

        return undefined;

    };

    /**********************************************************
    * Returns last element of array if no condition is passed,
    * else if there is condition returns last element of array that meets condition
    * @param condition {Function} function that returns true if value is found.
    * @return array item if found or undefined if not found
    ***********************************************************/
    global.last = function (condition) {
        if (__EC__ && __EC__.length) {
            if (condition) {
                for (var i = __EC__.length - 1; i >= 0; i--) {
                    if (condition(__EC__[i])) {
                        return __EC__[i];
                    }
                }
            } else {
                return __EC__[__EC__.length - 1];
            }
        }

        return undefined;

    };



    /*********************************************
     * Stack implementation LIFO last in first out
     * @param defaultArray [optional] {Array} default array that will be used as a stack base
    *********************************************/
    global.stack = function (defaultArray) {
        var stack = new internals.stackQueueBase(defaultArray);
        stack.remove = function () {
            var _arr = this.__array__;
            return _arr.length ? _arr.pop() : null;
        };
        stack.peek = function () {
            var _arr = this.__array__;
            return _arr.length ? _arr[_arr.length - 1] : null;
        };

        return stack;
    };


    /*********************************************
    * Queue implementation FIFO: first in first out
    * @param defaultArray [optional] {Array} default array that will be used as a queue base
    *********************************************/
    global.queue = function (defaultArray) {
        var queue = new internals.stackQueueBase(defaultArray);
        queue.remove = function () {
            var _arr = this.__array__;
            return _arr.length ? _arr.shift() : null;
        };
        queue.peek = function () {
            var _arr = this.__array__;
            return _arr.length ? _arr[0] : null;
        };

        return queue;
    };


})(sn);

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
        return dt;
    };


    /**********************************************
    * Check if day in date is last day of month
    * @return true -> day is last day of month; false - day is not last day of month
    ************************************************/
    global.is.lastDayOfMonth = function () {
        var dt = getDate();
        var test = new Date(dt.getTime());
        test.setDate(test.getDate() + 1);
        return test.getDate() === 1;
    };


    /**********************************************
    * Check if day in date is last day of month
    * @return true -> day is last day of month; false - day is not last day of month
    ************************************************/
    global.getLastDayOfMonth = function () {
        var dt = getDate();
        return (new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate();
    };


    /**********************************************
    * Add or remove dates from provided date
    * @param milliseconds {Number} +/- milliseconds to add or remove from date
    ************************************************/
    global.addMilliseconds = function (milliseconds) {
        var dt = getDate();
        dt.setMilliseconds(dt.getMilliseconds() + milliseconds);
        return dt;
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param seconds {Number} +/- seconds to add or remove from date
    ************************************************/
    global.addSeconds = function (seconds) {
        var dt = getDate();
        dt.setSeconds(dt.getSeconds() + seconds);
        return dt;
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param minutes {Number} +/- minutes to add or remove from date
    ************************************************/
    global.addMinutes = function (minutes) {
        var dt = getDate();
        dt.setMinutes(dt.getMinutes() + minutes);
        return dt;
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param hours {Number} +/- hours to add or remove from date
    ************************************************/
    global.addHours = function (hours) {
        var dt = getDate();
        dt.setHours(dt.getHours() + hours);
        return dt;
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param days {Number} +/- days to add or remove from date
    ************************************************/
    global.addDays = function (days) {
        var dt = getDate();
        dt.setDate(dt.getDate() + days);
        return dt;
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param months {Number} +/- months to add or remove from date
    ************************************************/
    global.addMonths = function (months) {
        var dt = getDate();
        dt.setMonth(dt.getMonth() + months);
        return dt;
    };

    /**********************************************
    * Add or remove dates from provided date
    * @param years {Number} +/- years to add or remove from date
    ************************************************/
    global.addYears = function (years) {
        var dt = getDate();
        dt.setFullYear(dt.getFullYear() + years);
        return dt;
    };

    /**********************************************
    * Get the list of english months with fullName, shortName and month index
    ************************************************/
    global.getMonths = function () {
        return [
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
        ];
    };

})(sn);

(function (global) {


    /**********************************************
    * returns function that can be executed only once
    * Result of function execution is cached and can be accesed latter by calling that function
    ************************************************/
    global.once = function (fn) {
        var result;
        return function () {
            if (fn) {
                result = fn.apply(this, arguments);
                fn = null;
            }
            return result;
        };
    };

    /**********************************************
    * Returns a function, that, as long as it continues to be invoked, will not be triggered
    * Default wait time for debounce is 200ms.
     ************************************************/
    global.debounce = function (fn, wait) {
        var timeout;
        return function () {
            var callNow = !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);

            if (callNow) { fn.apply(this, arguments); }
        };
    };

    /*************************
    * execute function when condition becomes true
    ************************/
    global.execute = function (executeFn) {
        return (function () {
            var tick;
            var maxTicks;

            function executer(conditionFn) {
                if (maxTicks < -tick) {
                    return;
                } else if (!isNaN(maxTicks)) {
                    maxTicks -= tick;
                }

                conditionFn() ? executeFn() : setTimeout(executer.bind(null, conditionFn), tick);
            }

            return {
                when: function (conditionFb, _tick, _maxTicks) {
                    tick = _tick || 5;
                    maxTicks = _maxTicks;
                    executer(conditionFb);
                }

            };
        })();
    };


    /*****************************
     * sMsg - broadcast messages
     ****************************/
    var subscribers = {};

    global.broadcast = function (to) {
        var callArguments = Array.prototype.slice.call(arguments, 1, arguments.length);
        for (var i = 0; i < subscribers[to].length; i++) {
            subscribers[to][i].apply(this, callArguments);
        }
    };

    global.listen = function (subscribe, cb) {
        subscribers[subscribe] = subscribers[subscribe] || [];
        subscribers[subscribe].push(cb);
    };


})(sn);

(function (global) {

    var internals = {
        deepSealOrFreez: function deepSealOrFreez(obj, action, check) {
            action(obj);

            Object.getOwnPropertyNames(obj).forEach(function (key) {
                if (obj.hasOwnProperty(key)
                    && obj[key] !== null
                    && (typeof obj[key] === 'object' || typeof obj[key] === 'function')
                    && !check(obj[key])) {
                    deepSealOrFreez(obj[key], action, check);
                }
            });

            return obj;
        }
    };

    /**********************************************
    * Apply Object.freez recursively on object and property of object.
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    ************************************************/
    global.deepFreeze = function deepFreez() {
        return internals.deepSealOrFreez(__EC__, Object.freeze, Object.isFrozen);
    };

    /**********************************************
    * Apply Object.seal recursively on object and property of object.
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
    ************************************************/
    global.deepSeal = function deepSeal() {
        return internals.deepSealOrFreez(__EC__, Object.seal, Object.isSealed);
    };



    /**********************************************
    * Extend object with the properties from other provided objects.
    * In case of same properties names value from first object will be overriden with the value from second object
    ************************************************/
    global.extend = function () {
        var objects = Array.prototype.slice.call(arguments);
        objects.unshift(__EC__);

        for (var i = 1; i < objects.length; i++) {
            Object.getOwnPropertyNames(objects[i]).forEach(function (key) {
                if (objects[i].hasOwnProperty(key)) {
                    objects[0][key] = objects[i][key];
                }
            });
        }
        return objects[0];
    };

})(sn);

(function (global) {

    function isString() {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] !== 'string') {
                return false;
            }
        }

        return true;
    }

    /**************************************************
    * Remove all occurrences of substring in string
    * @param whatToReplace {String}
    * @param replaceWith {String}
    * @return {String} string with replaced old values with new values
    **************************************************/
    global.replaceAll = function (whatToReplace, replaceWith) {
        return isString(__EC__, whatToReplace, replaceWith)
            ? __EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
            : __EC__;
    };


    /**************************************************
    * Capitalize string
    * @return {String} capitalized string
    **************************************************/
    global.capitalize = function () {
        return isString(__EC__)
            ? __EC__[(0)].toUpperCase() + __EC__.slice(1)
            : __EC__;
    };


    /**************************************************
    * test if string contains substring
    * @param substring {String} substring we want to check for existance
    * @param ignoreCase {Boolean} if true ignore case when comparing string
    * @example capitalize('foo Bar', 'oo'); => 'Foo Bar'; capitalize('FOO Bar', true); => 'Foo bar'
    * https://github.com/epeli/underscore.string
    **************************************************/
    global.contains = function (substring, ignoreCase) {

        if (isString(__EC__, substring)) {
            if (ignoreCase === true) {
                __EC__ = __EC__.toLowerCase();
                substring = substring.toLowerCase();
            }

            return __EC__.indexOf(substring) !== -1;
        }

        return false;

    };


    /**************************************************
    * Break string in array of substring.
    * @param step {Number} length of chopped substrings
    * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
    * @return {Array} array containing chopped substrings
    **************************************************/
    global.chop = function (step) {
        if (isString(__EC__)) {
            __EC__ = String(__EC__);
            step = ~~step;
            return step > 0 ? __EC__.match(new RegExp('.{1,' + step + '}', 'g')) : [__EC__];
        }

        return [];
    };


    /**************************************************
    * Trim and replace multiple spaces with a single space.
    * @return {String} trimmed and cleaned string
    **************************************************/
    global.clean = function () {
        return isString(__EC__)
            ? __EC__.trim().replace(/\s\s+/g, ' ')
            : __EC__;
    };


    /**********************************************
    * Truncate string if it exceed max number of characters,
    * apply provided truncate string at the end of truncated string (default: '...')
    * @param length {Number} cut the string after this number of characters
    * @param appender [optional, default: '...'] {String} string that will be appended to truncated string
    * @return {String} truncated string
    **********************************************/
    global.truncate = function (length, appender) {
        appender = appender || '...';
        length = ~~length;
        return (isString(__EC__) && __EC__.length > length)
            ? __EC__.slice(0, length) + appender
            : __EC__;
    };


    /**********************************************
    * Returns part of the string between 2 words.
    * @param str1 {String}
    * @param str2 {String}
    * @return {String} string between startStr and endStr
    ***********************************************/
    global.between = function (str1, str2) {
        if (isString(__EC__, str1, str2)) {
            var index1 = __EC__.indexOf(str1);
            var index2 = __EC__.indexOf(str2);

            if (index1 === -1 || index2 === -1) {
                return undefined;
            }

            if (index2 > index1) {
                index1 += str1.length;
                return __EC__.substr(index1, index2 - index1);
            } else {
                index2 += str2.length;
                return __EC__.substr(index2, index1 - index2);
            }
        }

    };

})(sn);

  return sn;
})));

//# sourceMappingURL=sn.js.map
