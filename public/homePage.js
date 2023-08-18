
/** 
 * Выход из личного кабинета 
 */
// создает объект типа LogoutButton
const logoutButtonObject = new LogoutButton();

// записывает функцию деавторизации в свойство action 
// выходит из учетной записи
logoutButtonObject.action = () => {
  ApiConnector.logout(response => {
    if(response.success === true) {
      location.reload();

    };

  });

};

/**
 * Получение информации о пользователе
 */
const ProfileWidgetObject = new ProfileWidget();

ApiConnector.current((response) => {
  if(response.success === true) {
    // вызывает метод отображения данных профиля
    ProfileWidget.showProfile(response.data);

  };

});

/** 
 * Получение текущих курсов валют
 */
// создает объект класса RatesBoard
const ratesBoardObject = new RatesBoard();

// отправляет запрос получения курсов валют
function getExchangeRates () {
  ApiConnector.getStocks((response) => {
    if(response.success === true) {
      // очищает таблица с данными
      ratesBoardObject.clearTable();
      // заполняет таблицу данными
      ratesBoardObject.fillTable(response.data);

    };

  });

};

getExchangeRates();

// создает интервал для вызова функции
const intervalId = setInterval(() => {
  getExchangeRates();

}, 60000);

/** 
 * Операции с деньгами
 */
// создает объект класса MoneyManager
const moneyManagerObject = new MoneyManager();

// реализация пополнения баланса
moneyManagerObject.addMoneyCallback = function(data) {
  // выполняет запрос на пополнение баланса
  ApiConnector.addMoney(data, (response) => {
    if(response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManagerObject.setMessage(true, "Пополнение счёта выполнено");

    } else {
      moneyManagerObject.setMessage(false, response.error);

    };

  });

};

// реализация конвертирования валют
moneyManagerObject.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, response => { // выполняет запрос на конвертацию баланса
    if(response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManagerObject.setMessage(true, "Конвертация выполнена");

    } else {
      moneyManagerObject.setMessage(false, response.error);
    };

  });

};

// реализация переводов валют
moneyManagerObject.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, response => {
    if(response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManagerObject.setMessage(true, "Перевод средств выполнен");

    } else {
      moneyManagerObject.setMessage(false, response.error);

    };

  });

};

/**
 * Работа с избранными
 */
const favoritesWidget = new FavoritesWidget(); // создает объект типа FavoritesWidget

// запрос начального списка избранного
ApiConnector.getFavorites(response => {
  if(response.success === true) {
    favoritesWidget.clearTable(); // очищает текущий список избранного
    favoritesWidget.fillTable(response.data); // отрисовывает полученные данные
    moneyManagerObject.updateUsersList(response.data); // заполняет выпадающий список для перевода денег

  };

});

// реализация добавления пользователя в список избранных
favoritesWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, response => {
    console.log('Data', data);
    console.log('Response', response);

    if(response.success === true) {
      favoritesWidget.clearTable(); // очищает текущий список избранного
      favoritesWidget.fillTable(response.data); // отрисовывает полученные данные
      moneyManagerObject.updateUsersList(response.data); // заполняет выпадающий список для перевода денег
      favoritesWidget.setMessage(true, 'Добавлен новый пользователь!'); // выводит сообщение об успехе

    } else {
      favoritesWidget.setMessage(false, response.error); // выводит сообщение об ошибке

    };

  });
};

// реализация удаления пользователя из избранного
favoritesWidget.removeUserCallback = function(id) {
  ApiConnector.removeUserFromFavorites(id, response => {
    // console.log('Data ', id);
    // console.log('Response ', response);

    if(response.success === true) {
      favoritesWidget.clearTable(); // очищает текущий список избранного
      favoritesWidget.fillTable(response.data); // отрисовывает полученные данные
      moneyManagerObject.updateUsersList(response.data); // заполняет выпадающий список для перевода денег
      favoritesWidget.setMessage(true, 'Пользователь удален'); // выводит сообщение об успехе
    } else {
      favoritesWidget.setMessage(false, response.error); // выводит сообщение об ошибке
    };

  });

};