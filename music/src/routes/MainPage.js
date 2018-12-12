import React from 'react';
import RouterView from '../router/RouterView';
import {NavLink} from 'dva/router';
import styles from './MainPage.scss';

class MainPage extends React.PureComponent{
  goSearch() {
    this.props.history.push('/main/search')
  }
  render(){
    return <React.Fragment>
      <RouterView routes={this.props.routes}></RouterView>
      <footer>
        <NavLink to="/main/discover">
          <p></p>
          <span>发现</span>
        </NavLink>
        <NavLink to="/main/video">
          <p></p>
          <span>视频</span>
        </NavLink>
        <NavLink to="/main/my">
          <p></p>
          <span>我的</span>
        </NavLink>
        <NavLink to="/main/friend">
          <p></p>
          <span>朋友</span>
        </NavLink>
        <NavLink to="/main/account">
          <p></p>
          <span>账号</span>
        </NavLink>
      </footer>
    </React.Fragment>
  }
}

export default MainPage;

//this.props.history.push('/detail/1')
