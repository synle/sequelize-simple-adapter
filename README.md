# sequelize-simple-adapter

```
npm install --save git+https://github.com/synle/sequelize-simple-adapter.git
```


How to use
```
const Table = require('sequelize-simple-adapter');
```


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


```
// might only need to run for init call...
const promiseSequelizeInit = sequelize.sync().then(function (argument) {
    // TODO: remove this log line...
    console.log('Database...synced... read to use', process.env.MAIN_DB_HOST);
});
```


```
const User = sequelize.define('parking_users', {
    id               : { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV1, primaryKey: true },
    email            : { type: Sequelize.STRING },
    password         : { type: Sequelize.STRING },
    firstName        : { type: Sequelize.STRING },
    lastName         : { type: Sequelize.STRING },
});
```






```
User        : new Table(User, promiseSequelizeInit),
```
