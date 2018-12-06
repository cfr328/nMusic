import request from '../utils/request';
import axios from 'axios';

export function query() {
  return request('/api/users');
}

export function getBan() { //请求banner轮播图数据
  return axios.get('http://123.206.55.50:14000/banner').then(res => {
    return res.data.banners
  })
}

export function getPerson() { //请求推荐歌单数据
  return axios.get('http://123.206.55.50:14000/personalized').then(res => {
    return res.data.result
  })
}

export function login(parmas) { //请求推荐歌单数据
  return axios.get(`http://123.206.55.50:14000/login/cellphone?phone=${parmas.phone}&password=${parmas.password}`).then(res => {
    return res.data
  })
}

export function getRecommend() { //每日歌单
  return axios.get(`http://123.206.55.50:14000/recommend/resource`).then(res => {
    return res.data
  })
}

export function getSearch(keywords) { //搜索
  return axios.get(`http://123.206.55.50:14000/search?keywords=${keywords}`).then(res => { //result
    return res.data
  })
}

export function getUrl(id) { //获取歌曲播放文件
  return axios.get(`http://123.206.55.50:14000/song/url?id=${id}`).then(res => {
    return res
  })
}

export function getDetail(id) { //获取歌曲播放文件
  return axios.get(`http://123.206.55.50:14000/song/detail?ids=${id}`).then(res => {
    return res
  })
}

export function getLyric(id) { //获取歌曲播放文件
  return axios.get(`http://123.206.55.50:14000/lyric?id=${id}`).then(res => {
    return res
  })
}
//请求接口