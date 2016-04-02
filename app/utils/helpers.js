var axios = require('axios')

function getUserRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username  );
}

var helpers = {
  getGithubInfo: function(username) {
    return axios.all([getUserRepos(username),getUserInfo(username)])
      .then(function(arr) {
        return {
          repos: arr[0].data,
          bio: arr[1].data
        }
      });
  }
}


module.exports = helpers;