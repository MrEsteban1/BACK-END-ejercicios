const mariaDB = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ibizadeco'
    }
}

const sqlite = {
    client: "sqlite3",
    connection: {
        filename: "../DB/ibizadeco.sqlite"
    },
    useNullAsDefault: true,
}

module.exports = {
    mariaDB,
    sqlite
}