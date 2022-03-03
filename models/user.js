'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Student, {
            as:'student',
            foreignKey: 'user_id'
          }
      );
      User.hasOne(models.Staff, {
            as: 'staff',
            foreignKey: 'user_id'
          }
      )
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    displayName: {
      type:DataTypes.VIRTUAL,
      get(){
        if (this.student){
          return this.student.first_name;
        };
        return this.staff.first_name;
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps:false,
    tableName: 'student_courses_users'
  });
  return User;
};