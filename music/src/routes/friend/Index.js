import React from 'react';
import styles from './Index.scss';
import {NavLink} from 'dva/router';

class Index extends React.PureComponent{
  render(){
    return <React.Fragment>
        <div className={styles.top}>
            <em></em>
            <h4><span>动态</span><span>附近</span></h4>
            <em className={styles.span}></em>
        </div>
        <div className={styles.head}>
            <p>
              <NavLink to={{
                  pathname: ''
                }} replace>发动态</NavLink>
              <NavLink to={{
                  pathname: ''
                }} replace>发布视频</NavLink>
            </p>
        </div>
      </React.Fragment>
  }
}

export default Index;
