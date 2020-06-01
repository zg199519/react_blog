import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '@/global.less'
import { Layout } from 'antd';
import HeaderZg from '@/layouts/header/Header'
const { Header, Footer, Content } = Layout;

class App extends Component {

  render(){
    return (
      <div>
        <Layout>
          {/* 头部 */}
          <Header style={{backgroundColor:'#ffffff',boxShadow: '0 2px 8px #f0f1f2'}}>
            <HeaderZg></HeaderZg>
          </Header>
          {/* 主体内容 */}
          <Content>
            {this.props.children}
          </Content>
          {/* 底部 */}
          <Footer></Footer>
        </Layout>
      </div>
    );
  }

}

export default App
