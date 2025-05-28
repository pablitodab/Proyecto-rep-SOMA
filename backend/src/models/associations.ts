import User from './user';
import Objetivo from './objetivo';
import Diario from './diario';
import Nutricion from './nutricion';
import Rutina from './rutina';

export function setupAssociations() {
  // objetivos
  User.hasMany(Objetivo, { foreignKey: 'userId' });
  Objetivo.belongsTo(User, { foreignKey: 'userId' });
  
  // diario
  User.hasMany(Diario, { foreignKey: 'userId' });
  Diario.belongsTo(User, { foreignKey: 'userId' });

  // nutricion
  User.hasMany(Nutricion, { foreignKey: 'userId' });
  Nutricion.belongsTo(User, { foreignKey: 'userId' });

  // rutina
  User.hasMany(Rutina, { foreignKey: 'userId' });
  Rutina.belongsTo(User, { foreignKey: 'userId' });
}
