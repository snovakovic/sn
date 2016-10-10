var snovakovic;
var s;

(function() {

  //It will be added as s to global scope only if it does not exist already
  snovakovic = function(executionContext) {
    snovakovic.__EC__ = executionContext;
    return snovakovic;
  };

  snovakovic.noConflict = function() {
    if (s === snovakovic) { s = undefined; }
    return snovakovic;
  }

  if (!s) {
    s = snovakovic;
  }

})();

(function(s) {

  s.capitalize = function(str) {
    str = str || s.__EC__;
    s.value = typeof str === 'string' ? capitalize(str) : str;
    return s.__EC__ ? s : s.value;
  };

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  s.replaceAll = function(whatToReplace) {
    return {
      with: function(replaceWith) {
        return typeof s.__EC__ === 'string'
          ? s.__EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
          : s.__EC__;
      }
    }
  };

})(snovakovic);

(function(s) {

  /**********************************************
  * returns function that can be executed only once
  * Result of function execution is cached and can be accesed latter by calling that function
 ************************************************/
  s.once = function(fn) {
    var result;
    fn = fn || s.__EC__;
    return function() {
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
  s.debounce = function(fn, wait) {
    var timeout;
    return function() {
      var callNow = !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);

      if (callNow) { fn.apply(this, arguments); }
    };
  };

  /*************************
  * execute function when condition becomes true
  ************************/
  s.execute = function(executeFn) {
    return (function() {
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
        when: function(conditionFb, _tick, _maxTicks) {
          tick = _tick || 5;
          maxTicks = _maxTicks;
          executer(conditionFb);
          return s;
        }

      };
    })();
  };

  /*****************************
   * sMsg - broadcast messages
   ****************************/
  (function(s) {
    var subscribers = {};

    s.broadcast = function(to) {
      var callArguments = Array.prototype.slice.call(arguments, 1, arguments.length);
      for (var i = 0; i < subscribers[to].length; i++) {
        subscribers[to][i].apply(this, callArguments);
      }
      return s;
    };

    s.listen = function(subscribe, cb) {
      subscribers[subscribe] = subscribers[subscribe] || [];
      subscribers[subscribe].push(cb);
      return s;
    };

  })(s);


})(window.snovakovic);



}).listen('ola').once();
