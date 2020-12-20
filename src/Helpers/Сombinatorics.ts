export const produceCombinations = (arr: Array<any>, limit: number): Array<any[]> => {

  if(arr.length === 0 || limit < 1) {
    return [];
  }

  let combinations = [];
  let total = Math.pow(2, arr.length);

  for (let mask = 0; mask < total; mask++) {

    let set = [];
    let i = arr.length - 1;

    do {
      if ((mask & (1 << i)) !== 0) {
        set.push(arr[i]);
      }
    } while (i--);

    if (set.length == limit) {
      combinations.push(set);
    }
  }

  return combinations;
}
