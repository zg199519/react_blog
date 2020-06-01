import React from 'react';
import { Space , Menu , Avatar , Input , Button } from 'antd';
import { Link } from 'umi';
import styles from './header.less'
const { Search } = Input;

export default class Header extends React.Component{
    state = {
        current: 'post',
    };
    handleClick = (e: { key: any; }) => {
        this.setState({
            current: e.key,
        });
    };

    render(){
        return(
            <div className={`container ${styles.box}`}>
                <Space size={42}>
                    <div className={styles.logo}><Avatar size={42} src={require('@/assets/images/logo.png')} /></div>
                    <div className={styles.navs}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                            <Menu.Item key="post"> <Link to="/">技术贴</Link>  </Menu.Item>
                            <Menu.Item key="tutorial"><Link to="/tutorial"> 小册 </Link> </Menu.Item>
                            <Menu.Item key="story"><Link to="/story"> 故事 </Link> </Menu.Item>
                            <Menu.Item key="message"><Link to="/message"> 我的留言 </Link> </Menu.Item>
                        </Menu>
                    </div>
                    <div className={styles.search}>
                   
                        <Search
                            placeholder="请输入关键词"
                            style={{ width: 200 }}
                            enterButton
                        />

                    </div>
                </Space>
                <div className={styles.user}>
                <Button type="link" block>
                    登录/注册
                </Button>
                </div>
            </div>
        )
    }


}