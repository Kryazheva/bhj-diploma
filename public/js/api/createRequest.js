'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    // console.log( options );
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.withCredentials = true;
    const formData = new FormData();
    if (options.method === 'POST') {
        for ( let key in options.data ) { 
            formData.append( `${ key }`, options.data[ key ] ) 
        }
    };
    try {
        xhr.open (options.method, options.url);
        xhr.send( options.method === 'GET' ? null : formData );
    } catch (err) {
        callback (err);
    };
    xhr.onload = () => {
        if (xhr.status != 200) {
            options.callback(err, response);
        } else {
            options.callback(null, response);
        } 
    };
    xhr.onerror = () => { 
        console.error('Запрос не удался') 
    };
};
