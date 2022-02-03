export function chunk(inputArray: any, perChunk: number) {
  var i,
    j,
    result = [];
  for (i = 0, j = inputArray.length; i < j; i += perChunk) {
    result.push(inputArray.slice(i, i + perChunk));
  }
  return result;
}
