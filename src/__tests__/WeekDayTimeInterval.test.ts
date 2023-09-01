import WeekDayTime from '../WeekDayTime';
import WeekDayTimeInterval from '../WeekDayTimeInterval';


describe('WeekDayTimeInterval', () => {
  // Test toString
  it('should return a valid string representation', () => {
    const startTime = new WeekDayTime(1, 9, 0);
    const endTime = new WeekDayTime(1, 16, 30);
    const interval = new WeekDayTimeInterval(startTime, endTime);
    expect(interval.toString()).toBe('1d09:00-1d16:30');
  });

  // Test fromCSV
  it('should parse CSV string and create WeekDayTimeInterval instances', () => {
    const csvStr = '08:00-12:00,13:30-16:45';
    const intervals = WeekDayTimeInterval.fromCSV(csvStr, 1);
    
    expect(intervals.length).toBe(2);
    expect(intervals[0].toString()).toBe('1d08:00-1d12:00');
    expect(intervals[1].toString()).toBe('1d13:30-1d16:45');
    expect(intervals[0].toTimeString()).toBe('08:00-12:00');
    expect(intervals[1].toTimeString()).toBe('13:30-16:45');
  });

  // Test fromJSONbyDay
  it('should parse JSON string and create WeekDayTimeInterval instances based on day-based intervals', () => {
    const jsonStr = '{"Mon": "08:00-12:00", "Wed": "13:30-16:45"}';
    const intervals = WeekDayTimeInterval.fromJSONbyDay(jsonStr);
    
    expect(intervals.length).toBe(2);
    expect(intervals[0].toTimeString()).toBe('08:00-12:00');
    expect(intervals[1].toTimeString()).toBe('13:30-16:45');
  });

  // Test isWithinAny
  it('should check if a WeekDayTimeInterval is within any of the provided intervals', () => {
    const startTime = new WeekDayTime(1, 9, 0);
    const endTime = new WeekDayTime(1, 16, 30);
    const interval = new WeekDayTimeInterval(startTime, endTime);
    const intervals = [
      new WeekDayTimeInterval(new WeekDayTime(1, 8, 0), new WeekDayTime(1, 17, 0)),
      new WeekDayTimeInterval(new WeekDayTime(2, 10, 0), new WeekDayTime(2, 15, 0)),
    ];

    expect(interval.isWithinAny(intervals)).toBe(true);
  });

  // Test isWithinAny with no matching intervals
  it('should return false if the WeekDayTimeInterval is not within any of the provided intervals', () => {
    const startTime = new WeekDayTime(1, 9, 0);
    const endTime = new WeekDayTime(1, 16, 30);
    const interval = new WeekDayTimeInterval(startTime, endTime);
    const intervals = [
      new WeekDayTimeInterval(new WeekDayTime(2, 8, 0), new WeekDayTime(2, 17, 0)),
      new WeekDayTimeInterval(new WeekDayTime(3, 10, 0), new WeekDayTime(3, 15, 0)),
    ];

    expect(interval.isWithinAny(intervals)).toBe(false);
  });
});
