import React from 'react';
import { Layout, Divider, Button, Avatar } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SiderRight from '@/components/sider/index';
import Tags from '@/components/home/tags';
import styles from './index.less';
import { getScrollTop, getClientHeight, getScrollHeight } from '@/utils/common';

import { getList } from '@/server/tutorial';

export default class tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1, //页数
      pageSize: 10, //每页的数据集合
      list: [], //数据集合
      params: {
        category: undefined, //分类ID
      },
    };
  }

  //路由变化 初始化 改变变量的值
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.category !== prevState.params.category) {
      return {
        pageNo: 1, //页数
        list: [], //数据集合
        params: nextProps.match.params,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.getList();
    } else if (prevState.pageNo !== this.state.pageNo) {
      this.getList();
    }
  }

  componentDidMount() {
    this.getList();
    window.addEventListener('scroll', this.handleScroll);
  }

  // 卸载过程中
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let isScrollBottom =
      parseInt(getScrollTop()) +
      parseInt(getClientHeight()) -
      parseInt(getScrollHeight());
    if (isScrollBottom >= -40) {
      let pageNum = this.state.pageNo + 1;
      this.setState({
        pageNo: pageNum,
      });
    }
  };

  // 获取数据列表小册
  async getList() {
    const params = {
      category: this.state.params.category,
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
    };
    let data = await getList(params);
    this.setState({
      list: this.state.list.concat(data.data),
    });
  }

  render() {
    const lists = this.state.list.map((item, index) => {
      return (
        <div className={styles.item} key={index}>
          <div
            className={styles.theCover}
            style={{ backgroundImage: `url(${item.cover})` }}
          ></div>
          <div className={styles.info}>
            <div className={`${styles.title} text-line`}>{item.title}</div>
            <div className={`${styles.desc} text-two`}>{item.desc}</div>
            <div className={`${styles.author} text-line`}>
              <Avatar size={30} src={item.user.portrait} />
              <span className={styles.name}>{item.name}</span>
              <span>
                阅读时长{item.wordNum}秒.{item.views}浏览.{item.chapters}节
              </span>
            </div>
          </div>
        </div>
      );
    });

    return (
      <section>
        <Tags code={false} jump={'tutorial'} />
        <div className={`container ${styles.welcomeContext}`}>
          <Layout>
            <Content className={styles.content}>
              <div className={styles.main}>
                <div className={styles.volumeList}>{lists}</div>
              </div>
            </Content>
            <Sider className={`background-none`} width={240}>
              <SiderRight></SiderRight>
            </Sider>
          </Layout>
        </div>
      </section>
    );
  }
}
