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
    var t1 = sn.__EC__;
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
    if (sn.__EC__ == null
      || (typeof sn.__EC__ === 'string' && (/^\s*$/).test(sn.__EC__))) {
      return true;
    }

    if (typeof sn.__EC__ === 'object') {
      for (var key in sn.__EC__) {
        if (sn.__EC__.hasOwnProperty(key)) {
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
    return internals.isString(sn.__EC__);
  };

  sn.is.number = function () {
    return internals.isNumber(sn.__EC__);
  };

  sn.is.boolean = function () {
    return typeof sn.__EC__ === 'boolean';
  };

  sn.is.null = function () {
    return sn.__EC__ === null;
  };

  sn.is.undefined = function () {
    typeof sn.__EC__ === 'undefined';
  };

  //not null and undefined
  sn.is.defined = function () {
    return sn.__EC__ != null;
  };

  sn.is.object = function () {
    return typeof sn.__EC__ === 'object'
      && sn.__EC__ !== null
      && !Array.isArray(sn.__EC__);
  };

  sn.is.function = function () {
    return typeof sn.__EC__ === 'function';
  };

  sn.is.array = function () {
    return typeof sn.__EC__ === 'object' && Array.isArray(sn.__EC__);
  };

  sn.is.date = function () {
    return internals.isDate(sn.__EC__);
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
