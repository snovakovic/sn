(function (global) {


    /**********************************************
    * returns function that can be executed only once
    * Result of function execution is cached and can be accesed latter by calling that function
    ************************************************/
    global.once = function (fn) {
        //TODO: Should this be chainable or not??
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
