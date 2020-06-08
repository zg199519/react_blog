import React from 'react';
import { Layout , Divider , Button , Avatar } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SiderRight from '@/components/sider/index'
import Tags from '@/components/home/tags'
import styles from './index.less'

export default class tutorial extends React.Component {

  render() {
    return (
      <section>
        <Tags code={false}/>
        <div className={`container ${styles.welcomeContext}`}>
             <Layout>
                <Content className={styles.content}>
                  <div className={styles.main}>

                    <div className={styles.volumeList}>

                      <div className={styles.item}>
                        <div className={styles.theCover} style={{backgroundImage:`url(${'http://api.noahzhou.com//uploads/resource/20190119/1547899256.jpeg'})`}}></div>
                        <div className={styles.info}>
                          <div className={`${styles.title} text-line`}>这里是小册标题标题</div>
                          <div className={`${styles.desc} text-two`}>
                            继SpringBoot原理分析之后的又一力作，从熟悉的场景逐步深入源码底层，理解SpringCloudNetflix中组件的设计和原理。
                          </div>
                          <div className={`${styles.author} text-line`}>
                              <Avatar size={30} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                              <span className={styles.name}>夏日里的一把阳光</span>
                              <span>阅读时长791分30秒.888浏览.30节</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.item}>
                        <div className={styles.theCover} style={{backgroundImage:`url(${'http://api.noahzhou.com//uploads/resource/20190119/1547899256.jpeg'})`}}></div>
                        <div className={styles.info}>
                          <div className={`${styles.title} text-line`}>这里是小册标题标题</div>
                          <div className={`${styles.desc} text-two`}>继SpringBoot原理分析之后的又一力作，从熟悉的场景逐步深入源码底层，理解SpringCloudNetflix中组件的设计和原理。</div>
                          <div className={`${styles.author} text-line`}>
                              <Avatar size={30} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                              <span className={styles.name}>夏日里的一把阳光</span>
                              <span>阅读时长791分30秒.888浏览.30节</span>
                          </div>
                        </div>
                      </div>


                      <div className={styles.item}>
                        <div className={styles.theCover} style={{backgroundImage:`url(${'http://api.noahzhou.com//uploads/resource/20190119/1547899256.jpeg'})`}}></div>
                        <div className={styles.info}>
                          <div className={`${styles.title} text-line`}>这里是小册标题标题</div>
                          <div className={`${styles.desc} text-two`}>继SpringBoot原理分析之后的又一力作，从熟悉的场景逐步深入源码底层，理解SpringCloudNetflix中组件的设计和原理。</div>
                          <div className={`${styles.author} text-line`}>
                              <Avatar size={30} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                              <span className={styles.name}>夏日里的一把阳光</span>
                              <span>阅读时长791分30秒.888浏览.30节</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.item}>
                        <div className={styles.theCover} style={{backgroundImage:`url(${'http://api.noahzhou.com//uploads/resource/20190119/1547899256.jpeg'})`}}></div>
                        <div className={styles.info}>
                          <div className={`${styles.title} text-line`}>这里是小册标题标题</div>
                          <div className={`${styles.desc} text-two`}>继SpringBoot原理分析之后的又一力作，从熟悉的场景逐步深入源码底层，理解SpringCloudNetflix中组件的设计和原理。</div>
                          <div className={`${styles.author} text-line`}>
                              <Avatar size={30} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                              <span className={styles.name}>夏日里的一把阳光</span>
                              <span>阅读时长791分30秒.888浏览.30节</span>
                          </div>
                        </div>
                      </div>
    

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

