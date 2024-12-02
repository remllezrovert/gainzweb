const dbName = "LibreGainzIndexedDB";
const storeName = "exerciseData";

// Function to initialize the IndexedDB database
export function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                // Create an object store with a keyPath of "id"
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Function to save data to IndexedDB
export async function saveToIndexedDB(key, data) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        // Ensure data has an 'id' property
        if (!data.id) {
            reject(new Error("Data must have an 'id' property."));
            return;
        }

        // Store the data directly
        store.put(data);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject(event.target.error);
    });
}

// Function to load data from IndexedDB by key
export async function loadFromIndexedDB(key) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = (event) => {
            resolve(event.target.result || null);
        };

        request.onerror = (event) => reject(event.target.error);
    });
}

// Function to delete data from IndexedDB by key
export async function deleteFromIndexedDB(key) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.delete(key);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject(event.target.error);
    });

}

// Function to get all exercises from IndexedDB
export async function getAllExercises() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result || []); // Return all records or an empty array if none exist
        };

        request.onerror = (event) => reject(event.target.error);
    });





}

export async function clearIndexedDB(dbName) {
  const request = indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;
    
    // Loop through all object stores and clear each one
    for (let storeName of db.objectStoreNames) {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      store.clear(); // Clear the object store

      // Handle transaction completion
      transaction.oncomplete = () => {
        console.log(`Object store '${storeName}' cleared.`);
      };

      // Handle transaction error
      transaction.onerror = (event) => {
        console.error(`Error clearing object store '${storeName}':`, event.target.error);
      };
    }
  };

  request.onerror = (event) => {
    console.error("Error opening the database:", event.target.error);
  };

}


