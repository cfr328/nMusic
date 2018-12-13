import React from 'react';
import {connect} from 'dva';
import styles from './search.scss';
import {Link} from 'dva/router';
//引入context
import DataContext from '../../context/index';

@connect(({examples})=>{
    let {songs, songCount} = examples;
    return {   //return的数据
      songs,
      songCount
    }
  }, dispatch=>{
    return {
        getSearch: payload=>{
            dispatch({
                type: 'examples/getSearch',
                payload
            })
        },
        playAll: payload=>{
            dispatch({
                type: 'play/getUrls',
                payload
            })
        },
        distinguishSong: payload=>{
            dispatch({
              type: 'play/distinguishSong',
              payload
            })
        }
    }
})
  
class Search extends React.PureComponent{
    constructor(props) {
        super(props)
    }
    search() { //点击搜索获取input的value值
        let search = this.refs.search.value; //search为input绑定的属性(input的value)
        console.log(search, 'search')
        if(search) {
            this.props.getSearch(search)
        }
    }
    goPlay(id) { //跳转
        this.props.history.push('/play', id)
    }
    playAll(){ //全部播放
        console.log(this.props.songs, '全部songs')
        this.props.playAll(this.props.songs.map(item=>item.id));
        this.props.history.push(`/play/${this.props.songs[0].id}`);
    }

    //听歌识曲
    distinguishSong(){
        console.log('猜歌')
        this.props.distinguishSong(this.props.songs.map(item=>item.id));
    }
    render(){
        let {
            songs
        } = this.props;
        console.log(this.props)
        return <div className={styles.wrap}>
            <div className={styles.top}>
                <input placeholder="搜索歌曲" ref="search"></input>
                <span onClick={this.search.bind(this)}>搜索</span>
            </div>
            <div className={styles.btns}>
                <button onClick={this.playAll.bind(this)}>全部播放</button>
                <button onClick={this.distinguishSong.bind(this)}>听歌识曲</button>
            </div>
            <ul>{
                songs.map((item, index) => {
                    return <Link to={`/play/${item.id}`} key={index}>
                        <li className={styles.li}>
                            <p className={styles.h4}>{item.name}</p>
                            <p>{`${item.artists[0].name}-${item.album.name}`}</p>
                        </li>
                    </Link>
                })
            }</ul>
            {/* <DataContext.Consumer>{
                context=><div>{JSON.stringify(context)}</div>
            }
            </DataContext.Consumer> */}
        </div>
    }
}

// const mapStateToProps = state=>{ //方法 返回后台数据接收调用
//     let { 
//         songs,
//         songCount
//     } = state.examples;
//     return {
//         songs,
//         songCount
//     }
// }

//export default connect(mapStateToProps)(Search);
export default Search;