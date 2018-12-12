import React from 'react';
import {toSec} from '../utils/index';
import {Carousel} from 'antd-mobile';
import styles from './lyric.scss';

class Lyric extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            times: [], //歌词时间
            texts: [], //歌词文本
            current: 0
        }
    }

    //补全歌词
    initLryic(lyrics) {
        console.log(lyrics, '...lyrics')
        //歌词转数组
        lyrics = lyrics.split('\n');
        console.log('lyrics', lyrics);
        lyrics.filter(item=>item);
        lyrics = lyrics.map((item, index) => {
            let arr = item.split(']');
            if (!arr[1] && index < lyrics.length-2){
                for (let i=index+1, len=index+3; i<len; i++){
                    let temp = lyrics[i].split(']');
                    if (temp[1]){
                        arr[1] = temp[1];
                        break;
                    }
                }
                return arr.join(']')
            }else{
                return item;
            }
        })
        this.formatLyric(lyrics)
    }
    //解析歌词
    formatLyric(lyrics){  //
        console.log(lyrics, '...lyrics')
        let times = [],
            texts = [];
        lyrics.forEach(item=>{
            let arr = item.replace('[', '').split(']');
            console.log(arr, 'arr...')
            times.push(toSec(arr[0]));
            texts.push({
                time: toSec(arr[0]),
                text: arr[1]
            })
        })
        this.setState({
            times,
            texts
        })
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.lyric != this.props.lyric){
            this.initLryic(nextProps.lyric);
        }
        for (let i=0,len=this.state.times.length; i<len; i++){
            if (nextProps.currentTime < this.state.times[i]){
              if (i-1 !== this.state.current){
                this.setState({
                  current: i-1
                });
              }
              break;
            }
          }
    }

    render() {
        return <React.Fragment>
            <Carousel
                selectedIndex={this.state.current}
                // autoplay={true}
                vertical={true}
                dots={false}
                autoplayInterval={500}
                infinite>{
                    this.state.texts.map((item, index)=>{
                        return <p key={index}>{item.text}</p>
                      })
                }
            </Carousel>
        </React.Fragment>
    }

}

export default Lyric;