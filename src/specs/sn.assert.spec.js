describe('sn().assert', function () {

  var notDefined;
  var date;
  var obj;
  var obj1;
  var arr;
  var arr1;
  var num;
  var numObj;
  var emptyNumObj;
  var zero;
  var empty;
  var str;
  var strObj;
  var emptyStrObj;
  var emptyString;
  var spacesOnly;
  var bool;
  var falseBool;
  var func;

  beforeEach(function () {
    notDefined = undefined;
    obj = {};
    obj1 = { test: 'test' };
    strObj = String('test');
    emptyStrObj = String();
    numObj = Number(33);
    emptyNumObj = Number();
    arr = [];
    arr1 = ['1'];
    num = 3;
    zero = 0;
    empty = null;
    str = 'string';
    emptyString = '';
    spacesOnly = '    ';
    bool = true;
    falseBool = false;
    date = new Date();
    func = function() {};
  });


  describe('is', function () {

    it('should correctly handle is', function () {
      expect(sn(date).is(date)).toEqual(true);
      expect(sn(date.toString()).is(date)).toEqual(false);

      //HANDLE UH OH COERCION GOTCHAS
      expect(sn('0').is(false)).toEqual(false);
      expect(sn(false).is(0)).toEqual(false);
      expect(sn(false).is('')).toEqual(false);
      expect(sn(false).is([])).toEqual(false);
      expect(sn('').is(0)).toEqual(false);
      expect(sn('').is([])).toEqual(false);
      expect(sn(0).is([])).toEqual(false);

      //CASES THAT SHOULD BE LEGAL
      expect(sn('0').is(0)).toEqual(true);
      expect(sn('10').is(10)).toEqual(true);
      expect(sn('-10').is(-10)).toEqual(true);
      expect(sn(30).is(30)).toEqual(true);
      expect(sn(null).is(undefined)).toEqual(true);
      expect(sn(false).is(false)).toEqual(true);
      expect(sn(strObj).is(strObj)).toEqual(true);
      expect(sn(emptyStrObj).is(strObj)).toEqual(false);
      expect(sn(emptyStrObj).is(emptyStrObj)).toEqual(true);
      expect(sn(strObj).is(strObj)).toEqual(true);


      expect(sn({}).is({})).toEqual(false);

    });

    it('should correctly handle assert is', function () {
      expect(sn(date).assert.is(date)).toEqual(true);
      expect(sn('0').assert.is(0)).toEqual(true);
      expect(sn('10').assert.is(10)).toEqual(true);
      expect(sn('-10').assert.is(-10)).toEqual(true);
      expect(sn(30).assert.is(30)).toEqual(true);
      expect(sn(null).assert.is(undefined)).toEqual(true);
      expect(sn(false).assert.is(false)).toEqual(true);

      expect(function () {
        expect(sn(date.toString()).assert.is(date)).toEqual(false);
      }).toThrow(new TypeError('Values are not the same.'));
      expect(function () {
        expect(sn('0').assert.is(false)).toEqual(false);
      }).toThrow(new TypeError('Values are not the same.'));
      expect(function () {
        expect(sn(false).assert.is(0)).toEqual(false);
      }).toThrow(new TypeError('Values are not the same.'));
      expect(function () {
        expect(sn('').assert.is(0)).toEqual(false);
      }).toThrow(new TypeError('Values are not the same.'));

    });

  });

  describe('is.empty', function () {
    it('should correctly handle is.empty', function () {
      expect(sn(notDefined).is.empty()).toEqual(true);
      expect(sn(obj).is.empty()).toEqual(true);
      expect(sn(arr).is.empty()).toEqual(true);
      expect(sn(empty).is.empty()).toEqual(true);
      expect(sn(emptyString).is.empty()).toEqual(true);
      expect(sn(spacesOnly).is.empty()).toEqual(true);
      expect(sn('').is.empty()).toEqual(true);
      expect(sn('\n\t').is.empty()).toEqual(true);
      expect(sn('   ').is.empty()).toEqual(true);
      expect(sn(obj1).is.empty()).toEqual(false);
      expect(sn(arr1).is.empty()).toEqual(false);
      expect(sn(num).is.empty()).toEqual(false);
      expect(sn(zero).is.empty()).toEqual(false);
      expect(sn(str).is.empty()).toEqual(false);
      expect(sn(bool).is.empty()).toEqual(false);
      expect(sn(falseBool).is.empty()).toEqual(false);
      expect(sn('as').is.empty()).toEqual(false);

      expect(sn(emptyStrObj).is.empty()).toEqual(true);
      expect(sn(emptyNumObj).is.empty()).toEqual(false); // 0 is not considered empty
      expect(sn(strObj).is.empty()).toEqual(false);
      expect(sn(numObj).is.empty()).toEqual(false);
    });
  });

  describe('is.number', function () {
    it('should show correct values for is.number', function () {
      expect(sn(notDefined).is.number()).toEqual(false);
      expect(sn(obj).is.number()).toEqual(false);
      expect(sn(num).is.number()).toEqual(true);
      expect(sn(1.23).is.number()).toEqual(true);
      expect(sn(-1.23).is.number()).toEqual(true);
      expect(sn(empty).is.number()).toEqual(false);
      expect(sn(str).is.number()).toEqual(false);
      expect(sn(emptyString).is.number()).toEqual(false);
      expect(sn(bool).is.number()).toEqual(false);
    });
  });

  describe('is.string', function () {
    it('should show correct values for is.string', function () {
      expect(sn(notDefined).is.string()).toEqual(false);
      expect(sn(obj).is.string()).toEqual(false);
      expect(sn(num).is.string()).toEqual(false);
      expect(sn(empty).is.string()).toEqual(false);
      expect(sn(str).is.string()).toEqual(true);
      expect(sn(emptyString).is.string()).toEqual(true);
      expect(sn(bool).is.string()).toEqual(false);
    });
  });

  describe('is.boolean', function () {
    it('should show correct values for is.boolean', function () {
      expect(sn(notDefined).is.boolean()).toEqual(false);
      expect(sn(obj).is.boolean()).toEqual(false);
      expect(sn(num).is.boolean()).toEqual(false);
      expect(sn(empty).is.boolean()).toEqual(false);
      expect(sn(str).is.boolean()).toEqual(false);
      expect(sn(emptyString).is.boolean()).toEqual(false);
      expect(sn(bool).is.boolean()).toEqual(true);
    });
  });

  describe('is.object', function () {
    it('should show correct values for is.object', function () {
      expect(sn(notDefined).is.object()).toEqual(false);
      expect(sn(obj).is.object()).toEqual(true);
      expect(sn(num).is.object()).toEqual(false);
      expect(sn(empty).is.object()).toEqual(false);
      expect(sn(str).is.object()).toEqual(false);
      expect(sn(emptyString).is.object()).toEqual(false);
      expect(sn(bool).is.object()).toEqual(false);
      expect(sn(arr).is.object()).toEqual(false);
      // expect(sn(func).is.object()).toEqual(false);
    });
  });

  describe('is.function', function () {
    it('should show correct values for is.object', function () {
      expect(sn(func).is.function()).toEqual(true);
      expect(sn(notDefined).is.function()).toEqual(false);
      expect(sn(obj).is.function()).toEqual(false);
      expect(sn(num).is.function()).toEqual(false);
      expect(sn(empty).is.function()).toEqual(false);
      expect(sn(emptyString).is.function(str)).toEqual(false);
      expect(sn(bool).is.function()).toEqual(false);
      expect(sn().is.function()).toEqual(false);
      expect(sn(arr).is.function()).toEqual(false);
    });
  });

  describe('is.array', function () {
    it('should show correct values for is.array', function () {
      expect(sn(notDefined).is.array()).toEqual(false);
      expect(sn(obj).is.array()).toEqual(false);
      expect(sn(num).is.array()).toEqual(false);
      expect(sn(empty).is.array()).toEqual(false);
      expect(sn(str).is.array()).toEqual(false);
      expect(sn(emptyString).is.array()).toEqual(false);
      expect(sn(bool).is.array()).toEqual(false);
      expect(sn(arr).is.array()).toEqual(true);
      expect(sn(func).is.array()).toEqual(false);
    });
  });

  describe('is date', function () {

    it('should correctly handle is date', function () {
      expect(sn(date).is.date()).toEqual(true);
      expect(sn(date.toString()).is.date()).toEqual(false);
      expect(sn({}).is.date()).toEqual(false);
      expect(sn().is.date()).toEqual(false);

    });

    it('should correctly handle assert is date', function () {
      var date = new Date();

      expect(sn(date).assert.is.date()).toEqual(true);

      expect(function () {
        sn(date.toString()).assert.is.date();
      }).toThrow(new TypeError('Provided value is not date'));

      expect(function () {
        sn({}).assert.is.date();
      }).toThrow(new TypeError('Provided value is not date'));

      expect(function () {
        sn().assert.is.date();
      }).toThrow(new TypeError('Provided value is not date'));

    });

  });


});
