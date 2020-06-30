import React from 'react';
import { Layout, Divider, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Tags from '@/components/home/tags';
import SiderRight from '@/components/sider/index';
import indexStyles from './index.less';
import { LikeFilled, MessageFilled, ChromeFilled } from '@ant-design/icons';

import { getList } from '@/server/home';
import {
  getTimer,
  getScrollTop,
  getClientHeight,
  getScrollHeight,
} from '@/utils/common';

import { history } from 'umi';

export default class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1, //页数
      pageSize: 10, //每页的数据集合
      list: [], //数据集合
      finished: false, //是否处于下拉刷新
      params: { category: undefined, tag: undefined }, //路由参数category: null, tag: null
      sort: 'newest', //排序 默认是推荐
    };
    this.setSort = this.setSort.bind(this);
  }

  // 主要是初始化 state 的值 1
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.match.params) !==
      JSON.stringify(prevState.params)
    ) {
      return {
        pageNo: 1,
        list: [],
        params: nextProps.match.params,
        sort: 'newest',
      };
    } else {
      return null;
    }
  }

  // 第一次运行 2
  componentDidMount() {
    this.getLists();
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

  // 组件更新
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.getLists();
    } else if (prevProps.match.params.tag !== this.props.match.params.tag) {
      this.getLists();
    } else if (prevState.sort !== this.state.sort) {
      this.getLists();
    } else if (prevState.pageNo !== this.state.pageNo) {
      this.getLists();
    }
  }

  // 获取数据列表
  async getLists() {
    let params = this.state.params;
    let requestData = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      type: 1, //文章
      category: params.category ? params.category : null, //分类ID
      tag: params.tag ? params.tag : null, //二级分类标签ID
      sort: this.state.sort, //排序
    };
    let data = await getList(requestData);
    this.setState({
      list: this.state.list.concat(data.data),
    });

    // if(data.data.length < this.state.pageSize){
    //   this.state.finished = true
    // }
  }

  // 更改排序规则
  setSort(code = 'newest') {
    if (code !== this.state.sort) {
      this.setState({
        sort: code,
        pageNo: 1,
        list: [],
      });
    }
  }

  render() {
    // 列表数据
    let itemLists = this.state.list.map((item, index) => {
      // let tagText = ''
      // item.tags.forEach((v)=>{
      //   tagText+=v.title
      // })

      return (
        <div className={indexStyles.item} key={index}>
          <div className={indexStyles.infoBox}>
            <div className={indexStyles.hint}>
              <span style={{ color: '#b71ed7' }}>
                {item.recommended === 1 ? '推荐' : ''}
              </span>
              <span className={indexStyles.segment}>.</span>
              <span className={indexStyles.name}>{item.name}</span>
              <span className={indexStyles.segment}>.</span>
              <span>{getTimer(item.creationTime)}</span>
              <span className={indexStyles.segment}>.</span>
              <span className={`${indexStyles.tag} ${indexStyles.name}`}>
                {item.cname}
              </span>
              <span className={indexStyles.name}>{item.tagName}</span>
            </div>
            <div className={`text-line ${indexStyles.title}`}>{item.title}</div>
            <div className={indexStyles.operation}>
              <Button
                className={indexStyles.but}
                icon={<LikeFilled />}
                size="small"
              >
                <span>{item.likeCount}</span>{' '}
              </Button>
              <Button
                className={`${indexStyles.but} ${indexStyles.borNone}`}
                icon={<MessageFilled />}
                size="small"
              >
                <span>{item.commentsCount}</span>
              </Button>
              <Button
                className={`${indexStyles.but} ${indexStyles.share}`}
                icon={<ChromeFilled />}
                size="small"
              >
                <span>分享</span>
              </Button>
            </div>
          </div>
          <div
            className={indexStyles.cover}
            style={{ backgroundImage: `url(${item.cover})` }}
          ></div>
        </div>
      );
    });

    return (
      <section>
        <div>
          <Tags code={true} jump={'home'} />
          <div className={`container ${indexStyles.welcomeContext}`}>
            <Layout>
              <Content className={indexStyles.content}>
                <div className={indexStyles.main}>
                  <header className={indexStyles.listHeaerNav}>
                    <Button
                      type="link"
                      className={`${indexStyles.nav} ${
                        this.state.sort === 'recommended'
                          ? indexStyles.active
                          : ''
                      }`}
                      onClick={() => {
                        this.setSort('recommended');
                      }}
                    >
                      推荐
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      type="link"
                      className={`${indexStyles.nav} ${
                        this.state.sort === 'newest' ? indexStyles.active : ''
                      }`}
                      onClick={() => {
                        this.setSort('newest');
                      }}
                    >
                      最新
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      type="link"
                      className={`${indexStyles.nav} ${
                        this.state.sort === 'hot' ? indexStyles.active : ''
                      }`}
                      onClick={() => {
                        this.setSort('hot');
                      }}
                    >
                      热榜
                    </Button>
                  </header>
                  <div className={indexStyles.dataLists}>{itemLists}</div>
                </div>
              </Content>
              <Sider className={`background-none`} width={240}>
                <SiderRight></SiderRight>
              </Sider>
            </Layout>
          </div>
        </div>
      </section>
    );
  }
}
