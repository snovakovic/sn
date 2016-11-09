sn.js (v0.0.1)
======

sn is personal library containing helper methods that I use most often in every day activities.
To be clear in every day programming activities with JS I don't use it while shopping :)

Motivation
------

As you can notice some methods in this library are available in lodash or underscore (even though they are not copied they just do the same thing),
You can also notice there are some methods for date manipulation and you can wonder why not use moment (or some other great library for date manipulation).
Some other methods are probably available in some other great libraries it's JS there are libraries for everything.

Yes they are all great libraries not just great there are by lightyear better then this library. They are battle tested and this library definitely is not.
Yes this library has Unit tests with 100% code coverage but I'm the only user which can't be compared to 10 000 of peoples using it every day and testing it every day.

If you where wondering should you use this library the answer is simple NO don't use it there is better alternatives.
In case you have came across this library in code the chances are that I have add reference to it and you are unlucky bastard who is working with me on project.
In that case sorry.

You still may be wondering why I have create this library when there is ton of other better libraries and the reasons are:

* Why not? it was fun.
* To learn something (and I definitely have)
* To avoid including 2-3 libraries to use 10-20 helper methods which is not even 5% of library code (does that sound familiar?).
* Small footprint. It is and will always be < 10kb
* Even though it has much smaller API then lodash or some other library for me it has every method I will ever need.
  Think about it. Have you ever wanted for a library you use to have some superDuperCoolMethod?
  Just recently I was hoping lodash would have deepFreeze but no it does not. guess which library now have deepFreeze?
  If I need some method I can just add it any time I want.



Assert is not
------

s().is module is used to check the truth of something. sn().not is just nicer way of writing !s().is.
For each s.is check we can also use sn().assert.is (assert are use in code for checking method inputs). Assert will trow TypeError in case if is condition is false.
In case of true condition it will return true. There is also sn().assert.not which is opposite to sn().assert.is.

#### is.is

As you are probably aware JS have to way of checking are values same.
strict === and not so strict ==. I also presume you are aware that in most cases you should stick to strict comparison (===).
In some cases strict comparison is not suitable and the most common cases is when you want for numbers
and string numbers to produce true value e.q '3' == 3) or undefined == null to be true.
If you have ever use == in your code please consider following gotchas

* "0" == false; // true -- UH OH!
* false == 0; // true -- UH OH!
* false == ""; // true -- UH OH!
* false == []; // true -- UH OH!
* "" == 0; // true -- UH OH!
* "" == []; // true -- UH OH!
* 0 == []; // true -- UH OH!

consider sn(var1).is(var2) like == without any gotchas from above.
If you want to know more about == and === (and coercion that is been performed when using ==)
There is great book chapter (https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md)
I strongly recommend you to read whole series of You-Dont-Know-JS books!

```javascript
sn('0').is(false); //=> false
sn('').is(0); //=> false
sn(0).is([]); //=> false
sn(false).is([]); //=> false

sn('3').is(3); //=> true
sn('-3').is(-3); //=> true
sn(null).is(undefined); //=> true

//not is shorthand for calling !s(var).is(var)
sn(false).not([]); //=> true

//assert will throw TypeError if false
sn(0).assert.is(''); //=> TypeError Values are not the same.
sn(10).assert.is('10'); //=> true
sn(10).assert.not('10'); //=> TypeError Values are the same.

```

#### is.empty
Test if variable has been defined and is not empty.
{}, [] and empty string or string with only space tab character are consider empty.


```javascript
sn(null).is.empty(); //=> true
sn(undefined).is.empty(); //=> true
sn({}).is.empty(); //=> true
sn([]).is.empty(); //=> true
sn(' ').is.empty(); //=> true
sn('\n\t').is.empty(); //=> true

sn(0).is.empty(0); //=> false
sn(false).is.empty(); //=> false

sn(null).not.empty(); //=> false
sn(null).assert.not.empty(); //=> TypeError Provided value is empty.
sn(0).assert.is.empty(); //=> TypeError Provided value is not empty.
```

#### is.defined
true if value is not null or undefined

```javascript
sn(undefined).is.defined(); //=> false
sn(null).is.defined(); //=> false

sn([]).is.defined(); //=> true
sn(0).is.defined(); //=> true

sn(true).not.defined(); //=> false
sn(null).assert.is.defined(); //=> TypeError Provided value is not defined.
sn({}).assert.not.defined(); //=> TypeError Provided value is defined.
```

#### is.string

```javascript
sn('').is.string(); //=> true
sn(2).is.string(); //=> false
//check previous examples on how to use assert and not
```

#### is.number

```javascript
sn(2).is.number(); //=> true
sn('').is.number(); //=> false
//check previous examples on how to use assert and not
```

#### is.boolean

```javascript
sn(false).is.boolean(); //=> true
sn(2).is.boolean(); //=> false
//check previous examples on how to use assert and not
```

#### is.object

