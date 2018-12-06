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
      <div className={styles.tit}>
        <div className={styles.top}>
          <span></span>
          <input placeholder="猜你喜欢浮生" onClick={() => {this.goSearch()}}/>
          <span className={styles.span}></span>
        </div>
        <div className={styles.head}>
          <p>
            <NavLink to="/main/discover/personal">个性推荐</NavLink>
            <NavLink to="/main/discover/dj">主播电台</NavLink>
          </p>
        </div>
      </div>
     
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
