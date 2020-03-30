const request = window.indexedDB.open("budget", 2);
let db;
// Create schema
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const budgetStore = db.createObjectStore("pending", {
        keyPath: "date"
    });
    budgetStore.createIndex("dateIndex", "date", { unique: false });
};

// Opens a transaction, accesses the budget objectStore and statusIndex.
request.onsuccess = (event) => {
    db = event.target.result;
    if (navigator.onLine) {
        checkDataBase();
    }
};

request.onerror = e => {
    console.log("There was an error");
};

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const objectStore = transaction.objectStore("pending");
    console.log("Data: " + JSON.stringify(record));
    // Adds data to our objectStore
    objectStore.add(record);
};

function checkDataBase() {
    const transaction = db.transaction(["pending"], "readwrite");
    transaction.onsuccess = function (event) {
        const result = event.request.result;
        console.log(result);
    };

    transaction.onerror = function (event) {
        console.log(transaction.error);
    };

    const objectStore = transaction.objectStore("pending");
    const objectStoreRequest = objectStore.getAll();

    objectStoreRequest.onsuccess = function () {
        if (objectStoreRequest.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(objectStoreRequest.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(data => {
                if (data.err) {
                    errorEl.textContent = "Missing Information";
                }
                else {
                    clearIndexedDB();
                }
            });
        };
    };
};

function clearIndexedDB() {
    const transaction = db.transaction(["pending"], "readwrite");
    const objectStore = transaction.objectStore("pending");
    const clearStore = objectStore.clear();
    clearStore.onsuccess = function (event) {
        console.log("IndexedDB cleared");
    };
};

window.addEventListener("online", checkDataBase);