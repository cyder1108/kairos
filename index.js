"use strict";

const _ = require("lodash");
const c = require("chronus");

module.exports.chronus = c
module.exports.Kairos = class Kairos {

  constructor( time = null, timezone = null ) {
    this.monthNames = {
      en: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
      ja: [ "睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走" ],
    }
    this.dayNames = {
      en: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
      ja: [ "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    }

    this.timezones = [
      [ "UTC-12:00", "Etc/GMT+12" ],
      [ "UTC-11:00", "Etc/GMT+11" ],
      [ "UTC-10:00", "Pacific/Honolulu" ],
      [ "UTC-09:00", "America/Anchorage" ],
      [ "UTC-08:00", "America/Santa_Isabel" ],
      [ "UTC-08:00", "America/Los_Angeles" ],
      [ "UTC-07:00", "America/Chihuahua" ],
      [ "UTC-07:00", "America/Phoenix" ],
      [ "UTC-07:00", "America/Denver" ],
      [ "UTC-06:00", "America/Guatemala" ],
      [ "UTC-06:00", "America/Chicago" ],
      [ "UTC-06:00", "America/Regina" ],
      [ "UTC-06:00", "America/Mexico_City" ],
      [ "UTC-05:00", "America/Bogota" ],
      [ "UTC-05:00", "America/Indiana/Indianapolis" ],
      [ "UTC-05:00", "America/New_York" ],
      [ "UTC-04:30", "America/Caracas" ],
      [ "UTC-04:00", "America/Halifax" ],
      [ "UTC-04:00", "America/Asuncion" ],
      [ "UTC-04:00", "America/La_Paz" ],
      [ "UTC-04:00", "America/Cuiaba" ],
      [ "UTC-04:00", "America/Santiago" ],
      [ "UTC-03:30", "America/St_Johns" ],
      [ "UTC-03:00", "America/Sao_Paulo" ],
      [ "UTC-03:00", "America/Godthab" ],
      [ "UTC-03:00", "America/Cayenne" ],
      [ "UTC-03:00", "America/Argentina/Buenos_Aires" ],
      [ "UTC-03:00", "America/Montevideo" ],
      [ "UTC-02:00", "Etc/GMT+2" ],
      [ "UTC-01:00", "Atlantic/Cape_Verde" ],
      [ "UTC-01:00", "Atlantic/Azores" ],
      [ "UTC+00:00", "Africa/Casablanca" ],
      [ "UTC+00:00", "Atlantic/Reykjavik" ],
      [ "UTC+00:00", "Europe/London" ],
      [ "UTC+00:00", "Etc/GMT" ],
      [ "UTC+01:00", "Europe/Berlin" ],
      [ "UTC+01:00", "Europe/Paris" ],
      [ "UTC+01:00", "Africa/Lagos" ],
      [ "UTC+01:00", "Europe/Budapest" ],
      [ "UTC+01:00", "Europe/Warsaw" ],
      [ "UTC+01:00", "Africa/Windhoek" ],
      [ "UTC+02:00", "Europe/Istanbul" ],
      [ "UTC+02:00", "Europe/Kiev" ],
      [ "UTC+02:00", "Africa/Cairo" ],
      [ "UTC+02:00", "Asia/Damascus" ],
      [ "UTC+02:00", "Asia/Amman" ],
      [ "UTC+02:00", "Africa/Johannesburg" ],
      [ "UTC+02:00", "Asia/Jerusalem" ],
      [ "UTC+02:00", "Asia/Beirut" ],
      [ "UTC+03:00", "Asia/Baghdad" ],
      [ "UTC+03:00", "Europe/Minsk" ],
      [ "UTC+03:00", "Asia/Riyadh" ],
      [ "UTC+03:00", "Africa/Nairobi" ],
      [ "UTC+03:30", "Asia/Tehran" ],
      [ "UTC+04:00", "Europe/Moscow" ],
      [ "UTC+04:00", "Asia/Tbilisi" ],
      [ "UTC+04:00", "Asia/Yerevan" ],
      [ "UTC+04:00", "Asia/Dubai" ],
      [ "UTC+04:00", "Asia/Baku" ],
      [ "UTC+04:00", "Indian/Mauritius" ],
      [ "UTC+04:30", "Asia/Kabul" ],
      [ "UTC+05:00", "Asia/Tashkent" ],
      [ "UTC+05:00", "Asia/Karachi" ],
      [ "UTC+05:30", "Asia/Colombo" ],
      [ "UTC+05:30", "Asia/Kolkata" ],
      [ "UTC+05:45", "Asia/Kathmandu" ],
      [ "UTC+06:00", "Asia/Almaty" ],
      [ "UTC+06:00", "Asia/Dhaka" ],
      [ "UTC+06:00", "Asia/Yekaterinburg" ],
      [ "UTC+06:30", "Asia/Rangoon" ],
      [ "UTC+07:00", "Asia/Bangkok" ],
      [ "UTC+07:00", "Asia/Novosibirsk" ],
      [ "UTC+08:00", "Asia/Krasnoyarsk" ],
      [ "UTC+08:00", "Asia/Ulaanbaatar" ],
      [ "UTC+08:00", "Asia/Shanghai" ],
      [ "UTC+08:00", "Australia/Perth" ],
      [ "UTC+08:00", "Asia/Singapore" ],
      [ "UTC+08:00", "Asia/Taipei" ],
      [ "UTC+09:00", "Asia/Irkutsk" ],
      [ "UTC+09:00", "Asia/Seoul" ],
      [ "UTC+09:00", "Asia/Tokyo" ],
      [ "UTC+09:30", "Australia/Darwin" ],
      [ "UTC+09:30", "Australia/Adelaide" ],
      [ "UTC+10:00", "Australia/Hobart" ],
      [ "UTC+10:00", "Asia/Yakutsk" ],
      [ "UTC+10:00", "Australia/Brisbane" ],
      [ "UTC+10:00", "Pacific/Port_Moresby" ],
      [ "UTC+10:00", "Australia/Sydney" ],
      [ "UTC+11:00", "Asia/Vladivostok" ],
      [ "UTC+11:00", "Pacific/Guadalcanal" ],
      [ "UTC+12:00", "Etc/GMT-12" ],
      [ "UTC+12:00", "Pacific/Fiji" ],
      [ "UTC+12:00", "Asia/Magadan" ],
      [ "UTC+12:00", "Pacific/Auckland" ],
      [ "UTC+13:00", "Pacific/Tongatapu" ],
      [ "UTC+13:00", "Pacific/Apia" ],
    ]

    if( timezone === null ) {
      if( time instanceof Date ) {
        this.timezone(time.getTimezoneOffset());
      } else {
        this.timezone(null);
      }
    } else {
      this.timezone( timezone )
    }
    this.time(time);
  }

  timezoneOffset() {
    return this.timezone[0];
  }

  time( arg ) {
    if( arg !== void 0 ) {
      if( arg === null ) {
        this._time = +new Date;
      }else if( arg instanceof Date ) {
        this._time = +arg;
      } else if( _.isInteger(arg) ) {
        this._time = arg;
      } else if( _.isArray(arg) ) {
        let y   = ("20" + ( arg[0] || 2000 )).slice(-4);
        let m   = ("0"  + ( arg[1] || 1)).slice(-2);
        let d   = ("0"  + ( arg[2] || 1)).slice(-2);
        let h   = ("0"  + ( arg[3] || 0)).slice(-2);
        let min = ("0" +  ( arg[4] || 0)).slice(-2);
        let s   = ("0"  + ( arg[5] || 0)).slice(-2);
        let ms  = (( arg[6] || 0) / 1000 + "00" ).slice(2,5);
        if( arg[7] !== void 0 ){
          this.timezone( arg[7] )
        }
        this._time =
          +new Date( `${y}-${m}-${d}T${h}:${min}:${s}.${ms}+00:00` )
          +this.timezoneOffset();
      }
    }
    return this._time
  }

  timezone( arg ) {
    if( arg !== void 0 ) {
      if( arg === null ) { arg = (new Date).getTimezoneOffset(); }
      if( _.isInteger(arg) ) {
        this._timezone = this.findTimezoneByOffsetMinutes(arg);
      } else if( _.isArray(arg) ) {
        this._timezone = arg;
      } else if( _.isString(arg) ) {
        this._timezone = _.find(this.timezones, timezone => {
          return timezone[0].toLowerCase().indexOf( arg.toLowerCase() ) !== -1
          ||     timezone[1].toLowerCase().indexOf( arg.toLowerCase() ) !== -1
        });
      }
    }
    return this._timezone
  }

  findTimezoneByOffsetMinutes( minutes ) {
    return _.find(this.timezones, timezone => {
      return minutes === this.getOffsetMinutesByTimezone(timezone);
    });
  }

  getOffsetMinutesByTimezone( timezone ) {
    return -(timezone[0].match(/^UTC(.*?):(.*?)$/)[1]) * 60;
  }

  timezoneOffset() {
    return this.getOffsetMinutesByTimezone( this.timezone() ) * 60 * 1000;
  }

  utcOffset() {
    return -this.timezoneOffset();
  }

  utcYear() {
    return this.toDateObject().getUTCFullYear();
  }

  year( arg ) {
    if( arg !== void 0 ) {
      let arr = this.toArray()
      arr[0] = +arg
      this.time(arr)
    }
    return this.toDateObject().getFullYear();
  }

  utcMonth( arg ) {
    return this.toDateObject().getUTCMonth() + 1;
  }

  month( arg ) {
    if( arg !== void 0 ) {
      let arr = this.toArray()
      arr[1] = +arg
      this.time(arr)
    }
    return this.toDateObject().getMonth() + 1;
  }

  monthName( lang = "en", shorten = false ) {
    switch( lang ) {
      case "en":
        if( shorten ) {
          return this.monthNames.en[this.month()-1].slice(0,3)
        } else {
          return this.monthNames.en[this.month()-1]
        }
      break;
      case "ja":
        if( shorten ) {
          return this.monthNames.ja[this.month()-1].replace(/月$/,"")
        } else {
          return this.monthNames.ja[this.month()-1]
        }
      break;
    }
  }

  utcDate( arg ) {
    return this.toDateObject().getUTCDate();
  }

  date( arg ) {
    if( arg !== void 0 ) {
      let arr = this.toArray();
      arr[2] = +arg;
      this.time(arr);
    }
    return this.toDateObject().getDate();
  }

  utcHour( arg ) {
    return this.toDateObject().getUTCHours();
  }

  hour( arg ) {
    if( arg !== void(0) ) {
      let arr = this.toArray();
      arr[3] = +arg;
      this.time(arr);
    }
    return this.toDateObject().getHours();
  }

  utcMinute( arg ) {
    return this.toDateObject().getUTCMinutes();
  }

  minute( arg ) {
    if( arg !== void(0) ) {
      let arr = this.toArray();
      arr[4] = +arg;
      this.time(arr);
    }
    return this.toDateObject().getMinutes();
  }

  utcSecond( arg ) {
    return this.toDateObject().getUTCSeconds();
  }

  second( arg ) {
    if( arg !== void 0 ) {
      let arr = this.toArray();
      arr[5] = +arg;
      this.time(arr);
    }
    return this.toDateObject().getSeconds();
  }

  utcMillisecond( arg ) {
    return this.toDateObject().getUTCMilliseconds();
  }

  millisecond( arg ) {
    if( arg !== void 0 ) {
      let arr = this.toArray();
      arr[6] = +arg;
      this.time(arr);
    }
    return this.toDateObject().getMilliseconds();
  }

  utcDay() {
    return this.toDateObject().getUTCDay();
  }

  day() {
    return this.toDateObject().getDay();
  }

  dayName( shorten = false, lang = "en"  ) {
    switch( lang ) {
      case "en":
        if( shorten ) {
          return this.dayNames.en[this.day()].slice(0,3);
        } else {
          return this.dayNames.en[this.day()];
        }
      break;
      case "ja":
        if( shorten ) {
          return this.dayNames.ja[this.day()].slice(0,1);
        } else {
          return this.dayNames.ja[this.day()];
        }
      break;
    }
  }


  since( chronus ) {
    if( _.isInteger(chronus) ){ chronus = c(chronus); }
    if( chronus.unit === "year" ) {
      let arr = this.toArray();
      arr[0] = this.year() + chronus.len;
      return new this.constructor( arr );
    } else if( chronus.unit === "month" ) {
      let arr = this.toArray();
      let m = this.month() - 1;
      let mod = function(a,b){return(a%b+b)%b}
      arr[0] = Math.floor(( m + chronus.len ) / 12) + this.year();
      arr[1] = mod( m + chronus.len , 12) + 1
      arr[2] = (() => {
        let eom = ( new this.constructor([arr[0],arr[1],1]) ).eom()
        if( this.date() > eom.date() ){
          return eom.date()
        } else {
          return this.date()
        }
      })();
      return new this.constructor( arr )
    } else {
      return new this.constructor( this.time() + chronus.toInteger() )
    }
  }

  ago( chronus ) {
    if( _.isInteger(chronus) ){ chronus = c(chronus); }
    chronus.len = chronus.len * -1
    return this.since( chronus )
  }

  bom() {
    return new this.constructor([this.year(),this.month()],this.timezone())
  }

  eom() {
    let _eom = new Date(this.year(),this.month(),1)
    return new this.constructor(_eom - 1, this.timezone());
  }

  bod() {
    return new this.constructor([this.year(), this.month(), this.date()], this.timezone())
  }

  eod() {
    return this.since( c(1).day() ).bod().ago(1)
  }

  toDateObject() {
    return new Date( this.time() )
  }

  toArray() {
    return [this.year(), this.month(), this.date(),
      this.hour(), this.minute(), this.second(), this.millisecond(), this.timezone()[0]];
  }

  toString( format = "%Y/%m/%d %H:%M" ) {
    let result = format;
    result = result.replace(/%Y/gm, `${this.year()}`);
    result = result.replace(/%y/gm, `${this.year()}`.slice(-2));

    result = result.replace(/%m/gm, `0${this.month()}`.slice(-2));
    result = result.replace(/%-m/gm, `${this.month()}`);

    result = result.replace(/%d/gm, `0${this.date()}`.slice(-2));
    result = result.replace(/%-d/gm, `${this.date()}`);

    result = result.replace(/%H/gm, `0${this.hour()}`.slice(-2));
    result = result.replace(/%-H/gm, `${this.hour()}`);

    result = result.replace(/%M/gm, `0${this.minute()}`.slice(-2));
    result = result.replace(/%-M/gm, `${this.minute()}`);

    result = result.replace(/%S/gm, `0${this.second()}`.slice(-2));
    result = result.replace(/%-S/gm, `${this.second()}`);

    result = result.replace(/%w/gm, `${this.day()}`);

    result = result.replace(/%A\-ja/gm, `${this.dayName(false, "ja")}`);
    result = result.replace(/%A\-en/gm, `${this.dayName(false, "en")}`);
    result = result.replace(/%A/gm, `${this.dayName()}`);

    result = result.replace(/%a\-ja/gm, `${this.dayName(true, "ja")}`);
    result = result.replace(/%a\-en/gm, `${this.dayName(true, "en")}`);
    result = result.replace(/%a/gm, `${this.dayName(true)}`);
    return result;
  }

  toInteger() {
    return this.time();
  }

  isIn( begin, end ) {
    return begin.time() <= this.time() && this.time() <= end.time();
  }

  isInMonthOf( chronus ) {
    return chronus.bom().time() <= this.time() && this.time() <= chronus.eom().time()
  }

  isInDateOf( chronus ) {
    return chronus.bod().time() <= this.time() && this.time() <= chronus.eod().time()
  }
}
