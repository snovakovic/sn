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


(function (sn) {

  //PRIVATE
  var assertIsArray = function (arr) {
    sn(arr || __EC__).assert.is.array();
  };

  //PUBLIC

  /**********************************************
  * Loop over array. this in callback function will ber set to array.
  * @param arr {Array} array we want to iterate
  * @param callback {Function} callback function that will be called on each iteration
  ************************************************/
  sn.each = function (callback) {
    assertIsArray();

    for (var i = 0, l = __EC__.length; i < l; i++) {
      if (callback.call(__EC__, __EC__[i], i) === false) {
        break;
      }
    }
    return sn;
  };

  /**********************************************
  * Iterate specific number of times.
  * @param l {Number} number of times we want to iterate
  * @param callback {Function} callback function that will be called on each iteration
  ************************************************/
  sn.iterate = function (l, callback) {
    for (var i = 0; i < l; i++) {
      if (callback.call(null, i) === false) {
        break;
      }
    }
  };

  /***********************************************
  * Remove all occurrences of element from array
  * @param arr {Array} array from where we want  to remove values
  * @param elToRemove {...} element that we want to remove from array
  * @param max {whole number integer} max number of occurrences to remove. 1 - remove first, -1 remove last.
  * @return {Array} new array without removed values
  ***********************************************/
  sn.remove = function (elToRemove, max) {
    var pos;

    assertIsArray();

    while (pos !== -1 && max !== 0) {
      if (max) {
        if (max >= 1) {
          pos = __EC__.indexOf(elToRemove);
          max--;
        } else {
          pos = __EC__.lastIndexOf(elToRemove);
          max++;
        }

      } else {
        pos = __EC__.indexOf(elToRemove);
      }

      pos > -1 && __EC__.splice(pos, 1);
    }

    return __EC__;
  };

  /*******************************************************
  * Shuffle values in the array
  * https://github.com/Daplie/knuth-shuffle
  * @param arr {Array} input array that we want to shuffle
  * @return {Array} shuffled array
  ********************************************************/
  sn.shuffle = function () {
    var currentIndex = __EC__.length;
    var temporaryValue;
    var randomIndex;

    assertIsArray();

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
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

    assertIsArray();

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
    assertIsArray();

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
    assertIsArray();

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

  /*********************************************
   * Stack implementation LIFO last in first out
   * @param defaultArray [optional] {Array} default array that will be used as a stack base
  *********************************************/
  sn.stack = function (defaultArray) {
    if (defaultArray) {
      assertIsArray();
    }

    return (function () {
      var _stack = defaultArray || [];
      return {
        add: function (val) {
          Array.isArray(val) ? Array.prototype.push.apply(_stack, val) : _stack.push(val);
        },
        remove: function () {
          return _stack.length ? _stack.pop() : null;
        },
        peek: function () {
          return _stack.length ? _stack[_stack.length - 1] : null;
        },
        get array() {
          return _stack;
        },
        get length() {
          return _stack.length;
        }
      };
    })();
  };

  /*********************************************
  * Queue implementation FIFI: first in first out
   * @param defaultArray [optional] {Array} default array that will be used as a queue base
  *********************************************/
  sn.queue = function (defaultArray) {
    if (defaultArray) {
      assertIsArray();
    }

    return (function () {
      var _queue = defaultArray || [];
      return {
        add: function (val) {
          Array.isArray(val) ? Array.prototype.push.apply(_queue, val) : _queue.push(val);
        },
        addRange: function (range) {
          Array.prototype.push.apply(_queue, range);
        },
        remove: function () {
          return _queue.length ? _queue.shift() : null;
        },
        peek: function () {
          return _queue.length ? _queue[0] : null;
        },
        get array() {
          return _queue;
        },
        get length() {
          return _queue.length;
        }
      };
    })();
  };

})(sn);

(function (sn) {

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


  //PUBLIC

  /****************************************
  * Safely check if two variables are the same without JS coercion gotchas
  * == is used when comparing string and numbers (with exception for emptySting == 0 which is false as it should be)
  * == is used for compering null and undefined
  * for everything else === is used.
  * ********************************* */
  sn.is = function (t2) {
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
  sn.is.empty = function () {
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
  sn.is.string = function () {
    return internals.isString(__EC__);
  };

  sn.is.number = function () {
    return internals.isNumber(__EC__);
  };

  sn.is.boolean = function () {
    return typeof __EC__ === 'boolean';
  };

  sn.is.null = function () {
    return __EC__ === null;
  };

  sn.is.undefined = function () {
    typeof __EC__ === 'undefined';
  };

  //not null and undefined
  sn.is.defined = function () {
    return __EC__ != null;
  };

  sn.is.object = function () {
    return typeof __EC__ === 'object'
      && __EC__ !== null
      && !Array.isArray(__EC__);
  };

  sn.is.function = function () {
    return typeof __EC__ === 'function';
  };

  sn.is.array = function () {
    return typeof __EC__ === 'object' && Array.isArray(__EC__);
  };

  sn.is.date = function () {
    return internals.isDate(__EC__);
  };

  /***************************************
  * END: data type checks
  **************************************/


  /*************************************
  * START: ASSERT && NOT MODULE DEFINITION
  **************************************/
  sn.not = function (val) {
    return !sn.is(val);
  };

  sn.assert = {
    is: function (val) {
      return internals.assert(sn.is(val), 'Values are not the same.');
    },
    not: function (val) {
      return internals.assert(!sn.is(val), 'Values are the same.');
    }
  };

  for (var prop in sn.is) {
    if (sn.is.hasOwnProperty(prop)) {
      (function (prop) {
        sn.not[prop] = function () {
          return !sn.is[prop]();
        };
        sn.assert.is[prop] = function () {
          return internals.assert(sn.is[prop](), 'Provided value is not ' + prop + '.');
        };
        sn.assert.not[prop] = function () {
          return internals.assert(!sn.is[prop](), 'Provided value is ' + prop + '.');
        };
      })(prop);
    }
  }

  /*************************************
  * END: ASSERT MODULE DEFINITION
  **************************************/


})(sn);

(function (sn) {

  //PRIVATE
  var getDate = function () {
    if (__EC__) {
      sn.assert.is.date(__EC__);
      return __EC__;
    }
    return new Date();
  };



  //PUBLIC

  /**********************************************
  * Change provided date so that it point to last day of current month
  ************************************************/
  sn.setLastDayOfMonth = function () {
    var dt = getDate();
    dt.setMonth(dt.getMonth() + 1, 0);
    return dt;
  };


  /**********************************************
  * Check if day in date is last day of month
  * @return true -> day is last day of month; false - day is not last day of month
  ************************************************/
  sn.is.lastDayOfMonth = function () {
    var dt = getDate();
    var test = new Date(dt.getTime());
    test.setDate(test.getDate() + 1);
    return test.getDate() === 1;
  };


  /**********************************************
  * Check if day in date is last day of month
  * @return true -> day is last day of month; false - day is not last day of month
  ************************************************/
  sn.getLastDayOfMonth = function () {
    var dt = getDate();
    return (new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate();
  };


  /**********************************************
  * Add or remove dates from provided date
  * @param milliseconds {Number} +/- milliseconds to add or remove from date
  ************************************************/
  sn.addMilliseconds = function (milliseconds) {
    var dt = getDate();
    dt.setMilliseconds(dt.getMilliseconds() + milliseconds);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param seconds {Number} +/- seconds to add or remove from date
  ************************************************/
  sn.addSeconds = function (seconds) {
    var dt = getDate();
    dt.setSeconds(dt.getSeconds() + seconds);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param minutes {Number} +/- minutes to add or remove from date
  ************************************************/
  sn.addMinutes = function (minutes) {
    var dt = getDate();
    dt.setMinutes(dt.getMinutes() + minutes);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param hours {Number} +/- hours to add or remove from date
  ************************************************/
  sn.addHours = function (hours) {
    var dt = getDate();
    dt.setHours(dt.getHours() + hours);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param days {Number} +/- days to add or remove from date
  ************************************************/
  sn.addDays = function (days) {
    var dt = getDate();
    dt.setDate(dt.getDate() + days);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param months {Number} +/- months to add or remove from date
  ************************************************/
  sn.addMonths = function (months) {
    var dt = getDate();
    dt.setMonth(dt.getMonth() + months);
    return dt;
  };

  /**********************************************
  * Add or remove dates from provided date
  * @param years {Number} +/- years to add or remove from date
  ************************************************/
  sn.addYears = function (years) {
    var dt = getDate();
    dt.setFullYear(dt.getFullYear() + years);
    return dt;
  };

  /**********************************************
  * Get the list of english months with fullName, shortName and month index
  ************************************************/
  sn.getMonths = function () {
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

/**********************************************
* returns function that can be executed only once
* Result of function execution is cached and can be accesed latter by calling that function
************************************************/
sn.once = function(fn) {
  var result;
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
sn.debounce = function(fn, wait) {
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
sn.execute = function(executeFn) {
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
      }

    };
  })();
};

/*****************************
 * sMsg - broadcast messages
 ****************************/
(function(sn) {
  var subscribers = {};

  sn.broadcast = function(to) {
    var callArguments = Array.prototype.slice.call(arguments, 1, arguments.length);
    for (var i = 0; i < subscribers[to].length; i++) {
      subscribers[to][i].apply(this, callArguments);
    }
  };

  sn.listen = function(subscribe, cb) {
    subscribers[subscribe] = subscribers[subscribe] || [];
    subscribers[subscribe].push(cb);
  };

})(sn);

//DeepFreez / DeepSeal
(function (sn) {

  /**********************************************
  * Apply Object.freez on object and each children object as deep as it goes.
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  ************************************************/
  sn.deepFreez = function deepFreez(obj) {
    return deepSealOrFreez(obj, Object.freez);
  };

  /**********************************************
  * Apply Object.seal on object and each children object as deep as it goes.
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
  ************************************************/
  sn.deepSeal = function deepSeal(obj) {
    return deepSealOrFreez(obj, Object.seal);
  };

  function deepSealOrFreez(obj, action) {
    action(obj);

    Object.getOwnPropertyNames(obj).forEach(function (key) {
      if (obj.hasOwnProperty(key)
        && obj[key] !== null
        && (typeof obj[key] === 'object' || typeof obj[key] === 'function')
        && !Object.isSealed(obj[key]))
      {
        deepSealOrFreez(obj[key]);
      }
    });

    return obj;
  }

})(sn);



/**********************************************
* Extend object with the properties from other provided objects.
* In case of same propertie names value from first object will be overriden with the value from second object
************************************************/
sn.extend = function() {
  for(var i=1; i < arguments.length; i++) {
    Object.getOwnPropertyNames(arguments[i]).forEach(function (key) {
      if(arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key]
      }
    });
  }
  return arguments[0];
};

sn.replaceAll = function (whatToReplace) {
  return {
    with: function (replaceWith) {
      return typeof __EC__ === 'string'
        ? __EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
        : __EC__;
    }
  };
};

sn.capitalize = function (str) {
  return typeof str === 'string' ? str[(0)].toUpperCase() + str.slice(1) : str;
};

/***********************************************
 * Below methods has been taken from
 * https://github.com/epeli/underscore.string
************************************************/

/*
 * test if string contains substring
 * @ignore case - case is ignored on comparation
 * @example capitalize('foo Bar', 'oo'); => 'Foo Bar'; capitalize('FOO Bar', true); => 'Foo bar'
 * https://github.com/epeli/underscore.string
*/
sn.contains = function (str1, str2, ignoreCase) {
  if (ignoreCase === true) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
  }
  return str1.indexOf(str2) !== -1;
};

/*
 * Break string in array of substring
 * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
*/
sn.chop = function (str, step) {
  if (!str) { return []; }
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

/*
* Trim and replace multiple spaces with a single space.
* @example clean(' foo    bar   '); => 'foo bar'
*/
sn.clean = function (str) {
  return str.trim().replace(/\s\s+/g, ' ');
};


/**
* Truncate string if it exceed max number of characters,
* apply provided truncate string at the end of truncated string (default: '...')
*/
sn.truncate = function (str, length, truncateStr) {
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

/**********************************************
* Get the substring of the string between 2 substrings,
TODO: not documented or tested
***************************************************/
sn.between = function (startStr, endStr) {
  var startIndex = __EC__.indexOf(startStr);
  var endIndex = __EC__.indexOf(endStr);

  if (startIndex === -1 || startIndex === -1) {
    return undefined;
  }

  startIndex += startStr.length;
  return __EC__.substr(startIndex, endIndex - startIndex);
};

  return sn;
})));

//# sourceMappingURL=sn.js.map
