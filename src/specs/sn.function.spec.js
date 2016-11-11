describe('sn.function', function () {

    describe('once', function () {

        it('should call function only once', function () {
            var noCalls = 0;
            var init = sn.once(function () {
                noCalls++;
            });
            var f2 = sn.once(function () {
                noCalls++;
            });

            expect(noCalls).toEqual(0);
            init();
            init();
            init();
            f2();
            f2();
            expect(noCalls).toEqual(2);
        });

        it('should call function only once and pass correct arguments', function () {
            var noCalls = 0;
            var attr = '';

            var init = sn.once(function (name) {
                noCalls++;
                attr = name;
            });

            expect(noCalls).toEqual(0);
            init('first-call');
            init('second-call');
            init('last-call');

            expect(noCalls).toEqual(1);
            expect(attr).toEqual('first-call');
        });

    });

    describe('debounce', function () {

        it('should call function only twice', function (done) {
            var noCalls = 0;
            var debounceFunction = sn.debounce(function () {
                noCalls++;
            }, 1);

            expect(noCalls).toEqual(0);
            debounceFunction();
            debounceFunction();
            debounceFunction();

            setTimeout(function () {
                debounceFunction();
                debounceFunction();
                expect(noCalls).toEqual(2);
                done();
            }, 2);

        });

        it('should call function once', function () {
            var noCalls = 0;
            var debounceFunction = sn.debounce(function () {
                noCalls++;
            }, 1);

            expect(noCalls).toEqual(0);
            debounceFunction();
            debounceFunction();
            debounceFunction();
            debounceFunction();
            expect(noCalls).toEqual(1);

        });

    });

    describe('execute', function () {

        it('should execute on async condition change', function (done) {
            var executeCondition = false;
            setTimeout(function () {
                executeCondition = true;
            }, 1);

            sn.execute(function () {
                expect(executeCondition).toEqual(true);
                done();
            }).when(function () {
                return executeCondition;
            });

        });

        it('should exceed max tries count', function (done) {
            var executeCondition = false;
            var isExecuted = false;
            setTimeout(function () {
                executeCondition = true;
                setTimeout(function () {
                    expect(isExecuted).toEqual(false);
                    done();
                }, 1);
            }, 15);

            sn.execute(function () {
                isExecuted = true;
            }).when(function () {
                return executeCondition;
            }, 1, 1);  //timeout is 1ms with 2 tries == 2ms
        });

    });

    describe('sn.msg', function () {


        it('should receive messages without object', function () {
            var messageReceived = false;
            sn.listen('test-msg', function () {
                messageReceived = true;
            });
            sn.broadcast('test-msg');
            expect(messageReceived).toEqual(true);
        });

        it('should receive messages with object', function () {
            var testObj = { test: 'test' };
            var receivedObject = null;
            sn.listen('test-obj', function (val) {
                receivedObject = val;
            });
            sn.broadcast('test-obj', testObj);
            expect(receivedObject).toEqual(testObj);
        });

        it('should handle multiple listeners', function () {
            var noOfReceivedMessages = 0;
            sn.listen('test-multiple', function () {
                noOfReceivedMessages++;
            });
            sn.listen('test-multiple', function () {
                noOfReceivedMessages++;
            });
            sn.listen('test-multiple', function () {
                noOfReceivedMessages++;
            });

            sn.broadcast('test-multiple');
            expect(noOfReceivedMessages).toEqual(3);
        });

    });


});
