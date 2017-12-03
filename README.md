# sequelize-simple-adapter

```
npm install --save git+https://github.com/synle/sequelize-simple-adapter.git

From npm.js
npm install --save sequelize-simple-adapter@1.0.0
```

## Envs
```
export MAIN_DB_HOST='YOUR_MAIN_DB_HOST'
export MAIN_DB_NAME='YOUR_MAIN_DB_NAME'
export MAIN_DB_USER='YOUR_MAIN_DB_USER'
export MAIN_DB_PASSWORD='YOUR_MAIN_DB_PASSWORD'
```


## How to use
### Include it
```
const Table = require('sequelize-simple-adapter');
```



### Create DB Adapter
```
// if there is a db connection, then use it...
const sequelize = !!process.env.MAIN_DB_HOST
    ? new Sequelize(
        process.env.MAIN_DB_NAME,
        process.env.MAIN_DB_USER,
        process.env.MAIN_DB_PASSWORD,
        {
            host: process.env.MAIN_DB_HOST,
            dialect: 'mssql',
            logging: false,
            pool: {
                max: 5,
                min: 0,
            },
            dialectOptions: {
                encrypt: true
            },
        }
    )
    : new Sequelize(
        'db_user', // 'database',
        '', // 'username',
        '', // 'password',
        {
            dialect: 'sqlite',
            storage: './db.sqlite3',
            logging: false
        }
    );
```




### Sync it
```
// might only need to run for init call...
const promiseSequelizeInit = sequelize.sync().then(function (argument) {
    // TODO: remove this log line...
    console.log('Database...synced... read to use', process.env.MAIN_DB_HOST);
});
```




### DB Schema
```
const User = sequelize.define('parking_users', {
    id               : { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV1, primaryKey: true },
    email            : { type: Sequelize.STRING },
    password         : { type: Sequelize.STRING },
    firstName        : { type: Sequelize.STRING },
    lastName         : { type: Sequelize.STRING },
});
```







### Export
```
User        : new Table(User, promiseSequelizeInit),
```
