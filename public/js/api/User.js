'use strict';
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.user);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback = f => f) {
    return createRequest({
      url: this.URL + '/current',
      data,
      method: 'GET',
      callback: (response) => {
          if (response && response.user) {
              this.setCurrent(response.user);
          } else {
              this.unsetCurrent();
          }
          callback(err);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    return createRequest({
      url: User.URL + '/register',
      data,
      method: 'POST',
      callback: (response) => {
          if (response.success) {
              this.setCurrent(response.user);
          }
          callback(err);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f = f) {
    return createRequest({
      url: User.URL + '/logout',
      data,
      method: 'POST',
      callback: (response) => {
          if (response.success) {
              this.unsetCurrent(response.user);
          }
          callback(err);
      }
    });
  }
}
