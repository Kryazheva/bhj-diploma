'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {},) => {
    // const f = (fn) => {fn};
    const {url, headers, data, responseType, method, callback = (f) => f} = options;
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.withCredentials = true;
    const formData = new FormData();
    
    try {
       
        if (options.method === 'GET') {
            url = options.url + "?";
            xhr.open (options.method, url);
            xhr.send();
        } else {
            for ( let key in options.data ) { 
                formData.append( `${ key }`, `${options.data[ key ]}`);
            }
            xhr.open (options.method, url);
            url = options.url;
            xhr.send(formData);
        };
    } catch (e) {
        new Error ('Catch' + e);
    };

    xhr.onload = () => {
        let responseObj = xhr.response;
        console.log(responseObj)
        options.callback(responseObj)
    };
    xhr.onerror = () => { 
        let err = xhr.statusText;
        options.callback(err)
    };
    return xhr
};
