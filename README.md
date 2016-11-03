sn.js (v0.0.1)
======

sn is personal library containing helper methods that I use most offten in every day activities.
To be clear in every day programming activites with JS I don't use it while shopping :)

Motivation
------

As you can notice some methods in this library are available in lodash or underscore (even though they are not copied they just do the same thing),
You can also notice there are some methods for date manipulation and you can wonder why not use moment (or some other great library for date manipulation).
Some other methods are probably available in some other great libraries it's JS there are libraries for everthing.

Yes they are all great libraries not just great there are by lightyear better then this library. They are battle tested and this library definetly is not.
Yes this library has Unit tests with 100% code coverage but I'm the only user which can't be comapred to 10 000 of peoples using it every day and testing it every day.

If you where wondering should you use this library the answer is simpe NO don't use it there is better alternatives.
In case you have came accross this library in code the chances are that I have add referenc to it and you are unlucky bastard who is working with me on project.
In that case sorry.

You still may be wondering why I have create this library when there is ton of other better libraries and the reasons are:

* Why not? it was fun.
* To learn somethin (and I definnetly have)
* To avoid including 2-3 libraries to use 10-20 helper methods which is not even 5% of library code (does that sound familiar?).
* Small footprint. It is and will always be < 10kb
* Eveng though it has much smaller API then lodash or some other library for me it has every method I will ever need.
  Think about it. Have you ever wanted for a library you use to have some superDruperCoolMethod?
  Just recentyl I was hoping lodash would have deepFreez but no it does not. guess which library now have deepFreez?
  If I need some method I can just add it any time I want.



Dates
------

#### is.lastDayOfMonth
Check if day in date is equal to last day of date month.

```javascript
var d1 = new Date(1987, 10, 14);
var d2 = new Date(1987, 14, 31);

sn(d1).is.lastDayOfMonth() //=> false
sn(d2).is.lastDayOfMonth() //=> true
```

#### getLastDayOfMonth
Get last day of the month {Number} from provided date.
If date is not provided it will get last day of the month for current month.

```javascript
var d1 = new Date(1987, 10, 14);
var d2 = new Date(1987, 14, 31);

sn(d1).getLastDayOfMonth() //=> 31
sn().getLastDayOfMonth() //=> depend's on current month
```

#### setLastDayOfMonth
If date is provided modify it to point to last day of month.
If date is not provided create new date that point to last day of current month

```javascript
var d1 = new Date(1987, 10, 14);

sn(d1).setLastDayOfMonth() //=> Thu Nov 31 1987 00:00:00
console.log(d1) //=> Thu Nov 31 1987 00:00:00

sn().setLastDayOfMonth() //=> depend's on current month
```

#### addMilliseconds
Adds or subtracts miliseconds from date.
If date is not provided it will create new current date and add/substract milliseconds from it.

```javascript
var d1 = new Date(1987, 10, 14);
var d2 = new Date(1987, 10, 14);

console.log(d1) //=> Thu Nov 14 1987 00:00:00

sn(d1).addMilliseconds(3000) //=> Thu Nov 14 1987 00:00:03
sn(d2).addMilliseconds(-3000) //=> Thu Nov 13 1987 23:59:57
sn().addMilliseconds(5000) //=> Depends on current date

console.log(d1) //=> Thu Nov 14 1987 00:00:03

sn().setLastDayOfMonth() //=> depend's on current month
```

#### addSeconds
Adds or subtracts seconds from date.
If date is not provided it will create new current date and add/substract seconds from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addSeconds(3) //=> Thu Nov 14 1987 00:00:03
```

#### addMinutes
Adds or subtracts seconds from date.
If date is not provided it will create new current date and add/substract minutes from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addMinutes(3) //=> Thu Nov 14 1987 00:03:00
```

#### addHours
Adds or subtracts hours from date.
If date is not provided it will create new current date and add/substract hours from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addHours(3) //=> Thu Nov 14 1987 03:00:00
```

#### addDays
Adds or subtracts days from date.
If date is not provided it will create new current date and add/substract days from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addDays(3) //=> Thu Nov 14 1987 00:00:00
```

#### addMonths
Adds or subtracts months from date.
If date is not provided it will create new current date and add/substract months from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addMonths(-3) //=> Thu Aug 14 1987 00:00:00
```

#### addYears
Adds or subtracts years from date.
If date is not provided it will create new current date and add/substract years from it.

```javascript
var d1 = new Date(1987, 10, 14);
sn(d1).addMonths(3) //=> Thu Nov 14 1990 00:00:00
```

#### getMonths
Get the list of englis months with short and long names.
If date is not provided it will create new current date and add/substract months from it.

```javascript
sn.getMonths()
//=> Thu Nov 14 1987 00:00:03
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

//if you need list of short names you can use map
var monthShortNames = sn.getMonths().map(function(m) { return m.shortName; });
console.log(monthShortNames); //=> ['Jan', 'Feb', 'Nov', ....]
```

