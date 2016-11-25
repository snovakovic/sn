describe('sn.array', function () {
    var testArray;
    var testObjArray;
    var a;
    var b;
    var c;
    var lastIndex;
    var lastValue;
    var counter;
    var tmp;
    var bigArray;
    var testString;

    beforeEach(function () {
        testArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        testObjArray = [
            {
                id: 1,
                name: 'first'
            }, {
                id: 2,
                name: 'second'
            }, {
                id: 3,
                name: 'third'
            }
        ];

        counter = 0;
        testString = 'test string';
        a = b = c = lastIndex = lastValue = null;
        bigArray = [];
        for (var i = 0; i <= 1000000; i++) {
            bigArray.push(i);
        }
    });

    describe('each', function () {

        it('should loop correctly', function () {
            sn(testArray).each(function (val, i) {
                if (val === 'a') {
                    a = testArray[i];
                } else if (val === 'b') {
                    b = testArray[i];
                } else if (val === 'c') {
                    c = testArray[i];
                }

            });

            sn(bigArray).each(function (val, i) {
                lastIndex = i;
            });

            sn(testArray).each(function (val) {
                lastValue = val;
                return false;
            });

            var test = '';
            sn(testString).each(function (char) {
                test += char;
                if (test === 'test') {
                    return false;
                }
            });
            expect(test).toEqual('test');

            //Bad values should not break execution
            sn({ ala: test }).each(function () {
                throw Error('This should not be called');
            });

            sn(null).each(function () {
                throw Error('This should not be called');
            });

            expect(a).toEqual(testArray[0]);
            expect(b).toEqual(b, testArray[1]);
            expect(c).toEqual(c, testArray[2]);
            expect(lastValue).toEqual('a');
            expect(lastIndex).toEqual(bigArray.length - 1);
        });

    });

    describe('iterate', function () {

        it('should iterate correctly', function () {
            sn(1000000).iterate(function () {
                counter++;
            });
            expect(counter).toEqual(1000000);

            sn(1000000).iterate(function (i) {
                tmp = i;
                if (i === 3) {
                    return false;
                }
            });
            expect(tmp).toEqual(3);

            sn(0).iterate(function () {
                throw Error('This should not be called');
            });

            sn(null).iterate(function () {
                throw Error('This should not be called');
            });

            var stringIteration = 0;
            sn('3').iterate(function () {
                stringIteration++;
            });

            expect(stringIteration).toEqual(3);

        });

    });

    describe('shuffle', function () {
        it('should shuffle array', function () {
            var beforeShuffle = testArray.join();
            sn(testArray).shuffle();
            var afterShuffle = testArray.join();

            expect(beforeShuffle.length).toEqual(afterShuffle.length);
            //in reare cases this could fail
            expect(beforeShuffle).not.toEqual(afterShuffle);
            expect(testArray.indexOf('a')).not.toEqual(-1);
            expect(testArray.indexOf('b')).not.toEqual(-1);
            expect(testArray.indexOf('c')).not.toEqual(-1);

            expect(sn({}).shuffle()).toEqual({});
        });
    });

    describe('fillArray', function () {
        it('should returned filled array', function () {
            expect(sn(0).fillArray(3)).toEqual([0, 0, 0]);
            expect(sn('b').fillArray(4)).toEqual(['b', 'b', 'b', 'b']);
            expect(sn({ a: 'b' }).fillArray(2)).toEqual([{ a: 'b' }, { a: 'b' }]);
            expect(sn(null).fillArray(2)).toEqual([null, null]);
        });
    });

    describe('toArray', function () {
        it('readme examples should be correct', function () {
            expect(sn([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
            expect(sn('test').toArray()).toEqual(['test']);
            expect(sn(0).toArray()).toEqual([0]);
            expect(sn({ test: 'a' }).toArray()).toEqual([{ test: 'a' }]);
            expect(sn(undefined).toArray()).toEqual([]);
            expect(sn(null).toArray()).toEqual([]);

            function arg() {
                var toList = sn(arguments).toArray();

                expect(toList).toEqual([1, 2, 3]);
            }

            arg(1, 2, 3);
        });
    });

    describe('unique', function () {
        it('should return unique values', function () {
            expect(sn([1, 1, 2, 3, 2, 1, 3]).unique()).toEqual([1, 2, 3]);
            expect(sn(['a', 'b', 'a']).unique()).toEqual(['a', 'b']);

            var testObjArrayWithDuplicates = testObjArray.concat([testObjArray[1]]);
            testObjArrayWithDuplicates = testObjArrayWithDuplicates.concat(testObjArray);
            expect(sn(testObjArrayWithDuplicates).unique('id')).toEqual(testObjArray);

            var deepDuplicatesPath = [{ identity: { id: 1 }, name: 'first' }, { identity: { id: 2 }, name: 'second' }, { identity: { id: 1 }, name: 'first' }];
            expect(sn(deepDuplicatesPath).unique('identity.id')).toEqual([{ identity: { id: 1 }, name: 'first' }, { identity: { id: 2 }, name: 'second' }]);
        });

        it('invalid values should not throw exception', function () {
            expect(sn(null).unique()).toEqual(null);
            expect(sn(undefined).unique()).toEqual(undefined);
            expect(sn('test').unique()).toEqual('test');

            expect(function () {
                expect(sn(testObjArray).unique('id.dont.exist')).toEqual(testObjArray);
            }).toThrow(new TypeError('Invalid path. Object property does not exist'));

        });

        it('readme example should be correct', function () {
            var objects = [
                {
                    id: 1,
                    deepProperty: { name: 'first' }
                }, {
                    id: 2,
                    deepProperty: { name: 'first' }
                }, {
                    id: 2,
                    deepProperty: { name: 'third' }
                }];

            expect(sn(objects).unique('id')).toEqual([{ id: 1, deepProperty: { name: 'first' } }, { id: 2, deepProperty: { name: 'first' } }]);
            expect(sn(objects).unique('deepProperty.name')).toEqual([{ id: 1, deepProperty: { name: 'first' } }, { id: 2, deepProperty: { name: 'third' } }]);

        });
    });

    describe('first', function () {
        it('should return first array value', function () {
            expect(sn(testArray).first()).toEqual('a');
            expect(sn(testObjArray).first()).toEqual(testObjArray[0]);
            expect(sn(undefined).first()).toEqual(undefined);

            expect(sn(testArray).first(function (letter) {
                return letter === 'c';
            })).toEqual('c');

            expect(sn(testObjArray).first(function (obj) {
                return obj.id === 2;
            })).toEqual(testObjArray[1]);

            expect(sn(null).first()).toEqual(undefined);
        });
    });

    describe('last', function () {
        it('should return last array value', function () {
            expect(sn(testArray).last()).toEqual('h');
            expect(sn(testObjArray).last()).toEqual(testObjArray[testObjArray.length - 1]);
            expect(sn(null).last()).toEqual(undefined);

            expect(sn(testArray).last(function (letter) {
                return letter === 'c';
            })).toEqual('c');

            expect(sn(testObjArray).last(function (obj) {
                return obj.id === 3;
            })).toEqual(testObjArray[2]);

            expect(sn(null).last()).toEqual(undefined);

        });
    });


    describe('stack', function () {
        it('should operate with stack correctly', function () {
            var stack = sn.stack();
            stack.add(2);         // stack is now [2]
            stack.add(5);         // stack is now [2, 5]
            expect(stack.__array__).toEqual([2, 5]);
            var i = stack.remove(); // stack is now [2]
            expect(i).toEqual(5);
            expect(stack.__array__).toEqual([2]);
            i = stack.remove();
            expect(i).toEqual(2);
            expect(stack.__array__).toEqual([]);
            i = stack.remove();
            expect(i).toEqual(null);
            i = stack.remove();
            expect(i).toEqual(null);
            expect(stack.__array__).toEqual([]);
        });

        it('should operate with default stack correctly', function () {
            var stack = sn.stack([1, 2, 3]);
            stack.add(2);
            expect(stack.__array__).toEqual([1, 2, 3, 2]);
            expect(stack.length()).toEqual(4);
            expect(stack.peek()).toEqual(2);
            expect(stack.length()).toEqual(4);
            expect(stack.remove()).toEqual(2);
            expect(stack.length()).toEqual(3);
            expect(stack.remove()).toEqual(3);
        });

        it('stack arrays should operate independently', function () {
            var stack1 = sn.stack([1]);
            var stack2 = sn.stack();
            var stack3 = sn.stack();

            stack1.add(5);
            stack2.add(6);
            stack3.add(7);
            stack3.add(8);

            expect(stack1.__array__).toEqual([1, 5]);
            expect(stack2.__array__).toEqual([6]);
            expect(stack3.__array__).toEqual([7, 8]);
        });

        it('add multiple values should work as expected', function () {
            var stack = sn.stack([1]);
            stack.add(2);
            stack.add([3, 4]);
            expect(stack.__array__).toEqual([1, 2, 3, 4]);
            expect(stack.peek()).toEqual(4);
        });

        it('readme example should be correct', function () {
            var stack = sn.stack();
            stack.add(2);
            stack.add(3);
            expect(stack.length()).toEqual(2);
            expect(stack.__array__).toEqual([2, 3]);
            expect(stack.peek()).toEqual(3);
            var val = stack.remove();
            expect(val).toEqual(3);
            expect(stack.length()).toEqual(1);
            expect(stack.__array__).toEqual([2]);

            var stack2 = sn.stack();
            expect(stack2.remove()).toEqual(null);
            expect(stack2.__array__).toEqual([]);

            var stack3 = sn.stack([1, 2]);
            stack3.add([3, 4]);
            expect(stack3.__array__).toEqual([1, 2, 3, 4]);
            expect(stack3.remove()).toEqual(4);
            expect(stack3.remove()).toEqual(3);
            expect(stack3.__array__).toEqual([1, 2]);
        });
    });


    describe('queue', function () {
        it('should operate with queue correctly', function () {
            var queue = sn.queue();
            queue.add(2);         // queue is now [2]
            queue.add(5);         // queue is now [2, 5]
            expect(queue.__array__).toEqual([2, 5]);
            var i = queue.remove(); // queue is now [5]
            expect(i).toEqual(2);
            expect(queue.__array__).toEqual([5]);
            i = queue.remove();
            expect(i).toEqual(5);
            expect(queue.__array__).toEqual([]);
            i = queue.remove();
            expect(i).toEqual(null);
            i = queue.remove();
            expect(i).toEqual(null);
            expect(queue.__array__).toEqual([]);
        });

        it('should operate with default queue correctly', function () {
            var queue = sn.queue([1, 2, 3]);
            queue.add(2);
            expect(queue.__array__).toEqual([1, 2, 3, 2]);
            expect(queue.length()).toEqual(4);
            expect(queue.peek()).toEqual(1);
            expect(queue.length()).toEqual(4);
            expect(queue.remove()).toEqual(1);
            expect(queue.length()).toEqual(3);
            expect(queue.peek()).toEqual(2);
            expect(queue.remove()).toEqual(2);
        });

        it('queue arrays should operate independently', function () {
            var queue1 = sn.queue([1]);
            var queue2 = sn.queue();
            var queue3 = sn.queue();

            queue1.add(5);
            queue2.add(6);
            queue3.add(7);
            queue3.add(8);

            expect(queue1.__array__).toEqual([1, 5]);
            expect(queue2.__array__).toEqual([6]);
            expect(queue3.__array__).toEqual([7, 8]);
        });

        it('add multiple values should work as expected', function () {
            var queue = sn.queue([1]);
            queue.add(2);
            queue.add([3, 4]);
            expect(queue.__array__).toEqual([1, 2, 3, 4]);
            expect(queue.peek()).toEqual(1);
        });

        it('readme example should be correct', function () {
            var queue = sn.queue();
            queue.add(2);
            queue.add(3);
            expect(queue.length()).toEqual(2);
            expect(queue.__array__).toEqual([2, 3]);
            expect(queue.peek()).toEqual(2);
            var val = queue.remove();
            expect(val).toEqual(2);
            expect(queue.length()).toEqual(1);
            expect(queue.__array__).toEqual([3]);

            var queue2 = sn.queue();
            expect(queue2.remove()).toEqual(null);
            expect(queue2.__array__).toEqual([]);

            var queue3 = sn.queue([1, 2]);
            queue3.add([3, 4]);
            expect(queue3.__array__).toEqual([1, 2, 3, 4]);
            expect(queue3.remove()).toEqual(1);
            expect(queue3.remove()).toEqual(2);
            expect(queue3.__array__).toEqual([3, 4]);
        });
    });



});
