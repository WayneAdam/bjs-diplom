"use strict";
console.log("Start script");

// создает объект класса UserForm
const userFormObject = new UserForm();

/** 
 * Вход 
 */
userFormObject.loginFormCallback = (data) => {
  ApiConnector.login(data, response => {
    // выводит в консоль ответ от сервера
    console.log(response);

    // проверяет успешность запроса
    if(response.success === true) {
      location.reload();
    } else {
      console.log(response.error);
      return alert(response.error);
    };

  });

};

/** 
 * Регистрация
 */
userFormObject.registerFormCallback = (data) => {
  ApiConnector.register(data, response => {
    // выводит в консоль ответ от сервера
    console.log(response);

    // проверяет повторную регистрацию
    if(response.success === false) {
      console.log(response.error);
      return alert(response.error);
    } else {
      location.reload();
    };

  });

};