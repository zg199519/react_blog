import React from 'react'
import { Avatar , Button , Affix} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from './index.less'

import { advertising } from '@/server/http'
import { getAuthorList } from '@/server/user'
import { getList } from '@/server/tutorial'

export default class sider extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            advertising:{},//广告集合
            authorList:[],//作者榜单
            smallVolumes:[]//推荐小册
        }
    }

    componentDidMount(){
        this.getAdvertising()
        this.getAuthorList()
        this.getSmallVolumes()
    }

    // 获取广告
    async getAdvertising(){
        let data = await advertising();
        this.setState({
            advertising:data.data
        })
    }

    // 获取推荐作者列表
    async getAuthorList(){
        let data = await getAuthorList();
        this.setState({
            authorList:data.data.list
        })
    }

    // 获取小册
    async getSmallVolumes(){
        let data = await getList();
        this.setState({
            smallVolumes:data.data.list
        })
    }



    render(){
        return(
            <div className={styles.home}>
                
                {/* 广告模块 */}
                <div className={styles.advertising}>
                    <img src={this.state.advertising.img} alt={this.state.advertising.name}/>
                    <div className={styles.tag}>广告</div>
                </div>

                {/* 作者榜单模块 */}
                <div className={styles.authorList}>
                    <div className={styles.title}>🎖️作者榜单</div>
                    <ul className={styles.lists}>
                        {
                            this.state.authorList.map((item,index)=>{
                                return (
                                    <li className={styles.item} key={index}>
                                        <div className={styles.portrait}>
                                            <Avatar size={46}  src={item.portrait} />
                                        </div>
                                        <div className={styles.info}>
                                            <div className={`${styles.name} text-line`}>{item.name}</div>
                                            <div className={`${styles.desc} text-two`}>{item.company}@{item.job}</div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div className={`${styles.title} ${styles.all}`}>
                        完整榜单
                        <CaretRightOutlined />
                    </div>

                </div>

                {/* 推荐小册 */}
                <div className={styles.smallVolumes}>
                    <div className={styles.title}>推荐小册</div>
                    <ul className={styles.lists}>

                        {
                            this.state.smallVolumes.map((item,index)=>{
                                return (
                                    <li className={styles.item} key={index}>
                                        <div className={styles.portrait} style={{backgroundImage:`url(${item.cover})`}}>
                            
                                        </div>
                                        <div className={styles.info}>
                                            <div className={`${styles.name} text-two`}>{item.title}</div>
                                            <div className={`${styles.desc} text-line`}>
                                                <span> {item.views}人已看 </span>    
                                                <Button type="primary" size="small" className={styles.buto}>查看</Button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }

                    </ul>
                    <div className={`${styles.title} ${styles.all}`}>
                        查看更多
                        <CaretRightOutlined />
                    </div>

                </div>

                {/* 底部的备案号 和版本 */}
                <Affix offsetTop={60}>
                    <div className={styles.websiteInfo}>
                        <p>皖ICP备17013813号-2</p>
                        <p>version2.0</p>
                    </div>
                </Affix>

            </div>
        )
    }
}