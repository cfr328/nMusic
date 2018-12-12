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

export function getDetail(id) { //获取歌曲详情
  return axios.get(`http://123.206.55.50:14000/song/detail?ids=${id}`).then(res => {
    return res
  })
}

export function getLyric(id) { //获取歌词
  return axios.get(`http://123.206.55.50:14000/lyric?id=${id}`).then(res => {
    return res
  })
}

export function get(id) { //获取
  return axios.get(`http://123.206.55.50:14000/related/allvideo?id=${id}`).then(res => {
    return res
  })
}

export function getVideo() { //获取视频
  return axios.get(`http://123.206.55.50:14000/top/mv?limit=10`).then(res => {
    return res.data
  })
}
//请求接口

// /personal_fm私人fm
// /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D 相关视频
// /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D  获取视频数据
//  /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D  视频详情
//  /top/list?idx=6 排行榜
// top/mv?limit=10