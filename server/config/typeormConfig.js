const path = require('path');

module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "test",
  entities: [
    path.join(__dirname, "../dist/db/entities/**/*{.ts,.js}")
  ],
  synchronize: true
};