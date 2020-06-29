import React from 'react';
import {
  Space,
  Menu,
  Avatar,
  Input,
  Button,
  Dropdown,
  Divider,
  Layout,
} from 'antd';
import { Link, history } from 'umi';
import { CaretDownOutlined, EditOutlined } from '@ant-design/icons';
import styles from './header.less';
const { Search } = Input;
import store from '@/store/index';
const { Header } = Layout;

export default class HeaderTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'post',
      showHeader: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);

    store.subscribe(this.handleStoreChange);
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  // 状态变化后的
  handleStoreChange() {
    const { headerShow } = store.getState();
    this.setState({
      showHeader: headerShow,
    });
  }

  componentDidMount() {
    this.handleStoreChange();
    this.getRouterState(); //判断路由状态
  }

  //判断路由状态
  getRouterState() {
    let pathname = history.location.pathname; //获取路由name
    let current = '';
    if (pathname.indexOf('/home') != -1) {
      current = 'post';
    } else if (pathname.indexOf('/story') != -1) {
      current = 'story';
    } else if (pathname.indexOf('/tutorial') != -1) {
      current = 'tutorial';
    } else if (pathname.indexOf('/activity') != -1) {
      current = 'activity';
    }
    this.setState({
      current: current,
    });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/editor">发布文章</Link>
        </Menu.Item>
        <Menu.Item disabled>发布帖子</Menu.Item>
        <Menu.Divider />
        <Menu.Item disabled>写教程</Menu.Item>
      </Menu>
    );

    return (
      <div>
        {this.state.showHeader ? (
          <Header
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px #f0f1f2',
            }}
          >
            <div className={`container ${styles.box}`}>
              <Space size={42}>
                <div className={styles.logo}>
                  <Avatar size={42} src={require('@/assets/images/logo.png')} />
                </div>
                <div className={styles.navs}>
                  <Menu
                    mode="horizontal"
                    selectedKeys={[this.state.current]}
                    onClick={this.handleClick}
                  >
                    <Menu.Item key="post">
                      {' '}
                      <Link to="/">技术贴</Link>{' '}
                    </Menu.Item>
                    <Menu.Item key="story">
                      <Link to="/story"> 帖子 </Link>{' '}
                    </Menu.Item>
                    <Menu.Item key="tutorial">
                      <Link to="/tutorial"> 小册 </Link>{' '}
                    </Menu.Item>
                    <Menu.Item key="activity">
                      <Link to="/activity"> 活动 </Link>{' '}
                    </Menu.Item>
                  </Menu>
                </div>
                <div className={styles.search}>
                  <Search
                    placeholder="请输入关键词"
                    style={{ width: 200 }}
                    enterButton
                  />

                  <Dropdown overlay={menu} trigger={['click']}>
                    <Button type="primary" style={{ marginLeft: '30px' }}>
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
          </Header>
        ) : (
          ''
        )}
      </div>
    );
  }
}
