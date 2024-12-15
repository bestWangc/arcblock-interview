// user.js


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

async function getUserById(uid) {
    try {
        const user = await queryDatabase('SELECT id,username,email,phone FROM users WHERE id = ?', [uid]);
        return user || null;
    } catch (err) {
        console.error('Error getting user:', err);
        throw err;
    }
}

async function updateUserById(uid, name, email, phone) {
    try {
        await updateDatabase('UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, uid]);
        return true;
    } catch (err) {
        console.error('Error getting user:', err);
        // throw err;
        return false;
    }
}

function queryDatabase(query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

function updateDatabase(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

module.exports = { getUserById, updateUserById };