import Sequelize, { Model } from 'sequelize';

class TagsTools extends Model {
  static init(sequelize) {
    super.init(
      {
        id_tool: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Tool, {
      foreignKey: 'id_tool',
      as: 'tools',
    });

    this.belongsTo(models.Tag, {
      foreignKey: 'id_tag',
      as: 'tags',
    });
  }
}

export default TagsTools;
