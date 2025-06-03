import User from './user';
import Objetivo from './objetivo';
import Diario from './diario';
import Nutricion from './nutricion';
import Rutina from './rutina';

export function setupAssociations() {
  // User -> Objetivos (1:N)
  User.hasMany(Objetivo, { foreignKey: 'userId' });
  Objetivo.belongsTo(User, { foreignKey: 'userId' });

  // User -> Diario (1:N)
  User.hasMany(Diario, { foreignKey: 'userId' });
  Diario.belongsTo(User, { foreignKey: 'userId' });

  // User -> Nutricion (1:N)
  User.hasMany(Nutricion, { foreignKey: 'userId' });
  Nutricion.belongsTo(User, { foreignKey: 'userId' });

  // User -> Rutina (1:N)
  User.hasMany(Rutina, { foreignKey: 'userId' });
  Rutina.belongsTo(User, { foreignKey: 'userId' });
}
