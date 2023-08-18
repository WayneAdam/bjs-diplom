"use strict";
// создает объект класса UserForm
const userFormObject = new UserForm();

/** 
 * Вход 
 */
userFormObject.loginFormCallback = function(data) {
  ApiConnector.login(data, (response) => {
    console.log(response); // проверяет какой объект возвращает сервер
    // проверяет успешность запроса
    if(response.success === true) {
      location.reload();
      
    } else {
      userFormObject.setLoginErrorMessage(response.error);

    };

  });

};

/** 
 * Регистрация
 */
userFormObject.registerFormCallback = function(data) {
  ApiConnector.register(data, (response) => {
    // проверяет повторную регистрацию
    if(response.success === false) {
      userFormObject.setRegisterErrorMessage(response.error);

    } else {
      location.reload();

    };

  });

};