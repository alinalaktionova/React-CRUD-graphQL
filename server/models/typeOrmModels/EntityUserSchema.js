const { EntitySchema } = require("typeorm");

const UserSchema = new EntitySchema({
  name: "Users",
  columns: {
    id: {
      type: "int",
      unique: true,
      primary: true,
      generated: true,
      nullable: false
    },
    name: {
      type: "varchar",
      nullable: false
    },
    login: {
      type: "varchar",
      unique: true,
      nullable: false
    },
    password: {
      type: "varchar",
      nullable: true
    },
    features: {
      type: "varchar",
      nullable: false,
      array: true
    },
    isActive: {
      type: "boolean",
      nullable: false
    },
    isDeleted: {
      type: "boolean",
      nullable: false
    },
    createdAt: {
      type: "timestamp with time zone",
      nullable: true
    },
    updatedAt: {
      type: "timestamp with time zone",
      nullable: true
    }
  }
});

module.exports = { UserSchema };
