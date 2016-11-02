/*****************************************************
	  s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 0.0.1
 ***************************************************/
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.sn = factory());
} (this, (function() {

  'use strict';

  function sn(executionContext) {
    sn.__EC__ = executionContext;
    return sn;
  }

  //app files will be concatinated here and then this will be closed with sn.end.js


/**********************************************
* Loop throught array. this in callback function will ber set to array.
* @param arr {Array} array we want to iterate
* @param callback {Function} callback function that will be called on each iteration
************************************************/
sn.each = function(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback.call(arr, arr[i], i) === false) {
      break;
    }
  }
};

/**********************************************
* Iterate specific number of times.
* @param l {Number} number of times we want to iterate
* @param callback {Function} callback function that will be called on each iteration
************************************************/
sn.iterate = function(l, callback) {
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
sn.remove = function(arr, elToRemove, max) {
  var pos;

  while (pos !== -1 && max !== 0) {
    if (max) {
      if (max >= 1) {
        pos = arr.indexOf(elToRemove);
        max--;
      } else {
        pos = arr.lastIndexOf(elToRemove);
        max++;
      }

    } else {
      pos = arr.indexOf(elToRemove);
    }

    pos > -1 && arr.splice(pos, 1);
  }

  return arr;
};

/*******************************************************
* Shuffle values in the array
* https://github.com/Daplie/knuth-shuffle
* @param arr {Array} input array that we want to shuffle
* @return {Array} shuffled array
********************************************************/
sn.shuffle = function(arr) {
  var currentIndex = arr.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

/*********************************************
* Get the new array filled with default values
* @param val {Any} default array value
* @return len {Integer} size of the new array
**********************************************/
sn.getFilledArray = function(val, len) {
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
sn.unique = function(originalArr) {
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
sn.first = function(arr, condition) {
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
sn.last = function(arr, condition) {
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
sn.stack = function(defaultArray) {
  return (function() {
    var _stack = defaultArray || [];
    return {
      add: function(val) {
        Array.isArray(val) ? Array.prototype.push.apply(_stack, val) : _stack.push(val);
      },
      remove: function() {
        return _stack.length ? _stack.pop() : null;
      },
      peek: function() {
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
sn.queue = function(defaultArray) {
  return (function() {
    var _queue = defaultArray || [];
    return {
      add: function(val) {
        Array.isArray(val) ? Array.prototype.push.apply(_queue, val) : _queue.push(val);
      },
      addRange: function(range) {
        Array.prototype.push.apply(_queue, range);
      },
      remove: function() {
        return _queue.length ? _queue.shift() : null;
      },
      peek: function() {
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

/*****************************************************
	  Test Module part
 ***************************************************/
(function(sn) {

  function isString(testVar) {
    return typeof testVar === 'string';
  }

  function isNumber(testVar) {
    //NaN will produce false because NaN !== NaN
    return typeof testVar === 'number' && testVar === testVar;
  }

  sn.is = function(t2) {
    var t1 = sn._EC_;
    if ((isString(t1) || isNumber(t1)) && (isString(t2) || isNumber(t2))) {
      //this covers coercion between string and number without any gotchas
      return (typeof t1 === typeof t2)
        ? t1 === t2
        : t1 == t2 && t1 !== '' && t2 !== '';

    } else if (t1 == null && t2 == null) {
      //This covers when vars are eather null or undefined without any gotchas
      return true;
    }

    return t1 === t2;

  };


  /**
   * Test if variable has been defined and is not empty,
   * Following will be treated as false
   * sn.is.empty(null); => true
   * sn.is.empty(undefined); => true
   * sn.is.empty({}); => true
   * sn.is.empty([]); => true
   * sn.is.empty(' '); => true
   * sn.is.empty('\n\t'); => true
   * sn.is.empty(null); => true
  */
  sn.is.empty = function(testVar) {
    if (testVar == null
      || (typeof testVar === 'string' && (/^\s*$/).test(testVar))) {
      return true;
    }

    if (typeof testVar === 'object') {
      for (var key in testVar) {
        if (Object.prototype.hasOwnProperty.call(testVar, key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  sn.is.defined = function(testVar) {
    return testVar == null;
  };

  /**
   * VAR type check
   */
  sn.is.string = isString;

  sn.is.number = isNumber;

  sn.is.boolean = function(testVar) {
    return typeof testVar === 'boolean';
  };

  sn.is.null = function(testVar) {
    return testVar === null;
  };

  sn.is.undefined = function(testVar) {
    typeof testVar === 'undefined';
  };

  sn.is.object = function(testVar) {
    return typeof testVar === 'object' && testVar !== null && !Array.isArray(testVar);
  };

  sn.is.function = function(testVar) {
    return typeof testVar === 'function';
  };

  sn.is.array = function(testVar) {
    return typeof testVar === 'object' && Array.isArray(testVar);
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
}

sn.replaceAll = function(whatToReplace) {
  return {
    with: function(replaceWith) {
      return typeof sn.__EC__ === 'string'
        ? sn.__EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
        : sn.__EC__;
    }
  }
};

sn.capitalize = function(str) {
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
sn.contains = function(str1, str2, ignoreCase) {
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
sn.chop = function(str, step) {
  if (!str) { return []; }
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

/*
* Trim and replace multiple spaces with a single space.
* @example clean(' foo    bar   '); => 'foo bar'
*/
sn.clean = function(str) {
  return str.trim().replace(/\s\s+/g, ' ');
};


/**
* Truncate string if it exceed max number of characters,
* apply provided truncate string at the end of truncated string (default: '...')
*/
sn.truncate = function(str, length, truncateStr) {
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

/****
* RegExp tests
****/
sn.is.alphabetic = function(str) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(str);
};

sn.is.alphanumeric = function(str) {
  var re = /^[a-zA-Z0-9 ]*$/;
  return re.test(str);
};

sn.is.numeric = function(str) {
  var re = /^[0-9 ]*$/;
  return re.test(str);
};

sn.is.lowercase = function(str) {
  var re = /^[a-z ]*$/;
  return re.test(str);
};

sn.is.uppercase = function(str) {
  var re = /^[A-Z ]*$/;
  return re.test(str);
};

sn.is.email = function(str) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(str);
};

sn.is.strongpassword = function(str) {
  var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
  return re.test(str);
};

sn.is.ip = function(str) {
  var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return re.test(str);
};


  return sn;
})));

//# sourceMappingURL=sn.js.map
