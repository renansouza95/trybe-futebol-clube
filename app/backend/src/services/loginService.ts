import * as bcryptjs from 'bcryptjs';
import { generateToken, validateToken } from '../middlewares/jwt/token';
import User from '../database/models/user';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

export default class LoginService {
  public login = async (login: ILogin): Promise<IUser | null> => {
    console.log(login);
    const response = await User.findOne({ where: { email: login.email } });
    if (!response) return null;

    const decrypt = bcryptjs.compareSync(login.password, response.password);
    if (!decrypt) return null;
    const { id, username, role, email } = response;

    const token = generateToken(email);

    return {
      user: { id, username, role, email },
      token,
    };
  };

  public getRole = async (authorization: string): Promise<string | null> => {
    console.log(authorization);
    const { email } = validateToken(authorization);
    console.log(email);
    const response = await User.findOne(({ where: { email } }));
    console.log(response);
    if (!response) return null;
    return response.role;
  };
}
