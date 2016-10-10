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
  if (!str) {
    return [];
  }
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


  return sn;
})));

//# sourceMappingURL=sn.js.map
