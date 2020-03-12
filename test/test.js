"use strict";

const test = require("ava");
const _    = require("lodash");
const Kairos =  require("../index.js").Kairos;
const c = require("../index.js").chronus;

test("Construct without arguments", t => {
  let kairos = new Kairos;
  t.assert(_.isInteger(kairos._time));
});

test("Construct with time of Date Object", t => {
  let date = new Date;
  let kairos = new Kairos(date);
  t.assert(_.isInteger(kairos._time));
});

test("Construct with time of integer", t => {
  let time = +new Date;
  t.assert(_.isInteger(time));
  let kairos = new Kairos(time);
  t.assert(_.isInteger(kairos._time));
});

test("Construct with time of Array", t => {
  let time = [2020,2,28,9,47, 10, 300]
  let kairos = new Kairos(time);
  t.assert(_.isInteger(kairos._time));
});

test("construct with timezone of string", t => {
  let kairos = new Kairos( null, "tokyo" )
  t.deepEqual( kairos.timezone(), [ "UTC+09:00", "Asia/Tokyo" ])
});

test("method of timezoneOffset", t => {
  let time = +new Date;
  let kairos = new Kairos(time);
  t.is( kairos.timezoneOffset(), -32400000 );
});

test("method of utcOffset", t => {
  let time = +new Date;
  let kairos = new Kairos(time);
  t.is( kairos.utcOffset(), 32400000 );
});

test("method of utcYear", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcYear()) );
});

test("method of year", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.year()) );
  t.is( today.year(), (new Date).getFullYear() )
  // Setter
  t.assert( _.isInteger(today.year(2021)) );
  t.is( today.year(), 2021 )
});

test("method of utcMonth", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcMonth()) );
});

test("method of month", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.month()) );
  t.is( today.month(), (new Date).getMonth() + 1 )
  // Setter
  t.assert( today.month(12) );
  t.is( today.month(), 12 )
});

test("method of monthName", t => {
  var today = new Kairos([2020,6,20]);
  t.is( today.monthName(), "June" )
  t.is( today.monthName("en",true), "Jun" )

  t.is( today.monthName("ja"), "水無月" )
  t.is( today.monthName("ja",true), "水無" )

  var today = new Kairos([2020,12,20]);
  t.is( today.monthName("ja"), "師走" )
  t.is( today.monthName("ja",true), "師走" )
});

test("method of dayName", t => {
  var today = new Kairos([2020,3,12]);
  t.is( today.dayName(), "Thursday" )
  t.is( today.dayName(true,"en"), "Thu" )

  t.is( today.dayName(false, "ja"), "木曜日" )
  t.is( today.dayName(true, "ja"), "木" )
});

test("method of utcDate", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcDate()) );
});

test("method of date", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.date()) );
  // Setter
  t.assert( today.date(5) );
  t.is( today.date(), 5 );
});

test("method of utcHour", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcHour()) );
});

test("method of hour", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.hour()) );
  // Setter
  t.assert( today.hour(2) );
  t.is( today.hour(), 2 );
});

test("method of utcMinute", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcMinute()) );
});

test("method of minute", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.minute()) );
  // Setter
  t.assert( today.minute(12) );
  t.is( today.minute(),12 )
});

test("method of utcSecond", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcSecond()) );
});

test("method of second", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.second()) );
  // Setter
  t.assert( today.second(20) )
  t.is( today.second(), 20 )
});

test("method of utcMillisecond", t => {
  let today = new Kairos(new Date);
  t.assert( _.isInteger(today.utcMillisecond()) );
});

test("method of millisecond", t => {
  let today = new Kairos(new Date);
  // Getter
  t.assert( _.isInteger(today.millisecond()) );
  // Setter
  t.assert( today.millisecond(555) );
  t.is( today.millisecond(), 555 );
});

test("method of toDateObject", t => {
  let kairos = new Kairos();
  t.assert( kairos.toDateObject() instanceof Date );
});

test("method of toArray", t => {
  let today = new Kairos();
  t.assert( _.isArray(today.toArray()) );
  today.timezone(0)
});

test("method of toString", t => {
  let kairos1 = new Kairos([2020,1,2,3,4,5])
  let kairos2 = new Kairos([2020,12,31,23,30,45])
  t.is( kairos1.toString("%Y"), "2020" )
  t.is( kairos1.toString("%y"), "20" )

  t.is( kairos1.toString("%m"), "01" )
  t.is( kairos2.toString("%m"), "12" )

  t.is( kairos1.toString("%-m"), "1" )
  t.is( kairos2.toString("%-m"), "12" )

  t.is( kairos1.toString("%d"), "02" )
  t.is( kairos2.toString("%d"), "31" )

  t.is( kairos1.toString("%-d"), "2" )
  t.is( kairos2.toString("%-d"), "31" )

  t.is( kairos1.toString("%H"), "03" )
  t.is( kairos2.toString("%H"), "23" )

  t.is( kairos1.toString("%-H"), "3" )
  t.is( kairos2.toString("%-H"), "23" )

  t.is( kairos1.toString("%M"), "04" )
  t.is( kairos2.toString("%M"), "30" )

  t.is( kairos1.toString("%-M"), "4" )
  t.is( kairos2.toString("%-M"), "30" )

  t.is( kairos1.toString("%S"), "05" )
  t.is( kairos2.toString("%S"), "45" )

  t.is( kairos1.toString("%-S"), "5" )
  t.is( kairos2.toString("%-S"), "45" )

  t.is( kairos1.toString("%w"), "4" );

  t.is( kairos1.toString("%A"), "Thursday" );
  t.is( kairos1.toString("%A-en"), "Thursday" );
  t.is( kairos1.toString("%A-ja"), "木曜日" );

  t.is( kairos1.toString("%a"), "Thu" );
  t.is( kairos1.toString("%a-en"), "Thu" );
  t.is( kairos1.toString("%a-ja"), "木" );
});

