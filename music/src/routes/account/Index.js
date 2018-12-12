import React from 'react';
import styles from './Index.scss';

class Index extends React.PureComponent{
  render(){
    return <React.Fragment>
        <div className={styles.top}>
            <em></em>
            <h4>账号</h4>
            <em className={styles.span}></em>
        </div>
        <div className={styles.cont}>
            <div className={styles.head}>
              <div><i></i><span>小如艺</span></div><em>签到</em>
            </div>
            <div>
              <ul className={styles.tit}>
                <li>
                  <span>动态</span>
                  <h6>1</h6>
                </li>
                <li>
                  <span>关注</span>
                  <h6>3</h6>
                </li>
                <li>
                  <span>粉丝</span>
                  <h6>1</h6>
                </li>
                <li>
                  <span>动态</span>
                  <h6>我的资料</h6>
                </li>
              </ul>
              <h5>
                <i></i>
                <span>我的消息</span>
              </h5>
              <ol className={styles.box1}>
                <li>
                  <i></i>
                  <span>会员中心</span>
                </li>
                <li>
                  <i></i>
                  <span>商城</span>
                </li>
                <li>
                  <i></i>
                  <span>游戏推荐：明日之后</span>
                </li>
                <li>
                  <i></i>
                  <span>在线听歌免流量</span>
                </li>
              </ol>
              <ol className={styles.box2}>
                <li>
                  <i></i>
                  <span>设置</span>
                </li>
                <li>
                  <i></i>
                  <span>扫一扫</span>
                </li>
                <li>
                  <i></i>
                  <span>个性换肤</span>
                </li>
                <li>
                  <i></i>
                  <span>夜间模式</span>
                </li>
                <li>
                  <i></i>
                  <span>个性换肤</span>
                </li>
                <li>
                  <i></i>
                  <span>夜间模式</span>
                </li>
                <li>
                  <i></i>
                  <span>个性换肤</span>
                </li>
                <li>
                  <i></i>
                  <span>夜间模式</span>
                </li>
              </ol>
            </div>
        </div>
      </React.Fragment>
  }
}

export default Index;
