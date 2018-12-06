import {getBan, getPerson, login, getRecommend, getSearch} from '../services/example'; //请求接口方法引入，接收返回的数据
import {getToken, setToken} from '../utils/user';
import {routerRedux} from 'dva/router'

export default {

  namespace: 'examples',

  state: {
    banner: [],
    Person: [],
    songs: [],
    songCount: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname}) => {
        // if (pathname !== '/login') {
        //   if(!getToken()) {
        //     dispatch(routerRedux.replace({ //跳转登录页
        //       pathname: '/login'
        //     }))
        //   }
        // }
      })
    },
  },

  //获取数据方法
  effects: { //call(getBan) 
    * login(action, {call, put}) { //login
      let res = yield call(login, action.payload)
      setToken(res.data.account.id)
      yield put({
        type: 'loginList',
        payload: res.data
      })
      yield put(routerRedux.replace({
        pathname: '/'
      }))
    },
    * getBanner(action, {call, put}) { //轮播图
        // let res = yield call(() => {
        //   return fetch(`http://123.206.55.50:14000/banner`)
        //   .then(res=>res.json())
        //   .then(body=>body)
        // })
        let res = yield call(getBan)
        console.log(res, 'ban')
        yield put({
          type: 'banList',
          payload: res
        })
    },
    * getPsong(action, {call, put}) { //推荐歌单
      let res = yield call(getPerson)
      console.log(res, 'person...')
      yield put({
        type: 'PersonList',
        payload: res
      })
    },
    * getRecommend(action, {call, put}) { //每日歌单
        let res = yield call(getRecommend) 
        console.log('getRecommend...', res)
    },
    * getSearch(action, {call, put}) { //搜索歌曲
        let res = yield call(getSearch, action.payload) 
        console.log('getSearch...', res)
        yield put({
          type: 'searchList',
          payload: res.result
        })
    }
  },

  reducers: { //数据存储
    banList(state, action){ //banner轮播
      return {...state, banner: action.payload}
    },
    PersonList(state, action){ //推荐歌单
      return {...state, Person: action.payload}
    },
    loginList(state, action){
      return {...state, ...action.payload}
    },
    searchList(state, action){
      return {...state, ...action.payload}
    }
  }

};
