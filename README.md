# WeekDayTime

Represent a repeating set of time intervals (00:00-23:59) during the week from a JSON string containing days of the week and corresponding time intervals separated by commas. Transform this input into a structured array representing weekday times in a normalized format. Then enable addition and comparison of time intervals and check overlapping periods.

## Examples

```
const time = new WeekDayTime(0, 12, 30);

const time = WeekDayTime.fromString('1d15:45');

const time = WeekDayTime.fromString('15:45');

const time = WeekDayTime.fromMinutes(24 * 60 + 60);
time.toMinutes();

const time1 = new WeekDayTime(0, 10, 30);
const time2 = new WeekDayTime(1, 4, 45);
time1.plus(time2);
time1.eq(time2);
time1.gte(time2);
time1.lte(time2);
time1.gt(time2);
time1.lt(time2);

const jsonStr = '{"Mon": "08:00-12:00", "Wed": "13:30-16:45"}';
const intervals = WeekDayTimeInterval.fromJSONbyDay(jsonStr);
```
