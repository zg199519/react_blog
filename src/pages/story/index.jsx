import React from 'react';
import { Divider, Typography, Button, Tag } from 'antd';
const { Title, Text, Link, Paragraph } = Typography;
import styles from './index.less';
import SiderRight from '@/components/sider/index';
import UserInfo from '@/components/user/info';
import Editor from '@/components/story/editor';
import {
  LikeOutlined,
  MessageOutlined,
  ForkOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import { getCategoryList } from '@/server/story';
import { getList } from '@/server/home';
import { getScrollTop, getClientHeight, getScrollHeight } from '@/utils/common';
import { history } from 'umi';

export default class story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1, //页数
      pageSize: 10, //每页的数据集合
      list: [], //数据集合
      categoryList: [], //数据分类列表
      params: {
        topicId: undefined, //分类ID
      },
    };
  }

  //路由变化 初始化 改变变量的值
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.topicId !== prevState.params.topicId) {
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
    if (prevProps.match.params.topicId !== this.props.match.params.topicId) {
      this.getList();
    } else if (prevState.pageNo !== this.state.pageNo) {
      this.getList();
    }
  }

  componentDidMount() {
    this.getCategoryList(); //获取分类数据列表
    this.getList(); //获取数据列表
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

  // 获取数据列表
  async getList() {
    let params = this.state.params;

    const query = {
      type: 2,
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
    };
    if (params.topicId) {
      if (params.topicId != 'hot' && params.topicId != 'recommended') {
        query.topicId = params.topicId;
      } else {
        query.sort = params.topicId;
      }
    }

    let data = await getList(query);
    this.setState({
      list: this.state.list.concat(data.data),
    });
  }

  // 获取数据分类列表就是话题列表
  async getCategoryList() {
    let data = await getCategoryList();
    this.setState({
      categoryList: data.data,
    });
  }

  // 分类点击事件
  setCategoryFun = (code = '') => {
    // 跳转
    history.push(`/story${code ? '/' + code : ''}`);
  };

  render() {
    //分类列表
    let lists = this.state.list.map((item, index) => {
      return (
        <div className={styles.item} key={index}>
          <div className={styles.content}>
            <div className={styles.portrait}>
              <div
                className={styles.headPortrait}
                style={{ backgroundImage: `url(${item.portrait})` }}
              ></div>
            </div>

            <div className={styles.postContent}>
              <div className={styles.userMain}>
                <div className={styles.info}>
                  <Title level={4} className={styles.title}>
                    {item.name}
                  </Title>
                  <Text type="secondary" className={styles.text}>
                    {item.company} @ {item.job}·{item.creationTime}分钟前
                  </Text>
                </div>
                <div className={styles.operation}>
                  <Button danger size="small" className={styles.focus}>
                    关注
                  </Button>
                  <EllipsisOutlined className={styles.more} />
                </div>
              </div>

              <div className={styles.theText}>
                <Paragraph
                  ellipsis={{ rows: 6, expandable: true, symbol: 'more' }}
                >
                  {item.details}
                </Paragraph>
              </div>

              <div className={styles.atlasList}>
                {item.atlas.map((item1, number1) => {
                  return (
                    <div
                      className={styles.img}
                      style={{ backgroundImage: `url(${item1.url})` }}
                      key={number1}
                    ></div>
                  );
                })}
              </div>
              <div className={styles.tags}>
                <Tag color="blue">{item.topicName}</Tag>
                {/* {
                      item.topics.map((item2,number2)=>{
                            return (
                            <Tag color="blue" key={number2}>{item2.name}</Tag>
                            );
                      })
                  } */}
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.main}>
              {' '}
              <LikeOutlined />{' '}
              <span className={styles.text}>{item.likeCount}</span>{' '}
            </div>
            <Divider type="vertical" />
            <div className={styles.main}>
              {' '}
              <MessageOutlined />{' '}
              <span className={styles.text}>{item.commentsCount}</span>
            </div>
            <Divider type="vertical" />
            <div className={styles.main}>
              {' '}
              <ForkOutlined /> <span className={styles.text}>分享</span>
            </div>
          </div>
        </div>
      );
    });

    return (
      <section className={`container ${styles.story}`}>
        {/* 左侧菜单 */}
        <div className={styles.navigation}>
          <ul>
            <li
              className={
                this.state.params.topicId === 'hot' ||
                !this.state.params.topicId
                  ? styles.active
                  : ''
              }
              onClick={() => this.setCategoryFun('hot')}
            >
              热门
            </li>
            <li
              className={
                this.state.params.topicId === 'recommended' ? styles.active : ''
              }
              onClick={() => this.setCategoryFun('recommended')}
            >
              推荐
            </li>
            <Divider className={styles.divider} />
            {this.state.categoryList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={
                    this.state.params.topicId == item.id ? styles.active : ''
                  }
                  onClick={() => this.setCategoryFun(item.id)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.stream}>
          <div className={styles.container}>
            {/* 编辑发布文章 */}
            <div className={styles.editor}>
              <Editor></Editor>
            </div>
            {/* 数据列表 */}
            <div className={styles.lists}>{lists}</div>
          </div>
        </div>
        <div className={styles.sidebar}>
          <UserInfo></UserInfo>
          <SiderRight></SiderRight>
        </div>
      </section>
    );
  }
}
