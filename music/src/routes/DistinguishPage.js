import React from 'react';
import {connect} from 'dva';
import {randomArr} from '../utils/index';
import styles from './DistinguishPage.scss';

@connect(({play}) =>{
    return play
}, dispatch=> {
    return {

    }
})

class Distinguish extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            rightAnser: [], 
            answer: new Array(10),  //用户选择的答案数组
            answerList: [],  //备选答案
            current: 0,  //当前播放歌曲
            isPlay: false,  //是否在播放
            progress: 0, //当前播放进度
            tempTime: { //播放时长
                start: 0,
                end: 0
            }
        }
    }

    //静态生命周期
    static getDerivedStateFromProps(props, state){
        return {
            rightAnser: props.distiguishList.map(item=>item.name.name+' --- '+item.name.al.name)
        }
    }

    randomAnswer(){
        this.setState({
            answerList: randomArr(this.state.rightAnser)
        })
    }

    componentDidMount(){
        this.randomAnswer()
    }

    //歌曲加载完，开始播放
    startPlay(){
        let start = Math.floor(Math.random()*(this.refs.audio.duration-20));
        this.randomAnswer();
        this.setState({
            tempTime: {
                start,
                end: start + 20
            }
        }, ()=>{
            //按钮的class去掉
            [...document.querySelectorAll('ul button')].forEach(item=>{
                item.className = item.className.replace(' error', '').replace(' success', '');
            })
            this.refs.audio.pause();
            this.refs.audio.currentTime = start;
            this.refs.audio.play()
        })
    }

    //歌曲更新播放进度
    timeUpdate(){
        if(this.refs.audio.currentTime > this.state.tempTime.end){
            this.refs.audio.pause();
            if(this.state.current == 9){

            }else{
                this.setState({
                    current: (this.state.current+1)%10
                }, ()=>{
                    this.refs.audio.play()
                })
            }
        }
        //计算进度
        this.setState({
            progress: Math.floor((this.refs.audio.currentTime - this.state.tempTime.start)/20*100)
        })
    }

    get currentTime(){
        if(this.refs.audio && this.refs.audio.currentTime){
            return (Math.floor((this.refs.audio.currentTime - this.state.tempTime.start))+'').padStart(2, '0')
        }
        return '00';
    }

    //控制播放暂停
    play(){
        this.setState({
            isPlay: !this.state.isPlay
        }, ()=>{
            this.state.isPlay?this.refs.audio.play():this.refs.audio.pause()
        })
    }

    //猜歌
    answer(e){
        if(this.state.answers[this.state.current]){
            return;
        }
        //判断是否点击按钮
        if(e.target !=e.currentTarget){
            let answer = e.target.innerText;
            let answers = [...this.state.answers];
            answers[this.state.current] = answer;
            //把答案放入列表
            this.setState({
                answers
            })
            //判断选对还是选错
            if(this.state.rightAnser[this.state.current] == answer){
                e.target.className += ' success';
            }else{
                e.target.className += ' error'
            }
        }
    }

    render() {
        return <React.Fragment>
            <h2>猜歌识曲</h2>
            <ul onLCick={this.answer.bind(this)}>{
                this.state.answerList.map((item, index)=>{
                    return <li><button className={styles.answer} key={index}>{item}</button></li>
                })
            }
            </ul>
            {/* 进度条 */}
            <div>
                <span>{'00.'+this.currentTime}</span>
                <div className={styles.progress}>
                    <p ref="progress">
                        <span style={{width:this.state.progress+'%'}}></span>
                    </p>
                </div>
                <span>00.10</span>
            </div>
            <button onClick={this.play.bind(this)}>{
                this.state.isPlay?'暂停':'播放'
            }</button>
            <span>{`${this.state.current+1}/10`}</span>
            {/* 音频播放 */}
            <audio crossOrigin="anonymous" src={this.props.distiguishList[this.state.current].url} ref="audio"
            onTimeUpdate={()=>this.timeUpdate()}
            onLoadedMetadata={()=>this.startPlay()}></audio>

            <ul className={styles.list}>
                <h2>猜歌结果</h2>
                {
                    this.state.answers.map((item, index)=>{
                        return <li>
                            <span>{index+1}</span>
                            <span>答案{item}</span>
                            <span>{item == this.state.rightAnser[index]?'猜对':'猜错'}</span>
                        </li>
                    })
                }
            </ul>
        </React.Fragment>
    }
}

export default Distinguish;