import mysql from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config()
// used mysql2 instead of mysql as there was some connection error related to password
// console.log(process.env.USERNAME)
export const mydb=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USERNAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
