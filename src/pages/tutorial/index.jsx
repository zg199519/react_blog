import React from 'react';
import { Layout , Divider , Button , Avatar } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SiderRight from '@/components/sider/index'
import Tags from '@/components/home/tags'
import styles from './index.less'

import { getList } from '@/server/tutorial'

export default class tutorial extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      total:0,
      list:[],//数据集合
    }
  }

  componentDidMount(){
    this.getList()
  }

  // 获取数据列表
  async getList(){
    let data = await getList();
    this.setState({
      list:data.data.list
    })
  }

  render() {

    const lists = this.state.list.map((item,index)=>{
      return(
        <div className={styles.item} key={index}>
          <div className={styles.theCover} style={{backgroundImage:`url(${item.cover})`}}></div>
          <div className={styles.info}>
          <div className={`${styles.title} text-line`}>{item.title}</div>
            <div className={`${styles.desc} text-two`}>
                {item.desc}
            </div>
            <div className={`${styles.author} text-line`}>
                <Avatar size={30} src={item.user.portrait} />
                <span className={styles.name}>{item.user.name}</span>
                <span>阅读时长{item.readingTime}秒.{item.views}浏览.{item.chapters}节</span>
            </div>
          </div>
        </div>
      )
    })
    
    return (
      <section>
        <Tags code={false}/>
        <div className={`container ${styles.welcomeContext}`}>
             <Layout>
                <Content className={styles.content}>
                  <div className={styles.main}>
                    <div className={styles.volumeList}>
                      {lists}
                    </div>
                  </div>
                </Content>
                <Sider className={`background-none`} width={240}>
                  <SiderRight></SiderRight>
                </Sider>
              </Layout>
            </div>
      </section>
    );
  }

}

