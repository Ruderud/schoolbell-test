function permutations(arr) {
  if (arr.length === 0) return [[]];

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const restPermutations = permutations(rest);
    for (const perm of restPermutations) {
      result.push([arr[i], ...perm]);
    }
  }

  return result;
}

function maxMuliplied(nums) {
  const permutationsList = permutations(nums);

  let maxMultipliedResult = Number.NEGATIVE_INFINITY;

  for (const perm of permutationsList) {
    for (let i = 0; i < perm.length - 1; i++) {
      const num1 = parseInt(perm.slice(0, i + 1).join(''));
      const num2 = parseInt(perm.slice(i + 1, perm.length).join(''));
      const multipliedResult = num1 * num2;
      maxMultipliedResult = Math.max(maxMultipliedResult, multipliedResult);
    }
  }

  return maxMultipliedResult;
}

/* 입출력 코드 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('배열을 입력하세요. (ex - [1,3,5,7,9]): ', (inputs) => {
  try {
    const parsedInputs = JSON.parse(inputs);
    const result = maxMuliplied(parsedInputs);
    console.log('숫자를 한 번 씩만 사용해서 만든 두 숫자의 곱의 최대값: ', result);
  } catch (error) {
    console.log('잘못된 입력입니다.');
  }

  rl.close();
});
