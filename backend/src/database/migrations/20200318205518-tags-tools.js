module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags_tools', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_tool: {
        type: Sequelize.INTEGER,
        references: { model: 'tools', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      id_tag: {
        type: Sequelize.INTEGER,
        references: { model: 'tags', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tags_tools');
  },
};
