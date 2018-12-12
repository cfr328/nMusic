import React from 'react';
import dynamic from 'dva/dynamic';

// 引入一级路由
import LoginPage from '../routes/LoginPage'; //登录页
import MainPage from '../routes/MainPage'; //tab+头部
import playPage from '../routes/playPage'; //play页

// 引入二级路由
import DiscoverPage from '../routes/discover/Index'; //发现
import AccountPage from '../routes/account/Index';  //账号
import FriendPage from '../routes/friend/Index'; //朋友
import MyPage from '../routes/my/Index';  //我的
import VideoPage from '../routes/video/Index';
import RecommendPage from '../routes/discover/recommend'; //每日推荐
import SearchPage from '../routes/discover/search'; //搜索

//引入三级路由AccountPage
import PersonalPage from '../routes/discover/person';
import DjPage from '../routes/discover/dj';

export default {
  routes: [{
    path: '/login',
    component: LoginPage
  },{
    path: '/play/:id?',
    component: playPage
  }, {
    path: '/main',  //首页
    component: MainPage,
    children: [{
      path: '/main/discover',  //发现
      component: DiscoverPage,
      children: [{
          path: '/main/discover/personal',
          component: PersonalPage,
        },{
          path: '/main/discover/dj',
          component: DjPage,
        }
      ]
    },{
      path: '/main/friend',  //朋友
      component: FriendPage
    },{
      path: '/main/my',   //我的
      component: MyPage
    },{
      path: '/main/account',  //账号
      component: AccountPage,
    },{
      path: '/main/video',  //视频
      component: VideoPage,
      children: [
        {
          path: '/main/video/tj', //推荐
          component: VideoPage
        }
      ]
    },
    {
      path: '/main/recommend',
      component: RecommendPage
    },{
      path: '/main/search',
      component: SearchPage
    }]
  },{
    path: '/',
    redirect: '/main/discover'
  }]
}
