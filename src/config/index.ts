/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  student_default_pass: process.env.STUDENT_DEFAULT_PASS,
  faculty_default_pass: process.env.FACULTY_DEFAULT_PASS,
  admin_default_pass: process.env.ADMIN_DEFAULT_PASS,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret_token: process.env.SECRET_TOKEN,
    expire_in: process.env.EXPIRE_IN,
    refresh_token: process.env.REFRESH_SECRET_TOKEN,
    refresh_expire_in: process.env.REFRESH_EXPIRE_IN,
  },
}
