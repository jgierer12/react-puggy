export const partition = (arr, pre) =>
  arr.reduce(
    ([pass, fail], val) =>
      pre(val) ? [[...pass, val], fail] : [pass, [...fail, val]],
    [[], []]
  );
