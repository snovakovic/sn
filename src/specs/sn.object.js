describe('sn.object', function () {

    var object;

    beforeEach(function () {
        object = {
            prop1: 1,
            ob2: {
                prop2: 2,
                ob3: {
                    prop3: 3,
                    ob4: {
                        prop4: 4
                    }
                }
            }
        };

    });

    describe('deepFreez', function () {
        it('should freez object', function () {
            var frozen = sn(object).deepFreeze();

            frozen.ob2.ob3.ob4.prop4 = 10;
            expect(frozen.ob2.ob3.ob4.prop4).toEqual(4);
            expect(Object.isFrozen(frozen)).toEqual(true);
            expect(Object.isFrozen(frozen.ob2)).toEqual(true);
            expect(Object.isFrozen(frozen.ob2.ob3)).toEqual(true);
            expect(Object.isFrozen(frozen.ob2.ob3.ob4)).toEqual(true);
        });

        it('should be sealed freez object', function () {
            var sealed = sn(object).deepSeal();

            sealed.ob2.ob3.ob4.prop4 = 10;
            sealed.ob2.ob3.ob4.prop5 = 4;
            expect(sealed.ob2.ob3.ob4.prop4).toEqual(10);
            expect(sealed.ob2.ob3.ob4.prop5).toEqual(undefined);
            expect(Object.isSealed(sealed)).toEqual(true);
            expect(Object.isSealed(sealed.ob2)).toEqual(true);
            expect(Object.isSealed(sealed.ob2.ob3)).toEqual(true);
            expect(Object.isSealed(sealed.ob2.ob3.ob4)).toEqual(true);
        });
    });


    // describe('extend', function () {
    //     it('should extend object', function () {
    //         var ob1 = {
    //             a: 1,
    //             b: 2
    //         };

    //         var ob2 = sn({}).extend(ob2);

    //     });
    // });


});
