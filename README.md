# Budget Tracker 📈
This PWA application allow user to enter transactions to their budget with or without Internet connection, and it also provide a graph on the budget trend. 

Deployed Link: https://agile-fortress-96618.herokuapp.com/

## Description
This application is a PWA, which can be install on the smart phone, and it also can be used when the user is online or offline.

### - Online
When user is online, when the trasaction has been made, the information will be post to below route and store in the MongoDB. Also the graph will show the deposits and expenses on daily basis.
```
/api/transaction
```

### - Offline
When usee is offline, the application is still running as when its online, user can input transactions and will display on the graph. But when its offline, all the transactions will be posted to below route and temporarily store in the IndexedDB, until the user is back online, the information will be stored in the MongoDB.
```
/api/transaction/bulk
```

## Acknowledge
- Manifest.webmanifest
- Servise-worker.js
- Node.js
- Express.js
- MongoDB
- Heroku
- IndexedD
