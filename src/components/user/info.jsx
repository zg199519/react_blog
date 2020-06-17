import React, { useState , useEffect } from 'react';
import { Avatar , Typography , Divider} from 'antd';
import styles from './info.less'

import { getUserInfo , getUserStatistical} from '@/server/user'

function info() {
     // 声明一个叫 “count” 的 state 变量。 
    const [ userInfo, setUserInfo ] = useState({});
    const [ statistical, setStatistical ] = useState({});

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(
        () => {
            getInfo()
            getStatistical()
        },[]
    );

    async function getInfo(){
        let data = await getUserInfo();
        setUserInfo(data.data)
    }

    async function getStatistical(){
        let data = await getUserStatistical();
        setStatistical(data.data)
    }


    return (
        <div className={styles.info}>
            <div className={styles.basicInfo}>

                <Avatar size={62} src={userInfo.portrait} className={styles.portrait}/>
                <div className={styles.mation}>
                    <h3 className={`${styles.title} text-line`}>{userInfo.name}</h3>
                    <p className={`${styles.desc} text-two`}>{userInfo.position}</p>
                </div>

            </div>
            <Divider className={styles.divider}></Divider>
            <div className={styles.statistical}>

                <div className={styles.item}>
                    <div className={styles.title}>帖子</div>
                    <div className={styles.count}>{statistical.postNum}</div>
                </div>
                <Divider type="vertical" />
                <div className={styles.item}>
                    <div className={styles.title}>关注</div>
                    <div className={styles.count}>{statistical.focus}</div>
                </div>
                <Divider type="vertical" />
                <div className={styles.item}>
                    <div className={styles.title}>关注者</div>
                    <div className={styles.count}>{statistical.beFocus}</div>
                </div>
                

            </div>
        </div>
    );
}

export default info