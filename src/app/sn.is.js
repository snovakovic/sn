(function (sn) {

  function isString(testVar) {
    return typeof testVar === 'string';
  }

  function isNumber(testVar) {
    //NaN will produce false because NaN !== NaN
    return typeof testVar === 'number' && testVar === testVar;
  }

  sn.is = function (t2) {
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
  sn.is.empty = function (testVar) {
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

  sn.is.defined = function (testVar) {
    return testVar == null;
  };

  /**
   * VAR type check
   */
  sn.is.string = isString;

  sn.is.number = isNumber;

  sn.is.boolean = function (testVar) {
    return typeof testVar === 'boolean';
  };

  sn.is.null = function (testVar) {
    return testVar === null;
  };

  sn.is.undefined = function (testVar) {
    typeof testVar === 'undefined';
  };

  sn.is.object = function (testVar) {
    return typeof testVar === 'object' && testVar !== null && !Array.isArray(testVar);
  };

  sn.is.function = function (testVar) {
    return typeof testVar === 'function';
  };

  sn.is.array = function (testVar) {
    return typeof testVar === 'object' && Array.isArray(testVar);
  };

  /**********************************************
  * Check if day in date is last day of month
  * @return true -> day is last day of month; false - day is not last day of month
  ************************************************/
  sn.is.lastDayOfMonth = function () {
    var test = new Date(sn.__EC__.getTime());
    test.setDate(test.getDate() + 1);
    return test.getDate() === 1;
  };


})(sn);
