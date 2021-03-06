(function (global) {

    /**********************************************
    * Loop over array or string. this in callback function will be set to array we are looping over.
    * @param callback {Function} callback function that will be called on each iteration
    ************************************************/
    function each(cb) {
        if (__EC__) {
            for (var i = 0; i < __EC__.length; i++) {
                if (cb.call(__EC__, __EC__[i], i) === false) {
                    break;
                }
            }
        }

        return _returnImmediate();

    }

    global.each = each;

    global.forEach = each;


    /**********************************************
    * Iterate specific number of times.
    * @param l {Number} number of times we want to iterate
    * @param callback {Function} callback function that will be called on each iteration
    ************************************************/
    global.iterate = function (callback) {
        var iterations = ~~__EC__;
        if (_isNumber(iterations)) {
            for (var i = 0; i < iterations; i++) {
                if (callback.call(null, i) === false) {
                    break;
                }
            }
        }

        return _returnImmediate();
    };


    /*******************************************************
    * Shuffle values in the array
    * https://github.com/Daplie/knuth-shuffle
    * @return {Array} shuffled array
    ********************************************************/
    global.shuffle = function () {
        if (!_isArray(__EC__)) {
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
        }

        return _return(__EC__);
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
        return _return(rv);
    };


    /*********************************************
    * Returns array.
    * Convert array likes to array (arrguments etc..)
    * If array return unmodified array
    * Wrap any other value with array
    **********************************************/
    global.toArray = function () {
        var returnValue;
        if (__EC__ == null) {
            returnValue = [];
        }

        else if (_isArray(__EC__)) {
            returnValue = __EC__;
        }

        else {
            //convert array like object to array or otherwise wrap values with array.
            returnValue = _isObject(__EC__) && __EC__.hasOwnProperty('length') && _isNumber(__EC__.length)
                ? Array.prototype.slice.call(__EC__)
                : [__EC__];
        }

        return _return(returnValue);
    };


    /*************************************************
    * Returns new array containing only unique values from original array
    * Doesn't support nested objects and array
    * @param path {String} path to object property to compare for uniqueness
    * @return array without duplicate values :""LK
    ***********************************************/
    global.unique = function (path) {
        if (_isArray(__EC__)) {
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

            return _return(arr);
        }

        return _return(__EC__);
    };


    /********************************************s
    * Returns first element of array if no condition is passed,
    * else if there is condition returns first element of array that meets condition
    * @param condition {Function} function that returns true if value is found.
    * @return array item if found or undefined if not found
    **********************************************/
    global.first = function (condition) {
        if (__EC__) {
            if (condition) {
                for (var i = 0; i < __EC__.length; i++) {
                    if (condition(__EC__[i])) {
                        return _return(__EC__[i]);
                    }
                }
            } else {
                return _return(__EC__[0]);
            }
        }

        return _return(undefined);

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
                        return _return(__EC__[i]);
                    }
                }
            } else {
                return _return(__EC__[__EC__.length - 1]);
            }
        }

        return _return(undefined);

    };

    /*********************************************
     * Base implementation for stack and queue
     * @param {Array} [baseArray] default array that will be used as a stack base
    *********************************************/
    function stackQueueBase(baseArray) {
        var _arr = this.__array__ = baseArray || [];

        this.add = function (val) {
            _isArray(val)
                ? Array.prototype.push.apply(_arr, val)
                : _arr.push(val);
        };

        this.length = function () {
            return _arr.length;
        };

        return this;

    }

    /*********************************************
     * Stack implementation LIFO last in first out
     * @param defaultArray [optional] {Array} default array that will be used as a stack base
    *********************************************/
    global.stack = function (defaultArray) {
        var stack = new stackQueueBase(defaultArray);
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
        var queue = new stackQueueBase(defaultArray);
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
