/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
    console.log( options.data );
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    const formData = new FormData();
    if (options.method === 'POST') {
        for ( let key in options.data ) { 
            formData.append( `${ key }`, options.data[ key ] ) 
        }
    };
    try {
        xhr.open (options.method, options.url, true);
        xhr.withCredentials = true;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback (xhr.response);
            }
        };
        xhr.onerror = function () { 
            console.error('Данные не найдены...') 
        };
        options.method === 'GET' ? xhr.send( JSON.stringify( options.data ) ) : xhr.send( formData );
    } catch (err) {
       callback (err);
    };
};
