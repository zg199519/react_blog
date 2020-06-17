import React from 'react';
import { Divider , Typography , Button , Tag} from 'antd';
const { Title , Text, Link , Paragraph} = Typography;
import styles from './index.less'
import SiderRight from '@/components/sider/index'
import UserInfo from '@/components/user/info'
import Editor from '@/components/story/editor'
import { LikeOutlined , MessageOutlined , ForkOutlined , EllipsisOutlined} from '@ant-design/icons';

import { storyList , getCategoryList } from '@/server/story'
import { history } from 'umi'

export default class story extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        list:[],//数据集合
        categoryList:[],//数据分类列表
        params:{
          category:undefined,//分类ID
        }
    }
  }

  //路由变化 初始化 改变变量的值
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.match.params.category !== prevState.params.category){
      return {
          list:[],//数据集合
          params:nextProps.match.params
      };
    }else{
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.category !== this.props.match.params.category){
      this.getList()
    }
  }

  componentDidMount(){
    this.getCategoryList()//获取分类数据列表
    this.getList()//获取数据列表
  }

  // 获取分类数据列表
  async getList(){
    let data = await storyList(this.state.params);
    this.setState({
      list:data.data.list
    })
  }

  // 获取数据分类列表
  async getCategoryList(){
    let data = await getCategoryList();
    this.setState({
      categoryList:data.data
    })
  }

  // 分类点击事件
  setCategoryFun = (code = '')=>{
    // 跳转
    history.push(`/story${code?('/'+code):''}`);
  }

  render() {
    
        //分类列表
        let lists = this.state.list.map((item,index)=>{
          return (
            <div className={styles.item} key={index}>
            <div className={styles.content}>
              <div className={styles.portrait}>
                <div className={styles.headPortrait} style={{backgroundImage:`url(${item.user.portrait})`}}></div>
              </div>

              <div className={styles.postContent}>

                <div className={styles.userMain}>
                  <div className={styles.info}>
                      <Title level={4} className={styles.title}>{item.user.name}</Title>
                      <Text type="secondary" className={styles.text}>{item.user.company} @ {item.user.job}·{item.creationTime}分钟前</Text>
                  </div>
                  <div className={styles.operation}>
                      <Button danger size="small" className={styles.focus}>关注</Button>
                      <EllipsisOutlined className={styles.more}/>
                  </div>
                </div>

                <div className={styles.theText}>
                  <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: 'more' }}>
                    {item.content}
                  </Paragraph>
                </div>

                <div className={styles.atlasList}>
                  {
                        item.pictures.map((item1,number1)=>{
                            return (
                              <div className={styles.img} style={{backgroundImage:`url(${item1})`}} key={number1}></div>
                            );
                      })
                  }
                </div>
                <div className={styles.tags}>
                  {
                      item.topics.map((item2,number2)=>{
                            return (
                            <Tag color="blue" key={number2}>{item2.name}</Tag>
                            );
                      })
                  }
                </div>

              </div>
            </div>
            <div className={styles.action}>
              <div className={styles.main}> <LikeOutlined /> <span className={styles.text}>赞</span>  </div>
              <Divider type="vertical" />
              <div className={styles.main}> <MessageOutlined /> <span className={styles.text}>评价</span></div>
              <Divider type="vertical" />
              <div className={styles.main}> <ForkOutlined /> <span className={styles.text}>分享</span></div>
            </div>
          </div>
          )
        })

    return (
      
      <section className={`container ${styles.story}`}>
        {/* 左侧菜单 */}
        <div className={styles.navigation}>
          <ul>
            <li className={this.state.params.category === "hot" || !this.state.params.category?styles.active:''} onClick={()=>this.setCategoryFun("hot")}>热门</li>
            <li className={this.state.params.category === "recommended"?styles.active:''} onClick={()=>this.setCategoryFun("recommended")}>推荐</li>
            <Divider className={styles.divider}/>
            {
                this.state.categoryList.map((item,index) =>{
                      return (
                        <li key={index} className={this.state.params.category == item.id?styles.active:''} onClick={()=>this.setCategoryFun(item.id)}>{item.name}</li>
                      );
                })
            }
          </ul>
        </div>

        <div className={styles.stream}>
          <div className={styles.container}>
            {/* 编辑发布文章 */}
            <div className={styles.editor}>
              <Editor></Editor>
            </div>
            {/* 数据列表 */}
            <div className={styles.lists}>
              {lists}
            </div>
          </div>
        </div>
        <div className={styles.sidebar}>
          <UserInfo></UserInfo>
          <SiderRight></SiderRight>
        </div>

      </section>
    );
  }

}

