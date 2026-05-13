const dbName = 'WeatherDB';
const storeName = 'assets';

const getDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

const saveFile = async (key, url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const db = await getDB();

        const transaction = db.transaction(storeName, 'readwrite');
        transaction.objectStore(storeName).put(blob, key);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        })

    } catch (error) {
        console.error('Error of file saving: ', error);
    }
}

const getFileURL = async (key) => {
    const db = await getDB();

    return new Promise((resolve) => {
        const transaction = db.transaction(storeName, 'readonly');
        const req = transaction.objectStore(storeName).get(key);

        req.onsuccess = () => {
            if (!req.result) return resolve(null);
            resolve(URL.createObjectURL(req.result));
        }
    })
}

const initAssets = async () => {
    // No internet connection assets
    await saveFile('no_internet_icon', 'assets/icons/app-state/no-internet.svg');
    await saveFile('no_internet_bg', 'assets/images/background/app-state/no-internet.jpg');
}


export {
    getDB,
    saveFile,
    getFileURL,
    initAssets,
}