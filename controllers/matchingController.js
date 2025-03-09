const zodiacMatch = new Map([
    [1, [2, 3]],
    [2, [5]],
    [3, [5, 10]],
    [7, [1, 2]]
]);

const matchUser = new Map([
    ['b', 'c']
]);

const match = matchUser.get('a');
console.log(match);

if(match) {
    matchUser.set('a', 'd');
} else {
    matchUser.set('d', '_');
}

console.log(matchUser);
