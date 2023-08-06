
/** 
 * Выход из личного кабинета 
 */
// создает объект типа LogoutButton
const LogoutButtonObject = new LogoutButton();

// записывает функцию деавторизации в свойство action 
// выходит из учетной записи
LogoutButtonObject.action = () => {
  ApiConnector.logout(response => {
    if(response.success === true) {
      location.reload();

    };

  });

};

/**
 * Получение информации о пользователе
 */
ApiConnector.current((response) => {
  if(response.success === true) {
    // вызывает метод отображения данных профиля
    ProfileWidget.showProfile(response);

  };

});

/** 
 * Получение текущих курсов валют
 */
// создает объект класса RatesBoard
const RatesBoardObject = new RatesBoard();

// отправляет запрос получения курсов валют
function getExchangeRates () {
  ApiConnector.getStocks((response) => {
    if(response.success === true) {
      // очищает таблица с данными
      RatesBoardObject.clearTable();
      // заполняет таблицу данными
      RatesBoardObject.fillTable(response.data);

    };

  });

};

getExchangeRates();

// создает интервал для вызова функции
const intervalId = setInterval(() => {
  console.log("Обновили курс валют");
  getExchangeRates();
}, 60000);

/** 
 * Операции с деньгами
 */
// создает объект класса MoneyManager
const MoneyManagerObject = new MoneyManager();

// реализация пополнения баланса
MoneyManagerObject.addMoneyCallback = (data) => {
  // выполняет запрос на пополнение баланса
  ApiConnector.addMoney(data, () => {
    if(data.success === true) {
      const ProfileWidgetObject = new ProfileWidget();
      const MoneyManagerObject = new MoneyManager();

      ProfileWidgetObject.showProfile(data);
      console.log(data);
      MoneyManagerObject.setMessage(true, "Успех!");

    } else {
      MoneyManagerObject.setMessage(false, data.error);
      console.log(data);

    };

  });

};