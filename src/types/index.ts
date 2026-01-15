export interface User {
  id: number;
  email: string;
  password: string;
}
export interface Expense {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  created_at: Date;
}
