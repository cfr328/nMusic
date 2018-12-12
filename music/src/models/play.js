import {getUrl, getDetail, getLyric} from '../services/example';

export default {
    namespace: 'play',
    state: {
        id: 0,
        url: '',
        lyric: '',
        mode: 2, //1单曲循环，2随机播放， 3顺序播放
        info: {},
        detail: {},
        current: 0,
        playList: JSON.parse(window.localStorage.getItem('playList')) || []
    },
    effects: {
        //获取一首歌曲的播放文件和详情
        * getUrl({payload}, {call, put}) {
            let res = yield call(getUrl, payload)
            console.log(payload, '...payload')
            console.log(res, 'urlList')
            let detail = yield call(getDetail, payload)
            let obj = {info: res.data.data[0]}
            obj.id = payload;
            obj.url = res.data.data[0].url;
            obj.detail = detail.data.songs[0]
            console.log(detail, 'detail')
            yield put({
                type: 'updateState',
                payload: obj
            })
        },

        //获取歌词
        * getLyric({payload}, {call, put}) {
            let lyric = yield call(getLyric, payload);
            yield put({
                type: 'updateState',
                payload: {
                    lyric: lyric.data.lrc.lyric
                }
            })
        },

        //获取一组歌曲的播放文件和详情
        * getUrls({payload}, {call, put}) {
            let res = yield call(getUrl, payload.join(','));
            let details = yield call(getDetail, payload.join(','));
            console.log(res, '一组song')
            res = res.data.data;
            details = details.data.songs;
            let playList = [];
            details.forEach(item=>{
                playList.push({
                    detail: item,
                    info: res.filter(value=>value.id==item.id)[0]
                })
            })
            window.localStorage.setItem('playList', JSON.stringify(playList))
            yield put({
                type: 'updateState',
                payload: {playList}
            })
        }
    },

    reducers: {
        updateState(state, action){
            console.log(action, '...action')
            return {...state, ...action.payload}
        },
        //切换歌曲
        changePlay(state, {payload}){
            let newState = {...state};
            console.log(newState, 'changePlay')
            console.log(payload, 'payload')
            //没有播放列表终止操作
            if (!state.playList.length || state.mode == 1){
                return newState;
            }
            if (state.mode == 2){
                let index = Math.floor(Math.random()*(state.playList.length-1));
                console.log('index...', index);
                newState.current = index;
            }else{
                if(payload == 'prev'){
                    if(state.current == 0){
                        newState.current = state.playList.length-1;
                    }else{
                        newState.current--;
                    }
                } else {
                    if(state.current == state.playList.length-1){
                        newState.current = 0;
                    } else {
                        newState.current++;
                    }
                }
            }
            newState.id = state.playList[newState.current].info.id;
            newState.url = state.playList[newState.current].info.url;
            newState.info = state.playList[newState.current].info;
            newState.detail = state.playList[newState.current].detail;

            return newState;
        },
        //改变播放模式
        changeMode(state) {
            let newState = {...state};
            newState.mode = (newState.mode)%3+1;
            return newState;
        }
    }
}