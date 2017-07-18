import processResponseFromSony from './processResponse';


function findAllGames() {
    return new Promise((resolve, reject) => {
        const request = new Request('/games/find/all');
        fetch(request, {
            method: 'GET'
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function findOneGame(url) {
    return new Promise((resolve, reject) => {
        const request = new Request(`/games/find/one/?url=${encodeURIComponent(url)}`);
        fetch(request, {
            method: 'GET'
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function findGameFromSony(storeCode) {
    return new Promise((resolve, reject) => {
        const request = new Request(`https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${storeCode}`);
        fetch(request, { method: 'GET' })
            .then(response => processResponseFromSony(response))
            .then(response => {
                addOrUpdateGame(response);
                resolve(response);
            }).catch(err => {
                reject(err);
            });
    });
}

function addOrUpdateGame(gameInfo) {
    return new Promise((resolve, reject) => {
        const request = new Request('/games/add', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify(gameInfo)
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function createPriceAlert(priceAlertInfo) {
    return new Promise((resolve, reject) => {
        const request = new Request('/priceAlerts/add', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify(priceAlertInfo)
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function findOnePriceAlert(id) {
    return new Promise((resolve, reject) => {
        console.log(id);
        const request = new Request('/priceAlerts/find/one', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ id: id })
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function deletePriceAlert(userInfo) {
    return new Promise((resolve, reject) => {
        const request = new Request('/priceAlerts/delete', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'DELETE',
            body: JSON.stringify(userInfo)
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function checkBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const request = new Request('/blacklist/find/one', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ userEmail: userEmail })
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function addToBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const request = new Request('/blacklist/add', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'PUT',
            body: JSON.stringify({ userEmail: userEmail })
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function handleResponse(response, resolve, reject) {
    if (!response.ok) {
        console.error(new Error(response));
        reject(response);
    }
    response.json().then(response => {
        console.log(response.api);
        resolve(response.api);
    });
}


const Client = {
    findAllGames,
    findOneGame,
    findGameFromSony,
    createPriceAlert,
    findOnePriceAlert,
    deletePriceAlert,
    checkBlacklist,
    addToBlacklist,
};
export default Client;
