import Vue from 'vue'
import moment from 'moment'

const formats = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD hh:mm:ss',
  'time': 'hh:mm:ss'
}

Vue.filter('moment', function (value, format = 'date') {
  if (!value) { return null }
  const pattern = formats[format]
  return moment(value).format(pattern)
})
