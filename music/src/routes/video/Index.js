import React from 'react';
import {connect} from 'dva';
import {NavLink} from 'dva/router';
import styles from './Index.scss';

@connect(({examples}) => {
  return examples  //return的文件    
}, dispatch=> {
  return {
    getVideo: payload=>{
      dispatch({
        type: 'examples/getVideo',
        payload
      })
    }
  }
})

class Index extends React.PureComponent{
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {  
    this.props.getVideo() 
  }
  goSearch() {
    this.props.history.push('/main/search')
  }
  render(){
    let {
      videoList
    } = this.props;
    console.log(this.props, 'videoList...')
    console.log(videoList, 'videoList2222222......')
    return <React.Fragment>
        <div className={styles.tit}>
          <div className={styles.top}>
            <span></span>
            <input placeholder="猜你喜欢浮生" onClick={() => {this.goSearch()}}/>
            <span className={styles.span}></span>
          </div>
          <div className={styles.head}>
            <p>
              <NavLink to={{
                  pathname: '/main/video/tj'
                }} replace>推荐</NavLink>
              <NavLink to="/">Look直播</NavLink>
              <NavLink to="/">现场</NavLink>
              <NavLink to="/">求佛</NavLink>
              <NavLink to="/">翻唱</NavLink>
              <NavLink to="/">翻唱</NavLink>
            </p>
          </div>
        </div>
        <div className={styles.context}>
            <ul className={styles.pics}>
              { 
                videoList.map((v, index) => {
                  return <li key={index}>
                    <img src={v.cover}></img>
                    <h6>{v.name}</h6>
                  </li>
                })
              }
            </ul>
        </div>
      </React.Fragment>
  }
}

export default Index;
