const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
];
const databaseLogin = (username, password) => {
  const user = users.find(
    (user) => user.username === username && user.password === password,
  );
  if (user) {
    return user.username;
  } else {
    return null;
  }
};
const databaseSignup = (username, password) => {
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return null;
  } else {
    users.push({ username, password });
    return databaseLogin(username, password);
  }
};
module.exports = { databaseLogin, databaseSignup };
