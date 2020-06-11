import { createStore } from 'redux'
import reducer from './reducer' 
const store = createStore(reducer) //创建数据仓库
export default store //暴露
