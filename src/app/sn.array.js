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
  * @return {Array} new array without the removed values
* @example sn.remove( ['a', 'b', 'c', 'd', 'c'], 'c' );
***********************************************/
sn.remove = function(arr, elToRemove, max) {
  var pos;
  if (max && (typeof max !== 'number' || max % 1 !== 0)) {
    throw new Error('Invalid argument exception');
  }

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
* @param arr {Array} input array that we want to shuffle
* @return {Array} shuffled array
* @example sn.shuffle(['a', 'b', 'c', 'd', 'c']);
********************************************************/
sn.shuffle = function(arr) {
  for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
  return arr;
};

/*********************************************
* Get the new array filled with default values
* @param val {....} default value that will fill the array
* @return len {Integer} size of the new array
* @example sn.getFilledArray(0, 5);
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
* if element is not found undefined is returned
**********************************************/
sn.first = function(arr, condition) {
  if(arr && arr.length) {
    if (condition) {
      for (var i = 0; i < arr.length; i++) {
        if (condition(arr[i])) {
          return arr[i];
        }
      }
    } else {
      return arr[0]
    }
  }

  return undefined;

};

/**********************************************************
* Returns last element of array if no condition is passed,
* else if there is condition returns last element of array that meets condition
* if element is not found undefined is returned
***********************************************************/
sn.last = function(arr, condition) {
  if(arr && arr.length) {
    if (condition) {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
          return arr[i];
        }
      }
    } else {
      return arr[arr.length - 1]
    }
  }

  return undefined;

};

/*********************************************
 * Stack implementation LIFO last in first out
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
    }
  })();
};

/*********************************************
* Queue implementation FIFI: first in first out
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
      get array()  {
        return _queue;
      },
      get length() {
        return _queue.length;
      }
    }
  })();
};
