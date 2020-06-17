import React, { useState , useRef , useEffect} from 'react'
import { Input , Typography , Avatar} from 'antd';
const { Search } = Input;
const { Title , Text} = Typography;

import styles from './topic.less'

function Topic (){

    // const [ emojiLists ] = useState(emojis);

    useEffect(
        () => {

        },[]
    );

    return (
        <div className={styles.topic}>
            <div className={styles.search}>
                <Search placeholder="输入话题关键词" onSearch={value => console.log(value)} enterButton />
            </div>
            <ul>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>
                <li className={styles.item}>
                    <div className={styles.cover}><Avatar size={42} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>话题标题</h4>
                        <Text type="secondary">888帖子</Text>
                    </div>
                </li>


            </ul>
        </div>
    );

}

export default Topic;