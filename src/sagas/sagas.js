import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { API_CALL_REQUEST } from '../actions/actions';




//WORKER SAGA
// is called from watcherSaga, does the auth and dispaches an action

function* workerSaga(action){
    try {
        const response = yield call(fetchHttp(action.payload.request))
        //Obtain token from response
        const token = response.data.token;
        yield put({
            type: action.payload.okAction, //API_CALL_SUCCESS
            payload: {
                token
            }
        })

    } catch (error) {
        yield put({
            type: action.payload.failAction, //API_CALL_FAILURE
            payload: {
                error
            }
        })
    }
}

//watcher SAGA
//listens the API_CALL_REQUEST actions
function* fetchWatcher(){
    //Listens the action and starts a worker saga
    yield takeLatest(API_CALL_REQUEST, workerSaga)
}


export default function* rootSaga() {
    yield all([
        fetchWatcher(),
    ])
}

function fetchHttp (request) {
    return function(){
        return(axios(request))
    }
}