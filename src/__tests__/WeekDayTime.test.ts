import WeekDayTime from '../WeekDayTime';

describe('WeekDayTime', () => {
  // Test constructor
  it('should create a WeekDayTime instance', () => {
    const time = new WeekDayTime(0, 12, 30);
    expect(time.dd).toBe(0);
    expect(time.hh).toBe(12);
    expect(time.mm).toBe(30);
  });

  it('should throw an error for invalid input values', () => {
    expect(() => new WeekDayTime(-1, 12, 30)).toThrow('Invalid day/time numbers');
    expect(() => new WeekDayTime(0, 24, 30)).toThrow('Invalid day/time numbers');
    expect(() => new WeekDayTime(0, 12, 60)).toThrow('Invalid day/time numbers');
  });

  // Test fromString
  it('should create a WeekDayTime instance from a valid time string', () => {
    const time = WeekDayTime.fromString('1d15:45');
    expect(time.dd).toBe(1);
    expect(time.hh).toBe(15);
    expect(time.mm).toBe(45);
  });

  it('should create a WeekDayTime instance from a valid day-less time string', () => {
    const time = WeekDayTime.fromString('15:45');
    expect(time.dd).toBe(0);
    expect(time.hh).toBe(15);
    expect(time.mm).toBe(45);
  });

  it('should create a WeekDayTime instance from a valid time string with boundary values', () => {
    const time1 = WeekDayTime.fromString('0d00:00');
    expect(time1.dd).toBe(0);
    expect(time1.hh).toBe(0);
    expect(time1.mm).toBe(0);

    const time2 = WeekDayTime.fromString('6d23:59');
    expect(time2.dd).toBe(6);
    expect(time2.hh).toBe(23);
    expect(time2.mm).toBe(59);
  });

  it('should throw an error for an invalid time string', () => {
    expect(() => WeekDayTime.fromString('invalid15:45')).toThrow('Invalid time string');
  });

  // Test toString
  it('should return a valid string representation', () => {
    const time = new WeekDayTime(2, 9, 0);
    expect(time.toString()).toBe('2d09:00');
  });

  it('should create a WeekDayTime instance with valid boundary values', () => {
    const time1 = new WeekDayTime(0, 0, 0);
    expect(time1.dd).toBe(0);
    expect(time1.hh).toBe(0);
    expect(time1.mm).toBe(0);

    const time2 = new WeekDayTime(6, 23, 59);
    expect(time2.dd).toBe(6);
    expect(time2.hh).toBe(23);
    expect(time2.mm).toBe(59);
  });

  // Test toMinutes
  it('should calculate the total number of minutes', () => {
    const time = new WeekDayTime(3, 14, 30);
    expect(time.toMinutes()).toBe(3 * 24 * 60 + 14 * 60 + 30);
  });

  // Test fromMinutes
  it('should create a WeekDayTime instance from total minutes', () => {
    const time = WeekDayTime.fromMinutes(24 * 60 + 60);
    expect(time.dd).toBe(1);
    expect(time.hh).toBe(1);
    expect(time.mm).toBe(0);
  });

  // Test plus
  it('should add two WeekDayTime instances', () => {
    const time1 = new WeekDayTime(0, 10, 30);
    const time2 = new WeekDayTime(1, 4, 45);
    const result = time1.plus(time2);
    expect(result.toString()).toBe('1d15:15');
  });

  // Test minus
  it('should subtract two WeekDayTime instances', () => {
    const time1 = new WeekDayTime(1, 8, 0);
    const time2 = new WeekDayTime(0, 15, 30);
    const result = time1.minus(time2);
    expect(result.toString()).toBe('0d16:30');
  });

  it('should subtract 1 minute from 0 minutes', () => {
    const time1 = new WeekDayTime(0, 0, 0);
    const time2 = new WeekDayTime(0, 0, 1);
    const result = time1.minus(time2);
    expect(result.toString()).toBe('6d23:59');
  });

  // Test gt
  it('should compare two WeekDayTime instances and return true if the first is greater', () => {
    const time1 = new WeekDayTime(3, 10, 0);
    const time2 = new WeekDayTime(1, 15, 30);
    expect(time1.gt(time2)).toBe(true);
  });

  // Test eq
  it('should compare two WeekDayTime instances and return true if they are equal', () => {
    const time1 = new WeekDayTime(2, 12, 15);
    const time2 = new WeekDayTime(2, 12, 15);
    expect(time1.eq(time2)).toBe(true);
  });

  // Test gte
  it('should compare two WeekDayTime instances and return true if the first is greater or equal', () => {
    const time1 = new WeekDayTime(4, 9, 30);
    const time2 = new WeekDayTime(4, 9, 30);
    expect(time1.gte(time2)).toBe(true);
  });

  // Test lte
  it('should compare two WeekDayTime instances and return true if the first is less than or equal', () => {
    const time1 = new WeekDayTime(1, 10, 0);
    const time2 = new WeekDayTime(3, 15, 30);
    expect(time1.lte(time2)).toBe(true);
  });

  // Test lt
  it('should compare two WeekDayTime instances and return true if the first is less than', () => {
    const time1 = new WeekDayTime(0, 12, 0);
    const time2 = new WeekDayTime(2, 8, 45);
    expect(time1.lt(time2)).toBe(true);
  });

  // Test eq (false)
  it('should compare two WeekDayTime instances and return false if they are not equal', () => {
    const time1 = new WeekDayTime(2, 12, 15);
    const time2 = new WeekDayTime(3, 12, 15);
    expect(time1.eq(time2)).toBe(false);
  });

  // Test gte (false)
  it('should compare two WeekDayTime instances and return false if the first is not greater or equal', () => {
    const time1 = new WeekDayTime(4, 9, 30);
    const time2 = new WeekDayTime(5, 9, 30);
    expect(time1.gte(time2)).toBe(false);
  });

  // Test lte (false)
  it('should compare two WeekDayTime instances and return false if the first is not less than or equal', () => {
    const time1 = new WeekDayTime(1, 10, 0);
    const time2 = new WeekDayTime(0, 15, 30);
    expect(time1.lte(time2)).toBe(false);
  });

  // Test lt (false)
  it('should compare two WeekDayTime instances and return false if the first is not less than', () => {
    const time1 = new WeekDayTime(2, 12, 0);
    const time2 = new WeekDayTime(2, 8, 45);
    expect(time1.lt(time2)).toBe(false);
  });

});
