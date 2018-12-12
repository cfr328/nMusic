import React from 'react';
import styles from './Index.scss';

class Index extends React.PureComponent{
  render(){
    return <React.Fragment>
      <div className={styles.top}>
          <span></span>
          <h4>我的音乐</h4>
          <span className={styles.span}></span>
      </div>
      <ul className={styles.box}>
        <li>
          <span></span>
          <h6>本地音乐</h6>
          <p></p>
        </li>
        <li>
          <span></span>
          <h6>最近播放</h6>
          <p></p>
        </li>
        <li>
          <span></span>
          <h6>我的电台</h6>
          <p></p>
        </li>
        <li>
          <span></span>
          <h6>我的收藏</h6>
          <p></p>
        </li>
        <li>
          <span></span>
          <h6>Sati空间</h6>
          <p></p>
        </li>
      </ul>
      <div className={styles.bottom}>
        <h6>我创建的歌单<span>(1)</span></h6>
      </div>
    </React.Fragment>
  }
}

export default Index;
