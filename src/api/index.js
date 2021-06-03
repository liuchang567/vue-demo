import http from '../utils/http'
function getUserList(data) {
    return http({
      url: '/api/user/list',
      method: 'post',
      data
    })
  }

  export default {
    getUserList
  }
