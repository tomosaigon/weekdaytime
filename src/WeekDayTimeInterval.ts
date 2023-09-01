import WeekDayTime from './WeekDayTime';

/**
 * Represents a time interval within specific days of the week.
 */
class WeekDayTimeInterval {
  /**
   * Creates a new WeekDayTimeInterval instance.
   *
   * @param {WeekDayTime} a - The starting time of the interval.
   * @param {WeekDayTime} z - The ending time of the interval.
   */
  constructor(public a: WeekDayTime, public z: WeekDayTime) { }

  /**
   * Returns a string representation of the WeekDayTimeInterval.
   *
   * @returns {string} The string representation in "start-end" format, e.g. '0d00:00-6d23:59'.
   */
  toString(): string {
    return `${this.a.toString()}-${this.z.toString()}`;
  }

  /**
   * Returns a day-less string representation of the WeekDayTimeInterval.
   *
   * @returns {string} The day-less string representation in "start-end" format, e.g. '00:00-23:59'.
   */
  toTimeString(): string {
    return `${this.a.toTimeString()}-${this.z.toTimeString()}`;
  }

  /**
   * Parses a CSV string containing time intervals and creates an array of WeekDayTimeInterval instances.
   *
   * @param {string} csvStr - The CSV string containing time intervals.
   * @returns {WeekDayTimeInterval[]} An array of WeekDayTimeInterval instances.
   * @throws {Error} Throws an error if the input format is invalid.
   */
  static fromCSV(csvStr: string, dd = 0): WeekDayTimeInterval[] {
    const intervals: WeekDayTimeInterval[] = [];

    const intervalPairs = csvStr.split(',').map((intervalStr) => intervalStr.split('-'));
    for (const [startStr, endStr] of intervalPairs) {
      const start = WeekDayTime.fromTimeString(startStr, dd);
      const end = WeekDayTime.fromTimeString(endStr, dd);
      intervals.push(new WeekDayTimeInterval(start, end));
    }

    return intervals;
  }

  /**
   * Parses a JSON string and creates an array of WeekDayTimeInterval instances based on day-based intervals.
   *
   * @param {string} jsonStr - The JSON string containing intervals for each day.
   * @returns {WeekDayTimeInterval[]} An array of WeekDayTimeInterval instances.
   * @throws {Error} Throws an error if there's an issue parsing the JSON or if the input format is invalid.
   */
  static fromJSONbyDay(jsonStr: string): WeekDayTimeInterval[] {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const json = JSON.parse(jsonStr);
    const intervals: WeekDayTimeInterval[] = [];

    for (const day in json) {
      const dayIndex = daysOfWeek.indexOf(day.substr(0, 3));
      if (dayIndex === -1) continue;
      intervals.push(...WeekDayTimeInterval.fromCSV(json[day], dayIndex));
    }

    return intervals;
  }

  /**
   * Checks if the WeekDayTimeInterval instance is within any of the provided intervals.
   *
   * @param {WeekDayTimeInterval[]} intervals - An array of WeekDayTimeInterval instances to compare against.
   * @returns {boolean} `true` if the instance is within any of the intervals, otherwise `false`.
   */
  isWithinAny(intervals: WeekDayTimeInterval[]): boolean {
    return intervals.some((i) => this.a.gte(i.a) && this.z.lte(i.z));
  }

}

export default WeekDayTimeInterval;