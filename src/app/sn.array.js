(function (sn) {


    /**********************************************
    * Loop over array or string. this in callback function will be set to array we are looping over.
    * @param callback {Function} callback function that will be called on each iteration
    ************************************************/
    sn.each = function (callback) {
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
    sn.iterate = function (callback) {
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
    sn.shuffle = function () {
        if(sn(__EC__).not.array()) {
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
    * Get the new array filled with default values
    * @param val {Any} default array value
    * @return len {Integer} size of the new array
    **********************************************/
    sn.getFilledArray = function (val, len) {
        var rv = new Array(len);
        while (--len >= 0) {
            rv[len] = val;
        }
        return rv;
    };


    /*************************************************
    * Returns new array containing only unique values from original array
    * Doesn't support nested objects and array
    * @param originalArr {Array} array form where we want to remove duplicate values
    * @return array without duplicate values
    ***********************************************/
    sn.unique = function (originalArr) {
        var arr = [];
        for (var i = 0; i < originalArr.length; i++) {
            if (arr.indexOf(originalArr[i]) === -1) {
                arr.push(originalArr[i]);
            }
        }
        return arr;
    };


    /********************************************s
    * Returns first element of array if no condition is passed,
    * else if there is condition returns first element of array that meets condition
    * @param arr {Array} array we want to search in for value
    * @param condition {Function} function that returns true if value is found.
    * @return array item if found or undefined if not found
    **********************************************/
    sn.first = function (arr, condition) {
        if (arr && arr.length) {
            if (condition) {
                for (var i = 0; i < arr.length; i++) {
                    if (condition(arr[i])) {
                        return arr[i];
                    }
                }
            } else {
                return arr[0];
            }
        }

        return undefined;

    };

    /**********************************************************
    * Returns last element of array if no condition is passed,
    * else if there is condition returns last element of array that meets condition
    * @param arr {Array} [optional] array we want to search in for value
    * @param condition {Function} function that returns true if value is found.
    * @return array item if found or undefined if not found
    ***********************************************************/
    sn.last = function (arr, condition) {
        if (arr && arr.length) {
            if (condition) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (condition(arr[i])) {
                        return arr[i];
                    }
                }
            } else {
                return arr[arr.length - 1];
            }
        }

        return undefined;

    };


    //Stack && Queue implementation
    (function (sn) {

        var stackQueueBase = function (baseArray) {
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

        };


        /*********************************************
         * Stack implementation LIFO last in first out
         * @param defaultArray [optional] {Array} default array that will be used as a stack base
        *********************************************/
        sn.stack = function (defaultArray) {
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
        sn.queue = function (defaultArray) {
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


})(sn);
