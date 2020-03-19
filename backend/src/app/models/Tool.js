import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        link: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.TagsTools, {
      foreignKey: 'id',
      targetKey: 'id_tool',
      as: 'tagsTools',
    });
  }
}

export default Tool;
