import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '@/global.less';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import HeaderZg from '@/layouts/header/Header';
const { Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <ConfigProvider locale={zhCN}>
          <Layout>
            {/* 头部 */}
            <HeaderZg></HeaderZg>
            {/* 主体内容 */}
            <Content>{this.props.children}</Content>
            {/* 底部 */}
            {/* <Footer></Footer> */}
          </Layout>
        </ConfigProvider>
      </div>
    );
  }
}

export default App;
