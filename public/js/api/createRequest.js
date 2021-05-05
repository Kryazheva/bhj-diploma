'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {},) => {
    const callback = f => f;
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.withCredentials = true;
    const formData = new FormData();
    if (options.method) {
        for ( let key in options.data ) { 
            formData.append( `${ key }`, options.data[ key ] ) 
        }
    };
    try {
        xhr.open (options.method, options.url);
        xhr.send( options.method === 'GET' ? null : formData );
    } catch (e) {
        callback (e);
    };
    xhr.onload = () => {
        options.callback(xhr.response);
    };
    xhr.onerror = () => { 
        let err = xhr.status;
        options.callback(err); 
    };
};
