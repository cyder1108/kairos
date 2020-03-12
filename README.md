# Install
```
npm install cyder1108/kairos
```

# Usage & Examples
```js
const Kairos = require("kairos").Kairos
const c = require("kairos").chronus
```
```js
var now = new Kairos()
// or
var xmas = new Kairos([2020,12,25, 11,22,33,444])

xmas.year()   // -> 2020
xmas.month()  // -> 12
xmas.date()   // -> 25
xmas.hour()   // -> 11
xmas.minute() // -> 22
xmas.second() // -> 33
xmas.millisecond() // -> 444
```

```js
var xmas = new Kairos([2020,12,25])
// Get beginning of month
xmas.bom() // 2020/12/01 00:00:00.000
// Get end of month
xmas.eom() // 2020/12/31 23:59:59.999

// Get beginning of day
xmas.bod() // 2020/12/25 00:00:00.000
// Get end of day
xmas.eod() // 2020/12/25 23:59:59.999
```

```js
var xmas = new Kairos([2020,12,25])
xmas.toString()
xmas.toArray()
xmas.toDateObject()
xmas.toString()
```

```js
var xmas = new Kairos([2020,12,25])

xmas.since( c(1).second )
xmas.since( c(1).minute )
xmas.since( c(1).hour )
xmas.since( c(1).day )
xmas.since( c(1).week )
xmas.since( c(1).month )
xmas.since( c(1).year )
xmas.ago( c(1).second )
xmas.ago( c(1).minute )
xmas.ago( c(1).hour )
xmas.ago( c(1).day )
xmas.ago( c(1).week )
xmas.ago( c(1).month )
xmas.ago( c(1).year )

```
