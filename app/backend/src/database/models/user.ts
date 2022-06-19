import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  // ... Campos
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