```javascript
sn({}).is.object(); //=> true
sn([]).is.object(); //=> false
sn(null).is.object(); //=> false
sn(function(){}).is.object(); //=> false
sn(false).is.object(); //=> false
//check previous examples on how to use assert and not
```
#### is.function

```javascript
sn(function(){}).is.function(); //=> true
sn([]).is.function(); //=> false
sn({}).is.function(); //=> false
sn(false).is.function(); //=> false
//check previous examples on how to use assert and not
```

#### is.array

```javascript
sn([]).is.array(); //=> true
sn({}).is.array(); //=> false
sn(null).is.array(); //=> false
//check previous examples on how to use assert and not

```



Dates
------

Module for manipulating with dates.


#### is.lastDayOfMonth
Check if day in date is equal to last day of date month.

```javascript
var d1 = new Date(1987, 10, 14);
var d2 = new Date(1987, 10, 30);

sn(d1).is.lastDayOfMonth(); //=> false
sn(d2).is.lastDayOfMonth(); //=> true
```

#### getLastDayOfMonth
Get last day of the month {Number} from provided date.
If date is not provided it will get last day of the month for current month.

```javascript
var d1 = new Date(1987, 10, 14);

sn(d1).getLastDayOfMonth(); //=> 30
var d2 = sn().getLastDayOfMonth(); //=> depends on current month
```

#### setLastDayOfMonth
If date is provided modify it to point to last day of month.
If date is not provided create new date that point to last day of current month

```javascript
var d1 = new Date(1987, 10, 14);

sn(d1).setLastDayOfMonth(); //=> Thu Nov 30 1987 00:00:00
console.log(d1); //=> Thu Nov 30 1987 00:00:00

sn().setLastDayOfMonth(); //=> depends on current month
```

#### addMilliseconds
Adds or subtracts milliseconds from date.
If date is not provided it will create new current date and add/subtract milliseconds from it.

```javascript
var d1 = new Date(1987, 10, 14);
var d2 = new Date(1987, 10, 14);

console.log(d1) //=> Thu Nov 14 1987 00:00:00

sn(d1).addMilliseconds(3000); //=> Thu Nov 14 1987 00:00:03
sn(d2).addMilliseconds(-3000); //=> Thu Nov 13 1987 23:59:57
sn().addMilliseconds(5000); //=> Depends on current date

console.log(d1) //=> Thu Nov 14 1987 00:00:03

```

#### addSeconds
Adds or subtracts seconds from date.
If date is not provided it will create new current date and add/subtract seconds from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addSeconds(3); //=> Thu Nov 14 1987 00:00:03
```

#### addMinutes
Adds or subtracts seconds from date.
If date is not provided it will create new current date and add/subtract minutes from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addMinutes(3); //=> Thu Nov 14 1987 00:03:00
```

#### addHours
Adds or subtracts hours from date.
If date is not provided it will create new current date and add/subtract hours from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addHours(3); //=> Thu Nov 14 1987 03:00:00
```

#### addDays
Adds or subtracts days from date.
If date is not provided it will create new current date and add/subtract days from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addDays(3); //=> Thu Nov 17 1987 00:00:00
```

#### addMonths
Adds or subtracts months from date.
If date is not provided it will create new current date and add/subtract months from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addMonths(-3); //=> Thu Aug 14 1987 00:00:00
```

#### addYears
Adds or subtracts years from date.
If date is not provided it will create new current date and add/subtract years from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addMonths(3); //=> Thu Nov 14 1990 00:00:00
```

#### getMonths
Get the list of englis months with short and long names.
If date is not provided it will create new current date and add/subtract months from it.

```javascript
sn.getMonths();
/*
  {
      index: 0,
      month: 1
      name: 'January',
      shortName: 'Jan',
      days: 31,
    }, {
      index: 1,
      month: 2
      name: 'February',
      shortName: 'Feb',
      days: [28, 29],
    }
    .....
*/

//if you need list of short names you can use map
var monthShortNames = sn.getMonths().map(function(m) { return m.shortName; });
console.log(monthShortNames); //=> ['Jan', 'Feb', 'Nov', ....]
```


Array
------

Module for manipulation with array and array likes.

### each
Loop over array, array like elements and string.
use return false in callback to break looping and return to continue looping.

```javascript
var testArr = ['a', 'b','c', 'c', 'd', 'e'];
sn(testArr).each(function(val, i) {
    console.log(this); //=> ['a', 'b','c', 'd', 'e']
    console.log(val); //=> //=> a b c d e
    console.log(i); ////=> 0 1 2 3 4
});


sn(testArr).each(function (val, i) {
    //break each loop if previous value is equal to current
    if (this[i] === val) {
        return false;
    }

    console.log(val); //=>> a b
});

sn('test').each(function(val, i) {
    console.log(val) //=> t e s t
});

```


#### iterate
Iterate specific number of times.
use return false in callback to break iteration and return to continue iteration.

```javascript
sn(4).iterate(function(i) {
    console.log(i); //=> 0 1 2 3
});

sn(10).iterate(function (i) {
    console.log(i); //=> 0 1
    if (i === 1) {
        return false;
    }
});
```

