describe('sn.chaining', function () {

    describe('chaining', function () {
        it('chaining with string should work correctly', function () {

            var str = sn('  this is old value in old string  ')
                ._.clean()
                ._.replaceAll('old', 'new')
                .capitalize();

            expect(str).toEqual('This is new value in new string');


            var str2 = sn('lets start and immediately stop this')
                ._.between('start', 'stop')
                ._.clean()
                .truncate(10);

            expect(str2).toEqual('and immedi...');


            var combination = sn('foo is better then bar')
                ._.chop(3)
                ._.first()
                .capitalize();

            expect(combination).toEqual('Foo');

        });
    });


});
