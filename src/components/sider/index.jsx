import React from 'react'
import { Avatar , Button} from 'antd';

import {
    CaretRightOutlined
  } from '@ant-design/icons';
import styles from './index.less'

export default class sider extends React.Component{
    render(){
        return(
            <div className={styles.home}>
                {/* 广告模块 */}
                <div className={styles.advertising}>
                    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*C1-TT7vgidAAAAAAAAAAAABkARQnAQ"/>
                    <div className={styles.tag}>广告</div>
                </div>
                {/* 作者榜单模块 */}
                <div className={styles.authorList}>
                    <div className={styles.title}>🎖️作者榜单</div>
                    <ul className={styles.lists}>
                        <li className={styles.item}>
                            <div className={styles.portrait}>
                                <Avatar size={46}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>
                            <div className={styles.info}>
                                <div className={`${styles.name} text-line`}>夏日里的一把阳光</div>
                                <div className={`${styles.desc} text-two`}>大大萨达撒撒大萨达所大萨达撒大所大萨达撒撒大萨达所大萨达撒大所萨达撒大所</div>
                            </div>
                        </li>

                        <li className={styles.item}>
                            <div className={styles.portrait}>
                                <Avatar size={46}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>
                            <div className={styles.info}>
                                <div className={`${styles.name} text-line`}>夏日里的一把阳光</div>
                                <div className={`${styles.desc} text-two`}>大大萨达撒撒大萨达所大萨达撒大所大萨达撒撒大萨达所大萨达撒大所萨达撒大所</div>
                            </div>
                        </li>

                        <li className={styles.item}>
                            <div className={styles.portrait}>
                                <Avatar size={46}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>
                            <div className={styles.info}>
                                <div className={`${styles.name} text-line`}>夏日里的一把阳光</div>
                                <div className={`${styles.desc} text-two`}>大大萨达撒撒大萨达所大萨达撒大所大萨达撒撒大萨达所大萨达撒大所萨达撒大所</div>
                            </div>
                        </li>



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
                        <li className={styles.item}>
                            <div className={styles.portrait} style={{backgroundImage:`url(${'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'})`}}>
                   
                            </div>
                            <div className={styles.info}>
                                <div className={`${styles.name} text-two`}>夏日里的一把阳光夏日里的一把阳光夏日里的一把阳光</div>
                                <div className={`${styles.desc} text-line`}>
                                    <span>998人已看 </span>    
                                    <Button type="primary" size="small" className={styles.buto}>查看</Button>
                                </div>
                            </div>
                        </li>

                        <li className={styles.item}>
                            <div className={styles.portrait} style={{backgroundImage:`url(${'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'})`}}>
                   
                            </div>
                            <div className={styles.info}>
                                <div className={`${styles.name} text-two`}>夏日里的一把阳光夏日里的一把阳光夏日里的一把阳光</div>
                                <div className={`${styles.desc} text-line`}>
                                <span>998人已看 </span>    
                                    <Button type="primary" size="small" className={styles.buto}>查看</Button>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <div className={`${styles.title} ${styles.all}`}>
                        查看更多
                        <CaretRightOutlined />
                    </div>

                </div>

                {/* 底部的备案号 和版本 */}
                <div className={styles.websiteInfo}>
                    <p>皖ICP备17013813号-2</p>
                    <p>version2.0</p>
                </div>




                
            </div>
        )
    }
}