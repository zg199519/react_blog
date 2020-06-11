import { TEST_A }  from './actionTypes'

const initializeState = {
    filterCategory:{
        categoryId:null,//默认是全部
        tagId:null//标签ID
    }
}  
export default (state = initializeState,action)=>{  //就是一个方法函数
    
    if(action.type === TEST_A){
        console.log(action)
    }

    return state
}