function fetcher(url = "", data = {}, headers = {}) {
    return new Promise((res, rej) =>{
        fetch(url).then((response) => {
        console.log('hit here', response);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        res(response.json()); // Changed 'response' to 'res'
    }).then(jsonData => { // Changed 'data' to 'jsonData' to avoid shadowing
        return jsonData;
    }).catch(error => {
        console.log('error detected', error);
        rej(error);
    });
})
}

const testUrl = 'https://api.quatschgame.com/getsentence/'
fetcher(testUrl);
export {fetcher}