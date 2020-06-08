import React from 'react';
import { Layout , Divider , Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Tags from '@/components/home/tags'
import SiderRight from '@/components/sider/index'
import indexStyles from './index.less'
import { LikeFilled , MessageFilled , ChromeFilled} from '@ant-design/icons';

import { getList } from '@/server/home'

export default class home extends React.Component {

  componentDidMount(){
    getList().then((data)=>{
      console.log(data)

    })
    
  }

  render() {
    let itemLists = [1,2,3,4,1,2,3,4,1,2,3,4].map((item,index)=>{
      return (
        <div className={indexStyles.item} key={index}>
            <div className={indexStyles.infoBox}>
              <div className={indexStyles.hint}>
                <span style={{color:'#b71ed7'}}>荐</span>
                <span className={indexStyles.segment}>.</span>
                <span className={indexStyles.name}>晓光</span>
                <span className={indexStyles.segment}>.</span>
                <span>10小时前</span>
                <span className={indexStyles.segment}>.</span>
                <span>JavaScript</span>
              </div>
              <div className={`text-line ${indexStyles.title}`}>
                  Vue最全知识点，面试必备（基础到进阶，覆盖vue3.0，持续更新整理，欢迎补充讨论）
              </div>
              <div className={indexStyles.operation}>
                  <Button className={indexStyles.but} icon={<LikeFilled />} size="small">222</Button>
                  <Button className={`${indexStyles.but} ${indexStyles.borNone}`} icon={<MessageFilled />} size="small">评论</Button>
                  <Button className={`${indexStyles.but} ${indexStyles.share}`} icon={<ChromeFilled />} size="small">分享</Button>
              </div>
          </div>
          <div className={indexStyles.cover} style={{backgroundImage:`url(${'http://api.noahzhou.com//uploads/resource/20190125/1548423378.jpeg'})`}}></div>
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
                      <Button type="link" className={indexStyles.nav}>推荐</Button>
                      <Divider type="vertical" />
                      <Button type="link" className={indexStyles.nav}>最新</Button>
                      <Divider type="vertical" />
                      <Button type="link" className={indexStyles.nav}>热榜</Button>
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

