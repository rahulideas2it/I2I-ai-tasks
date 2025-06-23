// src/services/userService.ts
interface User {
  username: string;
  password: string;
}

const users: User[] = [];

export const getUserByUsername = async (username: string) => {
  return users.find(user => user.username === username);
};

export const saveUser = async (user: User) => {
  users.push(user);
  return user;
};
