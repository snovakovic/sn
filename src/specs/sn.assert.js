describe('sn.assert', function () {


  describe('is date', function () {

    it('should correctly handle assert is date', function () {
      var date = new Date();

      expect(sn(date).assert.is.date()).toEqual(true);

      expect(function () {
        sn('strDate').assert.is.date();
      }).toThrow(new TypeError('Provided value is not date'));

      expect(function () {
        sn('').assert.is.date();
      }).toThrow(new TypeError('Provided value is not date'));

    });

  });


});
