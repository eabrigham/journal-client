// saves urls for local and heroku apis and gives appropriate one to api
// depending whether client is deployed locally or in production
let apiUrl 

const apiUrls = {
  production: 'https://nameless-thicket-47979.herokuapp.com',
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