import React from 'react';
import { Space , Menu , Avatar , Input , Button , Dropdown , Divider} from 'antd';
import { Link } from 'umi';
import { CaretDownOutlined , EditOutlined} from '@ant-design/icons';
import styles from './header.less'
const { Search } = Input;

export default class Header extends React.Component{
    state = {
        current: 'post',
    };
    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render(){

        const menu = (
            <Menu>
              <Menu.Item>
                发布文章
              </Menu.Item>
              <Menu.Item>
                发布帖子
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item danger>写教程</Menu.Item>
            </Menu>
        );



        return(
            <div className={`container ${styles.box}`}>
                <Space size={42}>
                    <div className={styles.logo}><Avatar size={42} src={require('@/assets/images/logo.png')} /></div>
                    <div className={styles.navs}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                            <Menu.Item key="post"> <Link to="/">技术贴</Link>  </Menu.Item>
                            <Menu.Item key="tutorial"><Link to="/tutorial"> 小册 </Link> </Menu.Item>
                            <Menu.Item key="story"><Link to="/story"> 帖子 </Link> </Menu.Item>
                            <Menu.Item key="activity"><Link to="/activity"> 活动 </Link> </Menu.Item>
                        </Menu>
                    </div>
                    <div className={styles.search}>
                        
                        <Search
                            placeholder="请输入关键词"
                            style={{ width: 200 }}
                            enterButton
                        />


                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="primary" style={{marginLeft:'30px'}}>
                                发布
                            </Button>
                        </Dropdown>
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