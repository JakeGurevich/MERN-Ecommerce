const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: true,
  },
  {
    name: "Jack Back",
    email: "jack@example.com",
    password: bcrypt.hashSync("12345", 8),
  },
  {
    name: "Big jan",
    email: "jan @example.com",
    password: bcrypt.hashSync("12345", 8),
  },
  {
    name: "Petro Korol",
    email: "gg@example.com",
    password: bcrypt.hashSync("12345", 8),
  },
];
module.exports = users;
