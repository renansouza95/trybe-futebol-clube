import { Model, STRING } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public teamName: string;
}

Team.init({
  // ... Campos
  teamName: STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
