import React from 'react';
import { Divider , Typography , Button , Tag} from 'antd';
const { Title , Text, Link , Paragraph} = Typography;
import styles from './index.less'
import SiderRight from '@/components/sider/index'
import UserInfo from '@/components/user/info'
import { LikeOutlined , MessageOutlined , ForkOutlined , EllipsisOutlined} from '@ant-design/icons';

export default class story extends React.Component {

  render() {
    return (
      <section className={`container ${styles.story}`}>
        <div className={styles.navigation}>
          <ul>
            <li>热门</li>
            <li>推荐</li>
            <Divider className={styles.divider}/>
            <li>吹牛贴</li>
            <li>生活贴</li>
            <li>招聘贴</li>
            <li>交友贴</li>
            <li>感情贴</li>
          </ul>
        </div>
        <div className={styles.stream}>
          <div className={styles.container}>

            {/* 数据列表 */}
            <div className={styles.lists}>
              <div className={styles.item}>
                <div className={styles.content}>
                  <div className={styles.portrait}>
                    <div className={styles.headPortrait} style={{backgroundImage:`url(${'http://qzapp.qlogo.cn/qzapp/101541263/16392CE435BE52E10D52974E97F9F894/50'})`}}></div>
                  </div>

                  <div className={styles.postContent}>

                    <div className={styles.userMain}>
                      <div className={styles.info}>
                          <Title level={4} className={styles.title}>夏日里的一把阳光</Title>
                          <Text type="secondary" className={styles.text}>前端 @ 只会摸鱼·54分钟前</Text>
                      </div>
                      <div className={styles.operation}>
                          <Button danger size="small" className={styles.focus}>关注</Button>
                          <EllipsisOutlined className={styles.more}/>
                      </div>
                    </div>

                    <div className={styles.theText}>
                      <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: 'more' }}>
                        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                        Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                        a design language for background applications, is refined by Ant UED Team. Ant Design, a
                        design language for background applications, is refined by Ant UED Team. Ant Design, a design
                        language for background applications, is refined by Ant UED Team. Ant Design, a design
                        language for background applications, is refined by Ant UED Team.
                      </Paragraph>
                    </div>

                    <div className={styles.atlasList}>
                      <div className={styles.img} style={{backgroundImage:`url(${'http://qzapp.qlogo.cn/qzapp/101541263/16392CE435BE52E10D52974E97F9F894/50'})`}}></div>
                      <div className={styles.img} style={{backgroundImage:`url(${'http://qzapp.qlogo.cn/qzapp/101541263/16392CE435BE52E10D52974E97F9F894/50'})`}}></div>
                      <div className={styles.img} style={{backgroundImage:`url(${'http://qzapp.qlogo.cn/qzapp/101541263/16392CE435BE52E10D52974E97F9F894/50'})`}}></div>
                      <div className={styles.img} style={{backgroundImage:`url(${'http://qzapp.qlogo.cn/qzapp/101541263/16392CE435BE52E10D52974E97F9F894/50'})`}}></div>
                    </div>

                    <div className={styles.tags}>
                       <Tag color="blue">上班摸鱼</Tag>
                       <Tag color="blue">开发工具推荐</Tag>
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

