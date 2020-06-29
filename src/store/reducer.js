import { TEST_A } from './actionTypes';

const initializeState = {
  headerShow: true, //是否显示头部
};
export default (state = initializeState, action) => {
  //就是一个方法函数
  // 改变头部显示状态
  if (action.type === TEST_A) {
    let newState = JSON.parse(JSON.stringify(state)); //深度拷贝state
    newState.headerShow = action.value;
    return newState;
  }

  return state;
};
