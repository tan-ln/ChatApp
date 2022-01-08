import axios from 'axios'
// json
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}
// formData: application/x-www-form-urlencoded
const postFormData = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

export {
  post,
  get,
  postFormData
}
