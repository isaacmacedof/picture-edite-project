import { allConts } from "./acconts";

const USER_KEY = 'user';
const TIMEOUT = 100;
const SUCCESS_STATUS = 'OK';

export const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

export const insertUser = (user) => new Promise((resolve) => {
  allConts.push(user);
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    name: '',
    password: '',
    nameReal: '',
    telefone: '',
    email: '',
    image: '',
    unidade: '',
    segurity: 2,
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
