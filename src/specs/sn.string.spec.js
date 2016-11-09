describe('sn.string', function() {

    describe('replaceAll', function() {
        it('should replace all ocurance of string', function() {
            var replacedString = sn('this is old value in old string old old').replaceAll('old', 'new');
            expect(replacedString).toEqual('this is new value in new string new new');

            expect(sn(null).replaceAll('ala', 'la')).toEqual(null);
            expect(sn(33).replaceAll('ala', 'la')).toEqual(33);
            expect(sn(['ala']).replaceAll('ala', 'la')).toEqual(['ala']);

        });
    });

    describe('between', function() {
        it('return correct substring', function() {
            expect(sn('this is start of the string before end of same').between('start', 'end')).toEqual(' of the string before ');
            expect(sn('this is start of the string before end of same').between('end', 'start')).toEqual(' of the string before ');

            expect(sn('this is start of the string before end of same').between('nonExistant', 'end')).toEqual(undefined);
            expect(sn('this is start of the string before end of same').between('start')).toEqual(undefined);
            expect(sn(undefined).between()).toEqual(undefined);
            expect(sn(undefined).between()).toEqual(undefined);
        });
    });

    describe('capitalize', function() {
        it('should capitalize string', function() {
            expect(sn('abc Da').capitalize()).toEqual('Abc Da');
            expect(sn('Abc Da').capitalize()).toEqual('Abc Da');

            expect(sn(null).capitalize()).toEqual(null);
            expect(sn(33).capitalize()).toEqual(33);
        });
    });

    describe('contains', function() {
        it('should contain string', function() {
            expect(sn('abc Da').contains('da')).toEqual(false);
            expect(sn('abc Da').contains('da', true)).toEqual(true);
            expect(sn('abc Da').contains('Da')).toEqual(true);
            expect(sn('abc Da').contains('bc')).toEqual(true);

            describe('truncate', function() {
                it('should truncate string correctly', function() {
                    expect(sn('stefan.novakovich@gmail.com').truncate(100)).toEqual('stefan.novakovich@gmail.com');
                    expect(sn('stefan.novakovich@gmail.com').truncate(10)).toEqual('stefan.nov...');
                    expect(sn('stefan.novakovich@gmail.com').truncate(10, ' ...more')).toEqual('stefan.nov ...more');
                });
            });
            expect(sn('abc Da').contains(undefined)).toEqual(false);
            expect(sn(null).contains('ala')).toEqual(false);
        });
    });

    describe('chop', function() {
        it('should chop string', function() {
            expect(sn('abc Da').chop(2)).toEqual(['ab', 'c ', 'Da']);
            expect(sn('whitespace').chop(3)).toEqual(['whi', 'tes', 'pac', 'e']);
            expect(sn(null).chop(3)).toEqual([]);
        });
    });

    describe('clean', function() {
        it('should clean string', function() {
            expect(sn('abc').clean()).toEqual('abc');
            expect(sn('abc ').clean()).toEqual('abc');
            expect(sn('  ab   c  ').clean()).toEqual('ab c');
        });
    });

    describe('truncate', function() {
        it('should truncate string correctly', function() {
            expect(sn('stefan.novakovich@gmail.com').truncate(100)).toEqual('stefan.novakovich@gmail.com');
            expect(sn('stefan.novakovich@gmail.com').truncate(10)).toEqual('stefan.nov...');
            expect(sn('stefan.novakovich@gmail.com').truncate(10, ' ...more')).toEqual('stefan.nov ...more');
        });
    });

});
