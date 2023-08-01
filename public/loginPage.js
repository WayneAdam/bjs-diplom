"use strict";
console.log("Start script");

// создает объект класса UserForm
const userFormObject = new UserForm();
// присваивает свойству loginFormCallback объекта userFormObject значение функции
userFormObject.loginFormCallback = (data) => {
  const request = fetch();
};