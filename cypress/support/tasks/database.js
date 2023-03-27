const { Pool } = require('pg')

const dbConfig = {
    host: 'babar.db.elephantsql.com',
    user: 'bdpejaqr',
    password: '7k96YwNZyNrVHR_3Eo3QJNtPVayuYtBn',
    database: 'bdpejaqr',
    port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
            const pool = new Pool(dbConfig)

            pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
                if (error) {
                    throw error
                }
                resolve({ success: result })
            })
        })
    }
}