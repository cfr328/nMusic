import React from 'react';
import {connect} from 'dva';
import styles from './playPage.scss'
import { formatTime } from '../utils/index';
import PlayHeader from '../components/playHeader'; //播放页头部组件
import Lyric from '../components/lyric';  //歌词组件
import AudioProcess from '../components/audioProcess'; //声波组件
import {Carousel} from 'antd-mobile'; //头部轮播

@connect(({play}) => {
    return play
}, dispatch=> {
    return {
        getUrl: id=>{ //
            dispatch({
                type: 'play/getUrl',
                payload: id
            })
        },
        changePlay: payload=>{ //切换歌曲
            dispatch({
                type: 'play/changePlay',
                payload
            })
        },
        changeMode: ()=>{ //切换模式
            dispatch({
              type: 'play/changeMode',
            })
          },
        changeLyric: payload=>{ //歌词
            dispatch({
                type: 'play/getLyric',
                payload
            })
        }
    }
})

class Play extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            isPlay: true
        }
    }
    componentDidMount() { //获取歌曲播放文件的id
        let id = this.props.match.params.id;
        this.props.getUrl(id)
    }

    componentWillReceiveProps(nextProps){
        // 只要判断下一次的id和上一次的id不一样就要重新获取歌词
        if (nextProps.id != this.props.id){
          this.props.changeLyric(nextProps.id);
        }
      }
    //播放进度更新触发的钩子函数
    timeUpdate() {
        let progress = this.refs.audio.currentTime/this.refs.audio.duration*100;
        this.setState({
            progress
        }, () => {
            if (this.state.progress == 100){
                // 自动播放下一首
                this.props.changePlay('next');
                if (!this.props.playList.length){
                  this.refs.audio.pause();
                  this.refs.audio.currentTime = 0;
                  this.refs.audio.play();
                }
              }
        })
    }

    //获取总时长
    get duration() {
        if(this.refs.audio && this.refs.audio.duration) {
            return formatTime(this.refs.audio.duration)
        }
        return '00:00'
    }
    //当前播放时间
    get currentTime() {
        if(this.refs.audio && this.refs.audio.currentTime) {
            return formatTime(this.refs.audio.currentTime)
        }
        return '00:00'
    }

    // 获取播放模式
    get mode(){
        return this.props.mode==1?'单曲循环':this.props.mode==2?'随机播放':'列表循环'
    }

    //播放/暂停
    changeState() {
        this.setState({
            isPlay: !this.state.isPlay
        }, () => {
            this.state.isPlay?this.refs.audio.play():this.refs.audio.pause()
        })
    }
    //触摸进度条事件
    touchStart() {
        this.setState({
            isPlay: false
        }, () => {
            this.refs.audio.pause()
        })
    }
    touchMove(e) {
        console.log('触摸', e.touches)
        let touch = e.touches[0],
            progressEle = this.refs.progress;
        let progress = (touch.pageX - progressEle.offsetLeft)/progressEle.offsetWidth;
        if(progress>1) {
            progress = 1;
        }
        if(progress<0) {
            progress = 0;
        }
        this.setState({
            progress: progress*100
        }, () => {
            this.refs.audio.currentTime = progress*this.refs.audio.duration
        })

    }
    touchEnd() {
        this.setState({
            isPlay: true
        }, () => {
            this.refs.audio.play()
        })
    }

    //切换歌曲
    changePlay(type){
        this.props.changePlay(type)
    }

    // 切换播放模式
    changeMode(){
        this.props.changeMode();
    }
  render(){
      console.log(this.props.lyric, '歌词')
    if(!Object.keys(this.props.detail).length) {
        return null
    }
    return <div className={styles.box}>
        <div className={styles.playPages}></div>
        
        <div className={styles.playPage}>
            <h1><span></span>网易云音乐</h1>
            <div className={styles.top}>
                <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                    <PlayHeader isPlay={this.state.isPlay} picUrl={this.props.detail.al.picUrl} name={this.props.detail.name}
                    alName={this.props.detail.al.name} alia={this.props.detail.alia[0]}
                    />
                    <Lyric lyric={this.props.lyric} currentTime={this.refs.audio && this.refs.audio.currentTime}/>
                    <AudioProcess audio={this.refs.audio}/>
                </Carousel>
                
            </div>
            <div className={styles.bottom}>
                <span className={styles.left}>{this.currentTime}</span>
                <div className={styles.progress}
                    onTouchStart={this.touchStart.bind(this)}
                    onTouchMove={this.touchMove.bind(this)}
                    onTouchEnd={this.touchEnd.bind(this)}
                >
                    <p ref="progress">
                        <span style={{width:this.state.progress+'%'}}></span>
                    </p>
                </div>
                <span className={styles.right}>{this.duration}</span>
            </div>
            <div className={styles.prev}>
                <span onClick={() => this.changePlay('prev')}>上一曲</span>
                <span className={this.state.isPlay?styles.plays:styles.hide} onClick={this.changeState.bind(this)}><em></em></span>
                <span onClick={() => this.changePlay('next')}>下一曲</span>
            </div>
        </div>
        {
            this.props.url?<audio crossOrigin='anonymous' src={this.props.url} autoPlay ref="audio" onTimeUpdate={() => this.timeUpdate()}></audio>:null
        }
        <ul>{
        // this.props.playList.map((item, index)=>{
        //   return <li className={styles.item} key={index}>
        //       <img src={item.detail.al.picUrl}/>
        //       <div>
        //         <p>{item.detail.name}</p>
        //         <p>{`${item.detail.al.name}`}</p>
        //       </div>
        //     </li>
        // })
      }</ul>
    </div>
  }
}


export default Play;
