import React from 'react';
import styles from './Index.scss';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import { Carousel, WingBlank } from 'antd-mobile';
import {NavLink} from 'dva/router';

class Index extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    
  }
  componentWillMount() {
    this.props.dispatch({ //banner
      type: 'examples/getBanner'
    })
    this.props.dispatch({ //banner
      type: 'examples/getPsong'
    })
  }
  render(){
    console.log('props..', this.props);
    let {
      banner,
      Person
    } = this.props;
    console.log(banner, 'banner')
    console.log(Person, '推荐')
    return <React.Fragment>
        <div>
          <div className={styles.swiper}>
          <WingBlank>
            <Carousel
              autoplay={true}
              infinite
              dots={false}
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log()}
            >
              {banner.map(val => (
                <a
                key={val}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                  <img
                    src={val.imageUrl}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                  </a>
              ))}
            </Carousel>
          </WingBlank>
          </div>
          <ul className={styles.icons}>
            <li>
              {/* <NavLink to> */}
                <em>
                  <p></p>
                </em>
              <span>私人FM</span>
              {/* </NavLink> */}
            </li>
            <li>
              <NavLink to={{
                pathname: '/main/recommend',
                state: {a: 1}
              }} replace>
                <em><p></p></em>
                <span>每日推荐</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={{
                  pathname: '/main/search'
                }} replace>
                <em><p></p></em>
                <span>歌单</span>
              </NavLink>
            </li>
            <li>
              <em><p></p></em>
              <span>排行榜</span>
            </li>
          </ul>
        </div>
        <div className={styles.list}>
          <h3>推荐歌单></h3>
          <div className={styles.pics}>
          {
            Person.map((val, index) => {
                return <dl key={index}>
                  <dt>
                    <img src={val.picUrl}/>
                  </dt>
                  <dd>
                    愿你的故事有人能懂
                  </dd>
                </dl>
          })}
            </div>
        </div>
    </React.Fragment>
  }
}

const mapStateToProps = state=>{ //方法
  let {
    banner,
    Person
  } = state.examples;
  return {
    banner,
    Person
  }
}

export default connect(mapStateToProps)(Index);

 //person.map(() => {})
 //person.map(v => ())