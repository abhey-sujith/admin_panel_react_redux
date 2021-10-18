const isProd = process.env.NODE_ENV === 'production';
let config = {};

const devConfig = {
  API_URL: 'http://127.0.0.1:4000'
};

const prodConfig = {
  API_URL: 'https://ibmbackendapp.herokuapp.com'
};

if (isProd) {
  config = prodConfig;
} else {
  config = devConfig;
}

module.exports = { ...config };
