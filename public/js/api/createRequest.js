'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {},) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.withCredentials = true;
    const formData = new FormData();
    let err = null;
    const callback = options.callback = f => {f};
    
    try {

        if (options.method) {
            for ( let key in options.data ) { 
                formData.append( `${ key }`, `${options.data[ key ]}`);
            }
            xhr.open (options.method, options.url);
            xhr.send(xhr.send(options.method === 'GET' ? null : formData));
        };
    } catch (e) {
        new Error ('Catch' + e);
    };

    xhr.onload = () => {
        let responseObj = xhr.response;
        xhr.status === 200 && xhr.readyState === 4 ? callback(err, responseObj) : callback(xhr.status, err)
    };
    xhr.onerror = () => { 
        options.callback(err)
    };
    return xhr
};
