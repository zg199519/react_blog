import React from 'react'
import { Avatar , Typography , Divider} from 'antd';
import styles from './info.less'


export default class info extends React.Component{
    render(){
        return (
            <div className={styles.info}>
                <div className={styles.basicInfo}>
                    <Avatar size={62} src="http://qzapp.qlogo.cn/qzapp/101541263/16392CE435BE52E10D52974E97F9F894/50" />
                    <div className={styles.mation}>
                        <h3 className={styles.title}>标题标题标题标题</h3>
                        <p className={styles.desc}>加上就很大webdsa</p>
                    </div>
                </div>
                <Divider className={styles.divider}></Divider>
                <div className={styles.statistical}>

                    <div className={styles.item}>
                        <div className={styles.title}>标题</div>
                        <div className={styles.count}>288</div>
                    </div>
                    <Divider type="vertical" />
                    <div className={styles.item}>
                        <div className={styles.title}>标题</div>
                        <div className={styles.count}>288</div>
                    </div>
                    <Divider type="vertical" />
                    <div className={styles.item}>
                        <div className={styles.title}>标题</div>
                        <div className={styles.count}>288</div>
                    </div>
                    

                </div>
            </div>
        )
    }
}