const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'https://jomun.onrender.com'
  : 'http://localhost:3003';

const MONGO_URI = process.env.NODE_ENV === 'production'
  ?  process.env.MONGO_PROD_URI
  :  process.env.MONGO_DEV_URI;

module.exports = { PAGE_URL, MONGO_URI };