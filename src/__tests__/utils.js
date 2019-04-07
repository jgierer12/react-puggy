import { partition } from "../utils";

test(`Partition works correctly`, () => {
  expect(partition([1, 2, 3, 4], n => n % 2 === 0)).toEqual([[2, 4], [1, 3]]);
});
