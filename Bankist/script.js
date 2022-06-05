'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const arr = ['a', 'b', 'c', 'd', 'e'];

/*
//SLICE Method = Returns new array and does not mutates original array, arr.slice(start, end);

// console.log(arr.slice(2, 3));
// console.log(arr.slice(2, -1));
// console.log(arr.slice(2));
// console.log(arr.slice(-4));
// console.log(arr.slice(-4, 3));

//SPLICE Method = Returns new array and mutates the original array, arr.splice(start, deleteCount, item1, item2, ... , itemN);

// console.log(arr.splice(1, 3));
// console.log(arr);
// console.log(arr.splice(1, 2, 'x'));
// console.log(arr);
// console.log(arr.splice(2, 2, 'y', 'z', 'bye'));
// console.log(arr);

//REVERSE Method = Returns new array and mutates original array, arr.reverse();

// console.log(arr.reverse());
// console.log(arr);

//CONCAT Method = Returns new array and will not modify existing arrays, arr.concat(arr2);

// const arr1 = ['f', 'g', 'h', 'i', 'j'];

// console.log(arr.concat(arr1));
// console.log(arr, arr1);

//JOIN Method = Returns new STRING separated by a specified separator

// console.log(arr1.join('-'));
// console.log(arr1);

// console.log(arr, arr1);

//AT Method

// console.log(arr.at(2));
// console.log(arr.at(-1));

////// Looping Arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i + 1} You deposited ${movement}`);
  } else {
    console.log(`${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}
console.log(`========FOREACH=======`);
movements.forEach(function (movement, i) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
});

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);



// Maps : forEach

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

// Sets : forEach
const set = new Set(['USD', 'INR', 'USD', 'EUR', 'INR', 'EUR']);

console.log(set);
set.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`); // In Sets there are NO KEYS and NO INDEX, hence values repeat
});

*/

// Bankist App

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${movement}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawal = movements.filter(mov => mov < 0);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov, i) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0))
      .join('');
  });
};

createUserName(accounts);

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);

  //Display Balance
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc);
};

// Event Handler

// LOGIN

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Welcome Message
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // To Update UI
    updateUI(currentAccount);
  }
});

// TRANSFER
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc && // check if user exists
    receiverAcc.userName !== currentAccount.userName
  ) {
    //Doing the transfers
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // To Update UI
    updateUI(currentAccount);
  }
  // If benificiary account does not exists
  if (!receiverAcc) {
    alert(`Receiver Account does not exists`);
    inputTransferTo.value = inputTransferAmount.value = '';
  }
  //To alert user if transferring amount to same account
  if (receiverAcc.userName === currentAccount.userName) {
    alert(`WARNING! 
    Depositor Account and Receiver Account cannot be same`);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

// DELETE
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    // Delete Account
    accounts.splice(index, 1);
    alert(`Account deleted successfully`);
    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    alert('Entered user credentials are NOT VALID');
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// console.log(accounts);

/////////////////////////////////
/////////////////////////////////
//
/*
// Coding Challenge #1

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const dogsJuliaCorrected = dogsJulia.slice(1, 3);

// const checkAge = function (dogs) {
//   dogs.forEach(function (dog, i) {
//     let type =
//       dog >= 3
//         ? console.log(`Dog Number ${i + 1} is a adult and is ${dog} years old`)
//         : console.log(`Dog Number ${i + 1} is still a puppy`);
//   });
// };

// checkAge(dogsJuliaCorrected);
// checkAge(dogsKate);

////// Data Transformation : map, filter, reduce

// map - more inline with function programming

const euroToUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUSD;
// });

const movementsUSD = movements.map(mov => mov * euroToUSD);

console.log(movements);
console.log(movementsUSD);

// forOf loop

// const movementsUSDfor = [];

// for (let mov of movements) {
//   movementsUSDfor.push(mov * euroToUSD);
// }

// console.log(movementsUSDfor);

const movementDescriptions = movements.map(function (mov, i, arr) {
  // if (mov > 0) {
  //   return `Movement ${i + 1} You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
  // }

  return `Movement ${
    i + 1
  }: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
});

console.log(movementDescriptions);

// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

const userName = account3.owner.toLowerCase().split(' ');

const uName = userName.map(function (name) {
  return name.charAt(0);
});

// To find maximum value using reduce method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);

////////////////////
// Coding Challenge 2
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age) {
    if (age <= 2) return 2 * age;
    else return 16 + age * 4;
  });

  const adults = humanAge.filter(age => age > 19);
  console.log(adults);

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 10, 6, 5, 6, 1, 4]);

console.log(avg1, avg2);

///////////////
// Coding Challenge 3

const calcAverageHumanAgeNew = ages => {
  const humanAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age > 19)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAge;
};

const avg3 = calcAverageHumanAgeNew([5, 2, 4, 1, 15, 8, 3]);
const avg4 = calcAverageHumanAgeNew([16, 10, 6, 5, 6, 1, 4]);

console.log(avg3, avg4);


/////////////////////////////////
// Creating and Filling Arrays

console.log([1, 2, 3, 4]);
const arrSample = new Array(1, 2, 3, 4);

const x = new Array(7); // it created an empty array of length 7
console.log(x);
console.log(x.map(() => 5)); // it does not fill the x with 5

x.fill(1);
console.log(x);

x.fill(23, 2, 5);
console.log(x);

arrSample.fill(33, 1, 3);
console.log(arrSample);

// FROM

const y = Array.from({ length: 7 }, () => 8);
console.log(y);

const z = Array.from({ length: 8 }, (curr, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(typeof movementsUI2);
});

*/

/////////////////////////

//Array Methods Practice

// 1.

const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0); //accounts.map(acc => acc.movements).flat()

console.log(bankDepositsSum);

// 2.

// const bankDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => {
//     if (cur >= 1000) {
//       acc.push(cur);
//     }
//     return acc;
//   }, []).length;
//.filter(mov => mov >= 1000).length;

// console.log(bankDeposits1000);

// other solution

const bankDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // count++ will not work

console.log(bankDeposits1000);

// pre-fixed ++ operator

// let a = 10;
// console.log(a++);
// console.log(++a);
// console.log(a);

const { deposit, withdraw } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposit += cur) : (sum.withdraw += cur);
      sum[cur > 0 ? 'deposit' : 'withdraw'] += cur;
      return sum;
    },
    { deposit: 0, withdraw: 0 }
  );

console.log(deposit, withdraw);
