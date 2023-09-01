/**
 * Represents a time on a day of the week. E.g. '6d23:59' is `{ dd }d{ hh }:{ mm }` is `{ dd: 6, hh: 23, mm: 59 }`.
 */
class WeekDayTime {
  /**
   * Creates a new WeekDayTime instance.
   *
   * @param {number} dd - The day of the week (0 to 6, where 0 is Monday and 6 is Sunday).
   * @param {number} hh - The hour of the day (0 to 23).
   * @param {number} [mm] - The minute of the hour (0 to 59, optional).
   * @throws {Error} Throws an error if any of the values are out of range.
   */
  constructor(public dd: number, public hh: number, public mm: number = 0) {
    if (dd < 0 || dd > 6 || hh < 0 || hh > 23 || mm < 0 || mm > 59) {
      throw new Error("Invalid day/time numbers");
    }
  }

  /**
   * Creates a WeekDayTime instance from a string representation.
   *
   * @param {string} timeStr - The time string in `{ dd }d{ hh }:{ mm }`, HH:mm, or HH format.
   * @returns {WeekDayTime} A new WeekDayTime instance.
   * @throws {Error} Throws an error if the time format is invalid.
   */
  static fromString(timeStr: string): WeekDayTime {
    const regex = /^(?:([0-6])d)?([01]?[0-9]|2[0-3])(:([0-5][0-9]))?$/;
    const match = regex.exec(timeStr);
    if (!match) {
      throw new Error("Invalid time string for " + regex);
    }

    const dd = match[1] !== undefined ? Number(match[1]) : 0;
    const hh = Number(match[2]);
    const mm = match[3] !== undefined ? Number(match[4]) : 0;

    return new WeekDayTime(dd, hh, mm);
  }

  /**
   * Creates a WeekDayTime instance from a string representation.
   *
   * @param {string} timeStr - The time string in HH:mm, or HH format.
   * @param {number} [dd=0] - The day of the week (0 to 6, where 0 is Monday and 6 is Sunday, optional).
   * @returns {WeekDayTime} A new WeekDayTime instance.
   * @throws {Error} Throws an error if the time format is invalid.
   */
  static fromTimeString(timeStr: string, dd = 0): WeekDayTime {
    return WeekDayTime.fromString('' + dd + 'd' + timeStr);
  }

  /**
   * Returns a string representation of the WeekDayTime.
   *
   * @returns {string} The string representation in d + 'd' + HH:mm format, e.g. '0d00:00' or '6d23:59'.
   */
  toString(): string {
    return `${this.dd.toString()}d${this.toTimeString()}`;
  }

  /**
   * Returns a string representation of the WeekDayTime in HH:mm format.
   *
   * @returns {string} The string representation in HH:mm format, e.g., '00:00' or '23:59'.
   */
  toTimeString(): string {
    return `${this.hh.toString().padStart(2, '0')}:${this.mm.toString().padStart(2, '0')}`;
  }

  /**
   * Calculates the total number of minutes represented by this WeekDayTime instance.
   *
   * @returns {number} The total number of minutes.
   */
  toMinutes(): number {
    return (this.dd * 24 * 60) + (this.hh * 60) + this.mm;
  }

  /**
   * Creates a WeekDayTime instance from a total number of minutes.
   *
   * @param {number} totalMinutes - The total number of minutes.
   * @returns {WeekDayTime} A new WeekDayTime instance.
   */
  static fromMinutes(totalMinutes: number): WeekDayTime {
    const mm = totalMinutes % 60;
    const hh = Math.floor(totalMinutes / 60) % 24;
    const dd = Math.floor(totalMinutes / (60 * 24));

    return new WeekDayTime(dd, hh, mm);
  }

  /**
   * "+" operator. Adds the time of another WeekDayTime to this instance.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to add.
   * @returns {WeekDayTime} A new WeekDayTime instance representing the sum modulo 1 week.
   */
  plus(other: WeekDayTime): WeekDayTime {
    const totalMinutes = (this.toMinutes() + other.toMinutes() + 7 * 24 * 60) % (7 * 24 * 60);
    return WeekDayTime.fromMinutes(totalMinutes);
  }

  /**
   * "-" operator. Subtracts the time of another WeekDayTime from this instance.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to subtract.
   * @returns {WeekDayTime} A new WeekDayTime instance representing the difference modulo 1 week.
   */
  minus(other: WeekDayTime): WeekDayTime {
    const totalMinutes = (this.toMinutes() - other.toMinutes() + 7 * 24 * 60) % (7 * 24 * 60);
    return WeekDayTime.fromMinutes(totalMinutes);
  }

  /**
   * ">" operator. Checks if this WeekDayTime instance is greater than another WeekDayTime.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to compare.
   * @returns {boolean} `true` if this instance is greater than (after) the other.
   */
  gt(other: WeekDayTime): boolean {
    if (this.dd > other.dd) return true;
    if (this.dd < other.dd) return false;

    // Days are equal, check hours
    if (this.hh > other.hh) return true;
    if (this.hh < other.hh) return false;

    // Days and hours are equal, check minutes
    return this.mm > other.mm;
  }

  /**
   * "==" operator. Checks if this WeekDayTime instance is equal to another WeekDayTime.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to compare.
   * @returns {boolean} `true` if all fields are equal.
   */
  eq(other: WeekDayTime): boolean {
    return this.dd === other.dd && this.hh === other.hh && this.mm === other.mm;
  }

  /**
   * ">=" operator. Checks if this WeekDayTime instance is greater than or equal to another WeekDayTime.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to compare.
   * @returns {boolean} `true` if this instance is greater than (after) or equal to the other.
   */
  gte(other: WeekDayTime): boolean {
    return this.gt(other) || this.eq(other);
  }

  /**
   * "<=" operator. Checks if this time is less than or equal to another WeekDayTime. Assumes that values do not overflow or underflow.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to compare.
   * @returns {boolean} `true` if this time is less than (before) or equal to the other.
   */
  lte(other: WeekDayTime): boolean {
    return !this.gt(other);
  }

  /**
   * "<" operator. Checks if this time is less than another WeekDayTime. Assumes that values do not overflow or underflow.
   *
   * @param {WeekDayTime} other - The other WeekDayTime to compare.
   * @returns {boolean} `true` if this time is less than (before) the other.
   */
  lt(other: WeekDayTime): boolean {
    return !this.gt(other) && !this.eq(other);
  }
}

export default WeekDayTime;