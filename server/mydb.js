import mysql from 'mysql2'
// used mysql2 instead of mysql as there was some connection error related to password
export const mydb=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manu.mwr.m200201',
    database:'blog'
})