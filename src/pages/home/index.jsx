import React from 'react';
import { Layout , Divider , Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Tags from '@/components/home/tags'
import SiderRight from '@/components/sider/index'
import indexStyles from './index.less'
import { LikeFilled , MessageFilled , ChromeFilled} from '@ant-design/icons';

import { getList } from '@/server/home'
import {history} from 'umi'

export default class home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      total:0,
      list:[],//数据集合
      params:props.match.params,//路由参数
      sort:'recommended',//排序 默认是推荐
    }

    this.setSort = this.setSort.bind(this);

  }

  componentDidMount(){
    this.getList()
  }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     let nextParams = nextProps.match.params;
//     let prevParams = prevState.params;
//     if (JSON.stringify(nextParams) !== JSON.stringify(prevParams) ) {
//         return {
//             params:nextParams
//         };
//     }
//     // 否则，对于state不进行任何操作
//     return null;
// }

  UNSAFE_componentWillReceiveProps(nextProps) {

    this.setState({
      params:nextProps.match.params
    },()=>{
      this.getList()
    })

  }

  // 获取数据列表
  async getList(){
    //获取查询条件
    let params = this.state.params
    let requestData = {
      category: params.category?params.category:null,//分类ID
      tag: params.tag?params.tag:null, //二级分类标签ID
      sort:this.state.sort //排序
    }

    let data = await getList(requestData);
    this.setState({
      list:data.data.list
    })
  }

  // 更改排序规则
  setSort(code = 'recommended'){
    this.setState({
      sort:code
    },()=>{
      this.getList()
    })

  }

  render() {
    // 列表数据
    let itemLists = this.state.list.map((item,index)=>{
      let tagText = ''
      item.tags.forEach((v)=>{
        tagText+=v.title
      })

      return (
        <div className={indexStyles.item} key={index}>
            <div className={indexStyles.infoBox}>
              <div className={indexStyles.hint}>
                <span style={{color:'#b71ed7'}}>{item.hot?'推荐':''}</span>
                <span className={indexStyles.segment}>.</span>
                <span className={indexStyles.name}>{item.user.name}</span>
                <span className={indexStyles.segment}>.</span>
                <span>{item.createdAt}</span>
                <span className={indexStyles.segment}>.</span>
                <span>{tagText}</span>
              </div>
              <div className={`text-line ${indexStyles.title}`}>
                  {item.title}
              </div>
              <div className={indexStyles.operation}>
                  <Button className={indexStyles.but} icon={<LikeFilled />} size="small"><span>{item.likeCount}</span> </Button>
                  <Button className={`${indexStyles.but} ${indexStyles.borNone}`} icon={<MessageFilled />} size="small"><span>{item.commentsCount}</span></Button>
                  <Button className={`${indexStyles.but} ${indexStyles.share}`} icon={<ChromeFilled />} size="small"><span>分享</span></Button>
              </div>
          </div>
          <div className={indexStyles.cover} style={{backgroundImage:`url(${item.cover})`}}></div>
        </div>
      )
    })


    return (
      <section>
        <div>
            <Tags code={true}/>
            <div className={`container ${indexStyles.welcomeContext}`}>
             <Layout>
                <Content className={indexStyles.content}>
                  <div className={indexStyles.main}>
                    <header className={indexStyles.listHeaerNav}>
                      <Button type="link" className={`${indexStyles.nav} ${this.state.sort === 'recommended'?indexStyles.active:''}`} onClick={()=>{this.setSort('recommended')}}>推荐</Button>
                      <Divider type="vertical" />
                      <Button type="link" className={`${indexStyles.nav} ${this.state.sort === 'newest'?indexStyles.active:''}`} onClick={()=>{this.setSort('newest')}}>最新</Button>
                      <Divider type="vertical" />
                      <Button type="link" className={`${indexStyles.nav} ${this.state.sort === 'hot'?indexStyles.active:''}`} onClick={()=>{this.setSort('hot')}}>热榜</Button>
                    </header>
                    <div className={indexStyles.dataLists}>
                      {itemLists}
                    </div>
                  </div>
                </Content>
                <Sider className={`background-none`} width={240}>
                  <SiderRight></SiderRight>
                </Sider>
              </Layout>
            </div>
        </div>
        </section>
    );
  }

}

