(function (sn) {

  //PRIVATE

  //PUBLIC

  /**********************************************
  * Loop over array. this in callback function will ber set to array.
  * @param arr {Array} array we want to iterate
  * @param callback {Function} callback function that will be called on each iteration
  ************************************************/
  sn.each = function (callback) {
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

    var stackQueueBase = {
      init: function (baseArray) {
        this.__array__ = baseArray || [];
      },
      add: function (val) {
        Array.isArray(val)
          ? Array.prototype.push.apply(this.__array__, val)
          : this.__array__.push(val);
      },
      get array() {
        return this.__array__;
      },
      get length() {
        return this.__array__.length;
      }
    };

    var Stack = Object.create(stackQueueBase);
    Stack.remove = function () {
      return this.__array__.length ? this.__array__.pop() : null;
    };
    Stack.peek = function () {
      return this.__array__.length ? this.__array__[this.__array__.length - 1] : null;
    };

    var Queue = Object.create(stackQueueBase);
    Queue.remove = function () {
      return this.__array__.length ? this.__array__.shift() : null;
    };
    Queue.peek = function () {
      return this.__array__.length ? this.__array__[0] : null;
    };


    /*********************************************
     * Stack implementation LIFO last in first out
     * @param defaultArray [optional] {Array} default array that will be used as a stack base
    *********************************************/
    sn.stack = function (defaultArray) {
      var stack = Object.create(Stack);
      stack.init(defaultArray);
      return stack;
    };


    /*********************************************
    * Queue implementation FIFO: first in first out
    * @param defaultArray [optional] {Array} default array that will be used as a queue base
    *********************************************/
    sn.queue = function (defaultArray) {
      var queue = Object.create(Queue);
      queue.init(defaultArray);
      return queue;
    };

  })(sn);


})(sn);
