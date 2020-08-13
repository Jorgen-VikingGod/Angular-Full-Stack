export class User {
  id: string;
  username: string;
  password?: string;
  role: 'user' | 'admin';
  token?: string;
}
