import {getVideo} from '../services/example';

export default {
    namespace: 'video',
    state: { },
    effects: {
        //获取video数据
        * getVideo({payload}, {call, put}) {
            let res = yield call(getVideo, payload)
            console.log('video...', res)
            yield put({
                type: 'updateState',
                payload
            })
        }
    },
    reducers: {
        updateState(state, action){
            return {...state, ...action.payload}
        }
    }
}