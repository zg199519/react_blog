import React from 'react'
import { Button , Space , Affix} from 'antd';
import TagStyles from './tags.less'
import { categoryList , tagList } from '@/server/http'
import { history , withRouter } from 'umi'

class Tags extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            categoryList:[],//分类数据集合
            tags:[],//标签数据集合
            code:true,//是否需要 显示 二级标签分类  props.code
            params:{ category: undefined,  tag: undefined },//路由的参数键值对  props.match.params
            jump:null
        }
    }
    
    //路由变化 初始化 改变变量的值
    static getDerivedStateFromProps(nextProps, prevState) {

        if((JSON.stringify(nextProps.match.params) !== JSON.stringify(prevState.params)) || (nextProps.code !== prevState.code)){
            return {
                code:nextProps.code,
                params:nextProps.match.params,
                jump:nextProps.jump
            };
        }else{
            return null;
        }

    }

    componentDidMount(){
        this.getList()//获取数据分类列表
        this.getTagList()//获取标签列表
    }


    //数据更新后的变化的异步操作
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.category !== this.props.match.params.category){
            this.getTagList()
        }
    }

    // 获取分类数据列表
    async getList(){
        let data = await categoryList({parentId:-1});
        this.setState({
            categoryList:data.data
        })
    }

    // 获取二级标签列表
    async getTagList(){

        // 判断获取 二级菜单
        if(this.state.code && this.state.params.category){
            let data = await categoryList({parentId:this.state.params.category});
            this.setState({
                tags:data.data
            })
        }else{
            this.setState({
                tags:[]
            })
        }

    }


    // 分类点击事件
    setCategoryFun = (code = '')=>{
        // 跳转
        history.push(`/${this.state.jump?this.state.jump:'home'}${code?('/'+code):''}`);
    }

    // 标签分类点击事件
    setTagFun = (tagId = '')=>{
        // 跳转
        history.push(`/home/${this.state.params.category}${tagId?('/'+tagId):''}`);
    }

    render(){
        
        //分类列表
        let category = this.state.categoryList.map((item,index)=>{
            return (
                <Button 
                    type="link" 
                    className={`${TagStyles.button} ${(this.state.params.category == item.id)?TagStyles.active:''}`} 
                    key={index} 
                    onClick={()=>this.setCategoryFun(item.id)}>
                        {item.name}
                </Button> 
            )
        })
        

        // 标签列表
        let tags = ()=>{
            if(this.state.tags){
                return this.state.tags.map((item,index)=>{
                    return (
                        <Button key={index} 
                        shape="round" 
                        size="small" 
                        className={`${TagStyles.tag} ${this.state.params.tag == item.id?TagStyles.active:''}`}
                        onClick={()=>this.setTagFun(item.id)}
                        >{item.name}</Button>
                    )
                })
            }else{
                return ''
            }
        }


        return(
            <div>
                <Affix offsetTop={0}>
                    <div className={TagStyles.classification}>
                        <div className={`container ${TagStyles.item}`}>
                            <Button 
                                type="link" 
                                className={`${TagStyles.button} ${this.state.params.category?'':TagStyles.active}`} 
                                onClick={()=>this.setCategoryFun()}>
                                    全部
                            </Button> 
                            {category}
                        </div>
                    </div>
                </Affix>


                {
                    this.state.code && (this.state.tags.length > 0)
                    ?
                        <div className="container">
                            <Space className={TagStyles.lists} size={14}>
                                <Button 
                                shape="round" 
                                size="small" 
                                className={`${TagStyles.tag} ${this.state.params.tag?'':TagStyles.active}`}
                                onClick={()=>this.setTagFun()}
                                >全部</Button>
                                {tags()}
                            </Space>
                        </div>
                    :''
                }

            </div>
        )

    }

}

export default withRouter(Tags)
