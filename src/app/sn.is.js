(function (sn) {

  function isString() {
    return typeof sn.__EC__ === 'string';
  }

  function isNumber() {
    //NaN will produce false because NaN !== NaN
    return typeof sn.__EC__ === 'number' && sn.__EC__ === sn.__EC__;
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
  sn.is.empty = function () {
    if (sn.__EC__ == null
      || (typeof sn.__EC__ === 'string' && (/^\s*$/).test())) {
      return true;
    }

    if (typeof sn.__EC__ === 'object') {
      for (var key in sn.__EC__) {
        if (Object.prototype.hasOwnProperty.call(sn.__EC__, key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  sn.is.defined = function () {
    return sn.__EC__ == null;
  };

  /**
   * VAR type check
   */
  sn.is.string = isString;

  sn.is.number = isNumber;

  sn.is.boolean = function () {
    return typeof sn.__EC__ === 'boolean';
  };

  sn.is.null = function () {
    return sn.__EC__ === null;
  };

  sn.is.undefined = function () {
    typeof sn.__EC__ === 'undefined';
  };

  sn.is.object = function () {
    return typeof sn.__EC__ === 'object' && sn.__EC__ !== null && !Array.isArray();
  };

  sn.is.function = function () {
    return typeof sn.__EC__ === 'function';
  };

  sn.is.array = function () {
    return typeof sn.__EC__ === 'object' && Array.isArray();
  };

  sn.is.date = function () {
    return Object.prototype.toString.call(sn.__EC__) === '[object Date]';
  };


  /****
  * RegExp tests
  ****/
  sn.is.alphabetic = function (str) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(str);
  };

  sn.is.alphanumeric = function (str) {
    var re = /^[a-zA-Z0-9 ]*$/;
    return re.test(str);
  };

  sn.is.numeric = function (str) {
    var re = /^[0-9 ]*$/;
    return re.test(str);
  };

  sn.is.lowercase = function (str) {
    var re = /^[a-z ]*$/;
    return re.test(str);
  };

  sn.is.uppercase = function (str) {
    var re = /^[A-Z ]*$/;
    return re.test(str);
  };

  sn.is.email = function (str) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  };

  sn.is.strongPassword = function (str) {
    var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
    return re.test(str);
  };

  sn.is.ip = function (str) {
    var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return re.test(str);
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



  /***
 * ASSERT
 */
  sn.assert = { is: {} };

  for (var prop in sn.is) {
    if (sn.is.hasOwnProperty(prop)) {
      (function (prop) {
        sn.assert.is[prop] = function () {
          if (sn.is[prop]()) {
            return true;
          }

          throw new TypeError('Provided value is not ' + prop);
        };
      })(prop);
    }
  }

})(sn);
