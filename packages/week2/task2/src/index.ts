import { Account } from './account';
import { SavingsWithdrawal, CheckingWithdrawal, CryptoWithdrawal } from './strategies';

const savings = new Account(1500, new SavingsWithdrawal());
console.log(savings.withdraw(1200));

const checking = new Account(500, new CheckingWithdrawal());
console.log(checking.withdraw(900));

const crypto = new Account(2000, new CryptoWithdrawal());
console.log(crypto.withdraw(100));
