export interface WithdrawalStrategy {
  withdraw(balance: number, amount: number): { newBalance: number; message: string };
}
