import { getExcludedTimes } from "./Calendar";

const timeDataConvert = [
  new Date(1638597600000), // 2021/12/04 Sat 14:00
  new Date(1640491200000), // 2021/12/26 Sun 12:00
  new Date(1641286800000), // 2022/01/04 Tue 17:00
];
const reservationTimeDataConvert = [
  new Date(1638615600000), // 2021/12/04 Sat 19:00
  new Date(1639800000000), // 2021/12/18 Sat 12:00
];

describe("getExcludedTimes", () => {
  it("should return the date(s) on January 4th", () => {
    const date = new Date(1641279600000); // 2022/01/04 15:00
    expect(
      getExcludedTimes(date, timeDataConvert, reservationTimeDataConvert)
    ).toEqual([new Date(1641286800000)]);
  });

  it("should return the date(s) on December 4th", () => {
    const date = new Date(1638547200000); // 2021/12/04 Sat 00:00
    expect(
      getExcludedTimes(date, timeDataConvert, reservationTimeDataConvert)
    ).toEqual([new Date(1638597600000), new Date(1638615600000)]);
  });
});