#### shuffle
Shuffle values in the array.

```javascript
sn(['a', 'b', 'c', 'd', 'c']).shuffle(); //=> random ordered items
```


#### fillArray
Returns new array filled with default values

```javascript
sn(null).fillArray(2); //=> [null, null]
sn(0).fillArray(4); //=> [0,0,0,0]
sn({test: 'a'}).fillArray(2); //=> [{test: 'a'}, {test: 'a'}]
```


#### toArray
If provided value is array return it.
If provided value is not array it wraps that value with array.
If provided value is not array and is null or undefined it returns empty array.


```javascript
sn([1,2,3]).toArray(); //=> [1,2,3]
sn('test').toArray(); //=> ['test']
sn(0).toArray(); //=> [0]
sn({test: 'a'}).toArray(); //=> [{test: 'a'}]
sn(undefined).toArray(); //=> []
sn(null).toArray(); //=> []
```


#### unique
Returns new array that contain only unique values from original array.
We can compare uniqueness by object property by providing path to object property we want ot use for unique comparison

```javascript
sn([1,1,2,3,2,1,3]).unique(); //=> [1,2,3]
sn(["a", "b", "a"]).unique(); //=> ["a","b"]

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

sn(objects).unique('id'); //=> [{ id: 1, deepProperty: { name: 'first' }}, { id: 2, deepProperty: { name: 'first' }}]
sn(objects).unique('deepProperty.name'); //=> [{ id: 1, deepProperty: { name: 'first' }}, { id: 2, deepProperty: { name: 'third' }}]

sn
```

#### first
Returns first element of array that match the condition in callback function or undefined if there is no match.
if no condition is passed it returns first element of array.

```javascript
s.first([1,1,2,3,2,1,3]); //=> 1
s.first([1,1,2,3,2,1,3], function(e) {
  return e === 2;
}); //=> 2
s.first([{name:'test'}], function(e) {
  return e.name = 'test';
}); //=> {name:'test'}
```

#### last
Returns last element of array that match the condition in callback function or undefined if there is no match.
if no condition is passed it returns last element of array.

```javascript
s.last([1,1,2,3,2,1,3]); //=> 3
s.last([1,1,2,3,2,1,3], function(e) {
  return e === 2;
}); //=> 2
s.last([{name:'test'}], function(e) {
  return e.name = 'test';
}); //=> {name:'test'}
```

#### stack
Stack implementation. LIFO: last in first out.
Stack is instantiated by calling s.stack().
We can instantiate stack by passing optional start array s.stack([1,2,3]).

Stack Operations:
  * .add() - add new item to stack. We can one value or array of values into stack
  * .remove() - remove item from stack. Removed items is returned or in case of empty stack null is returned.
  * .peek() - peek next value in stack without modifying stack
  * .length() - get size of stack
  * .array - get raw stack array


```javascript
var stack = s.stack(); //instantiate new stack
stack.add(2); //add new value in stack.
stack.add(3);
stack.length(); //get length of stack. => 2
stack.array; //get raw stack array => [2,3]
stack.peek(); //=> 3 peek next value in stack without removing it
var val = stack.remove(); //remove last added value from stack
console.log(val); //=> 3
stack.length(); //=> 1
stack.array; //=> [2]

//if there is no value in stack .remove() will return null instead of removed value
var stack2 = s.stack();
console.log(stack2.remove()) //=> null
stack2.array //=> []

//stack can be instantiated with default array
var stack3 = s.stack([1,2]);
stack3.add([3,4]);
stack3.array; //=> [1,2,3,4]
stack3.remove(); //=> 4
stack3.remove(); //=> 3
stack3.array; //=> [1,2]
```

#### queue
Queue implementation. FIFO: first in first out.

Queue is instantiated by calling s.queue().
We can instantiate queue by passing optional start array s.queue([1,2,3]).

Queue Operations:
  * .add() - add new item to queue. We can one value or array of values into stack
  * .remove() - remove item from queue. Removed items is returned or in case of empty queue null is returned.
  * .peek() - peek next value in queue without modifying queue
  * .length() - get size of queue
  * .array - get raw queue array

```javascript
var queue = s.queue(); //instantiate new queue
queue.add(2); //add new value in queue.
queue.add(3);
queue.length(); //get length of queue. => 2
queue.array; //get raw queue array => [2,3]
stack.peek(); //=> 2 peek next value in stack without removing it
var val = queue.remove(); //remove last added value from queue
console.log(val); //=> 2
queue.length(); //=> 1
queue.array; //=> [3]

//if there is no value in queue .remove() will return null instead of removed value
var queue2 = s.queue();
console.log(queue2.remove()) //=> null
queue2.array //=> []

//queue can be instantiated with default array
var queue3 = s.queue([1,2]);
queue3.add([3, 4]);
queue3.array; //=> [1,2,3,4]
queue3.remove(); //=> 1
queue3.remove(); //=> 2
queue3.array; //=> [3,4]
