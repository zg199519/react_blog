import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from 'for-editor';
import styles from './index.less';
import store from '@/store';
import { changeHeaderState } from '@/store/actionCreatores';
import { singleFileUpload } from '@/server/http';
import {
  PlusCircleFilled,
  SettingFilled,
  PlusOutlined,
  DeleteFilled,
  ToolFilled,
} from '@ant-design/icons';

import { getMyList } from '@/server/tutorial';
import { categoryList } from '@/server/http';
import {
  myArticleList,
  articleDetail,
  addBook,
  addArticle,
  modifyBook,
  modifyArticle,
} from '@/server/home';
import { history } from 'umi';

import {
  Drawer,
  Button,
  Radio,
  Space,
  Form,
  Input,
  Checkbox,
  Select,
  Upload,
  message,
} from 'antd';

export default class editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', //富文本编辑器内容
      list: [], //书籍列表
      articleList: [], //文章列表
      bookId: null, //书ID
      articleId: null, //文章ID
      visible: false,
      placement: 'left',
      categoryList: [], //小册分类
      bookCoverUrl: '', //小册的封面地址
      visibleArticle: false, //是否显示新增文章
      bId: null, //小册ID
      aId: null, //文章ID
    };
    this.onClose = this.onClose.bind(this);
    this.onDrawerOk = this.onDrawerOk.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.uploadChange = this.uploadChange.bind(this);
    this.addArticle = this.addArticle.bind(this);

    this.$vm = React.createRef();
    this.$formBook = React.createRef();
    this.$formArticle = React.createRef();
  }

  componentDidMount() {
    const action = changeHeaderState(false);
    store.dispatch(action);
    this.getListArr();
  }

  componentWillUnmount() {
    const action = changeHeaderState(true);
    store.dispatch(action);
  }

  // 实时编辑赋值
  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  // 保存内容
  async saveEdit() {
    // console.log(this.state.value);
    const params = {
      id: this.state.articleId,
      details: this.state.value,
    };
    await modifyArticle(params);

    message.success('保存成功...');
  }

  // 添加图片
  async addImg($file) {
    // 上传图片到服务器
    let formData = new FormData();
    formData.append('file', $file);
    let data = await singleFileUpload(formData);
    this.$vm.current.$img2Url(data.data.fileName, data.data.url);
  }

  // 获取数据列表小册
  async getList() {
    const params = {
      pageNo: 1,
      pageSize: 10000,
    };
    let data = await getMyList(params);
    this.setState({
      list: data.data,
    });
  }

  // 获取文章列表
  async getArticleList() {
    const params = {
      bookId: this.state.bookId,
      type: 3,
    };
    let data = await myArticleList(params);
    this.setState({
      articleList: data.data,
    });
  }

  // 获取文章详情
  async getArticleDetail() {
    const params = {
      id: this.state.articleId,
    };
    let data = await articleDetail(params);
    this.setState({
      value: data.data.details,
    });
  }

  // 点击书的
  async onBookClick(item) {
    this.setState({
      value: '',
    });
    history.push(`/editor_book/${item.id}`);
    //点击书
    this.getListArr(); //重新获取
  }

  // 点击文章的事件
  async onArticleClick(item) {
    this.setState({
      value: '',
    });
    history.push(`/editor_book/${this.state.bookId}/${item.id}`);
    //点击书
    this.getListArr(); //重新获取
  }

  // 获取数据组合
  async getListArr() {
    await this.getList(); //获取小册列表
    if (this.state.list.length > 0) {
      // 有小册数据
      let bookId = this.state.list[0].id;
      if (this.props.match.params.bookId) {
        bookId = this.props.match.params.bookId;
      }
      this.setState({
        bookId: bookId,
      });

      await this.getArticleList(); //获取文章列表
      if (this.state.articleList.length > 0) {
        let articleId = this.state.articleList[0].id;
        if (this.props.match.params.articleId) {
          articleId = this.props.match.params.articleId;
        }
        this.setState({
          articleId: articleId,
        });
        await this.getArticleDetail();
      }
    }
  }

  // 获取分类数据列表
  async getCategoryList() {
    let data = await categoryList({ parentId: -1 });
    this.setState({
      categoryList: data.data,
    });
  }

  // 关闭新增弹框
  async onClose(code = 1) {
    if (code === 1) {
      // 重置 小册表单
      this.$formBook.current.resetFields();
      this.setState({
        visible: false,
      });
    } else if (code === 2) {
      // 重置 文章表单
      this.$formArticle.current.resetFields();
      this.setState({
        visibleArticle: false,
      });
    }
    this.setState({
      bookCoverUrl: '',
    });
  }

  // 打开新弹框
  async onDrawerOk() {
    this.getCategoryList(); //获取小册分类
    this.setState({
      bId: null,
      visible: true,
    });
  }

  // 添加文章
  async addArticle() {
    this.setState({
      aId: null,
      visibleArticle: true,
    });
  }

  // 修改书籍
  async modifyBook(item) {
    this.setState(
      {
        bId: item.id,
        bookCoverUrl: item.cover,
        visible: true,
      },
      () => {
        setTimeout(() => {
          this.$formBook.current.setFieldsValue({
            title: item.title,
            categoryId: item.categoryId,
            desc: item.desc,
          });
        }, 200);
      },
    );
  }

  // 修改文章

  async modifyArticle(item) {
    this.setState(
      {
        aId: item.id,
        bookCoverUrl: item.cover,
        visibleArticle: true,
      },
      () => {
        setTimeout(() => {
          this.$formArticle.current.setFieldsValue({
            title: item.title,
            desc: item.desc,
          });
        }, 200);
      },
    );
  }

  // 上传
  async uploadChange(info) {
    // 上传图片到服务器
    let formData = new FormData();
    formData.append('file', info.file.originFileObj);
    let data = await singleFileUpload(formData);
    this.setState({
      bookCoverUrl: data.data.url,
    });
    // console.log(data)
    // this.$vm.current.$img2Url(data.data.fileName, data.data.url);
  }
  // 新增小册表单成功后执行
  async onFinish(values) {
    const params = {
      categoryId: values.categoryId,
      desc: values.desc,
      title: values.title,
    };
    if (this.state.bookCoverUrl) {
      params.cover = this.state.bookCoverUrl;
    }

    if (this.state.bId) {
      // 修改
      params.id = this.state.bId;
      let data = await modifyBook(params);
    } else {
      let data = await addBook(params);
    }

    this.getList();
    this.onClose();
  }

  // 新增文章
  async onArticleFinish(values) {
    const params = {
      desc: values.desc,
      title: values.title,
    };
    if (this.state.bookCoverUrl) {
      params.cover = this.state.bookCoverUrl;
    }
    if (this.state.aId) {
      // 修改
      params.id = this.state.aId;
      await modifyArticle(params);
    } else {
      params.bookId = this.state.bookId;
      params.recommended = 1;
      params.type = 3;
      params.details = '';
      await addArticle(params);
    }
    // 刷新页面
    this.getArticleList();
    // 关闭页面
    this.onClose(2);
  }

  // 删除文章
  async delArticle(item) {
    const params = {
      id: item.id,
      isDel: 0,
    };
    await modifyArticle(params);
    // 刷新页面
    this.getArticleList();
  }

  // 删除小册
  async delBook(item) {
    const params = {
      id: item.id,
      through: 3,
    };
    await modifyBook(params);
    // 刷新页面
    this.getList();
  }

  render() {
    const { value } = this.state;

    const uploadButton = (
      <div className={styles.uploadCover}>
        {<PlusOutlined />}
        <div>上传</div>
      </div>
    );

    return (
      <div className={styles.editorBook}>
        <div className={styles.nav}>
          <div className={styles.bookLists}>
            <li className={styles.noneBg} onClick={this.onDrawerOk}>
              {' '}
              <PlusCircleFilled /> <span className={styles.name}>
                添加小册
              </span>{' '}
            </li>
            <ul>
              {this.state.list.map((item, index) => {
                return (
                  <li
                    className={`${styles.title} ${
                      item.id == this.state.bookId ? styles.active : ''
                    }`}
                    key={index}
                  >
                    <div
                      className={`text-line ${styles.leftName}`}
                      onClick={() => {
                        this.onBookClick(item);
                      }}
                    >
                      <span title={item.title}>📚 {item.title}</span>
                    </div>
                    <div
                      className={styles.setUp}
                      onClick={() => {
                        this.modifyBook(item);
                      }}
                    >
                      <ToolFilled />
                    </div>
                    <div
                      className={styles.delete}
                      onClick={() => {
                        this.delBook(item);
                      }}
                    >
                      <DeleteFilled />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={`${styles.nav} ${styles.rightNav}`}>
          <div className={styles.bookLists}>
            <li className={styles.noneBg} onClick={this.addArticle}>
              {' '}
              <PlusCircleFilled /> <span className={styles.name}>
                添加文章
              </span>{' '}
            </li>
            <ul>
              {this.state.articleList.map((item, index) => {
                return (
                  <li
                    className={`${styles.title} ${
                      item.id == this.state.articleId ? styles.active : ''
                    }`}
                    key={index}
                  >
                    <div
                      className={`text-line ${styles.leftName}`}
                      onClick={() => {
                        this.onArticleClick(item);
                      }}
                    >
                      <span title={item.title}>{item.title}</span>
                    </div>
                    <div
                      className={styles.setUp}
                      onClick={() => {
                        this.modifyArticle(item);
                      }}
                    >
                      <ToolFilled />
                    </div>
                    <div
                      className={styles.delete}
                      onClick={() => {
                        this.delArticle(item);
                      }}
                    >
                      <DeleteFilled />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.content}>
          <Editor
            ref={this.$vm}
            value={value}
            onChange={value => this.handleChange(value)}
            height="100vh"
            placeholder="开始编辑"
            subfield={true}
            preview={true}
            onSave={() => this.saveEdit()}
            addImg={file => this.addImg(file)}
          />
        </div>

        <Drawer
          title="新增小册"
          placement={this.state.placement}
          closable={false}
          onClose={() => {
            this.onClose(1);
          }}
          visible={this.state.visible}
          width={300}
          //   key={this.state.placement}
        >
          {/* 小册标题
           小册分类
           小册封面
           是否推荐
           小册描述 */}

          <Form
            // {...layout}
            name="addBook"
            // initialValues={{ remember: true }}
            onFinish={v => {
              this.onFinish(v);
            }}
            ref={this.$formBook}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: '小册标题必须输入!' }]}
            >
              <Input placeholder="请输入小册标题" />
            </Form.Item>
            <Form.Item
              label="小册封面："
              // valuePropName="fileList"
              // getValueFromEvent={normFile}
              // extra="longgggggggggggggggggggggggggggggggggg"
            >
              <Upload
                name="avatar"
                fileList={[]}
                listType="picture-card"
                className={styles.avatarUploader}
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                onChange={this.uploadChange}
              >
                {this.state.bookCoverUrl ? (
                  <img
                    src={this.state.bookCoverUrl}
                    style={{ width: '120px', height: '180px' }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="categoryId"
              rules={[{ required: true, message: '小册分类必选!' }]}
            >
              <Select placeholder="选择小册分类">
                {this.state.categoryList.map((item, index) => {
                  return (
                    <Select.Option value={item.id} key={index}>
                      {item.name}{' '}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="desc">
              <Input.TextArea placeholder="请输入小册描述" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                立即申请
              </Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer
          title="新增文章"
          placement={this.state.placement}
          closable={false}
          onClose={() => {
            this.onClose(2);
          }}
          visible={this.state.visibleArticle}
          width={300}
          // key={this.state.placement}
        >
          <Form
            // {...layout}
            name="addBook"
            ref={this.$formArticle}
            // initialValues={{ remember: true }}
            onFinish={v => {
              this.onArticleFinish(v);
            }}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: '请输入文章标题!' }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>
            <Form.Item name="desc">
              <Input.TextArea placeholder="请输入文章描述" />
            </Form.Item>
            <Form.Item label="文章封面：">
              <Upload
                name="avatar"
                fileList={[]}
                listType="picture-card"
                className={styles.avatarUploader}
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                onChange={this.uploadChange}
              >
                {this.state.bookCoverUrl ? (
                  <img
                    src={this.state.bookCoverUrl}
                    style={{ width: '120px', height: '120px' }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}