test("method of since", t => {
  let today = new Kairos;
  t.is( today.since( 10 ).time(), today.time() + 10 );
  t.is( today.since( c(1).second() ).time(), today.time() + 1000 );
  t.is( today.since( c(2).second() ).time(), today.time() + 2000 );
  t.is( today.since( c(1).minute() ).time(), today.time() + 60000 );
  t.is( today.since( c(1).hour()   ).time(), today.time() + 60000 * 60 );

  t.is( today.since( c(1).day() ).date(), today.date() +1  )

  t.is( today.since( c(1).week() ).toDateObject().getDay(), today.toDateObject().getDay() )
  t.is( today.since( c(2).week() ).toDateObject().getDay(), today.toDateObject().getDay() )

  let yearFirst = new Kairos([2020,1,1])

  t.is( yearFirst.since( c(1).month()  ).year(),  yearFirst.year() );
  t.is( yearFirst.since( c(1).month()  ).month(), yearFirst.month() + 1 );

  t.is( yearFirst.since( c(11).month() ).year(),  yearFirst.year() );
  t.is( yearFirst.since( c(11).month() ).month(), yearFirst.month() + 11 );

  t.is( yearFirst.since( c(12).month() ).year(), yearFirst.year() + 1);
  t.is( yearFirst.since( c(12).month() ).month(), yearFirst.month());

  t.is( yearFirst.since( c(25).month() ).year(), yearFirst.year() + 2);
  t.is( yearFirst.since( c(25).month() ).month(), 2 );

  t.is( today.since( c(1).year()   ).year(), today.year() + 1);
  t.is( today.since( c(1).year()   ).month(), today.month() );
  t.is( today.since( c(1).year()   ).date(), today.date() );
  t.is( today.since( c(1).year()   ).hour(), today.hour() );
  t.is( today.since( c(1).year()   ).minute(), today.minute() );
  t.is( today.since( c(1).year()   ).second(), today.second() );
  t.is( today.since( c(1).year()   ).millisecond(), today.millisecond() );
  t.deepEqual( today.since( c(1).year() ).timezone(), today.timezone() );
});

test("method of ago", t => {
  let today = new Kairos;
  t.is( today.ago( 10 ).time(), today.time() - 10 );
  t.is( today.ago( c(1).second() ).time(), today.time() - 1000 );
  t.is( today.ago( c(2).second() ).time(), today.time() - 2000 );
  t.is( today.ago( c(1).minute() ).time(), today.time() - 60000 );
  t.is( today.ago( c(1).hour()   ).time(), today.time() - 60000 * 60 );

  let yearLast = new Kairos([2020,12,31])

  t.is( yearLast.ago( c(1).month()  ).year(),  yearLast.year() );
  t.is( yearLast.ago( c(1).month()  ).month(), yearLast.month() - 1 );

  t.is( yearLast.ago( c(11).month() ).year(),  yearLast.year() );
  t.is( yearLast.ago( c(11).month() ).month(), yearLast.month() - 11 );

  t.is( yearLast.ago( c(12).month() ).year(), yearLast.year() - 1);
  t.is( yearLast.ago( c(12).month() ).month(), yearLast.month());

  t.is( yearLast.ago( c(25).month() ).year(), yearLast.year() - 2);
  t.is( yearLast.ago( c(25).month() ).month(), 11 );
});

test("method of bom", t => {
  let kairos = new Kairos([2020,3,15]);
  t.is( kairos.bom().month(),3 )
  t.is( kairos.bom().date(),1 )
});


test("method of eom", t => {
  let kairos = new Kairos([2020,3,15]);
  t.is( kairos.eom().month(),3 )
  t.is( kairos.eom().date(), 31 )
});

test("method of bod", t => {
  let kairos = new Kairos([2020,3,15]);
  t.is( kairos.bod().month(),3 )
  t.is( kairos.bod().date(),15 )
  t.is( kairos.bod().hour(),0 )
});

test("method of eod", t => {
  let kairos = new Kairos([2020,3,15]);
  console.log( kairos.eod().toArray() )
  t.is( kairos.eod().month(),3 )
  t.is( kairos.eod().date(),15 )
  t.is( kairos.eod().hour(),23 )
  t.is( kairos.eod().minute(),59 )
  t.is( kairos.eod().second(),59 )
  t.is( kairos.eod().millisecond(),999 )
});

test("method of isIn", t => {
  let begin   = new Kairos([2020,12,12]);
  let end     = new Kairos([2020,12,31]);
  let xmaseve = new Kairos([2020,12,24]);
  let xmas    = new Kairos([2020,12,25]);
  let halloween = new Kairos([2020,10,30])
  t.true(  xmas.isIn( begin, end ) );
  t.true(  xmaseve.isIn( begin, end ) );
  t.false( halloween.isIn( begin, end ) );
});

test("method of isInMonthOf", t => {
  let december = new Kairos([2020,12])
  let xmaseve = new Kairos([2020,12,24]);
  let xmas    = new Kairos([2020,12,25]);
  let halloween = new Kairos([2020,10,30])
  t.true(  xmas.isInMonthOf( december ) );
  t.false( halloween.isInMonthOf( december ) );
});

test("method of isInMonthDateOf", t => {
  let today = new Kairos([2020,12,25])
  let xmaseve = new Kairos([2020,12,24]);
  let xmas    = new Kairos([2020,12,25]);
  t.true(  xmas.isInDateOf( today ) );
  t.false( xmaseve.isInDateOf( today ) );
});
