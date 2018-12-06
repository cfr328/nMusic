import request from '../utils/request';

export function query() {
  return request('/http://123.206.55.50:14000/banner')
}
