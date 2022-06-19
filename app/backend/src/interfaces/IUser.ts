export default interface IUser {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  },
  token: string;
}
