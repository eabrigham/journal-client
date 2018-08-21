// saves urls for local and heroku apis and gives appropriate one to api
// depending whether client is deployed locally or in production
let apiUrl 

const apiUrls = {
  production: '', // fill in production heroku url
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}