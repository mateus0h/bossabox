import Sequelize from 'sequelize';

import User from '../app/models/User';
import Tag from '../app/models/Tag';
import Tool from '../app/models/Tool';
import TagsTools from '../app/models/TagsTools';

import databaseConfig from '../config/database';

const models = [User, Tag, Tool, TagsTools];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
