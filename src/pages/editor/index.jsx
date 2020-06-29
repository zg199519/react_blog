import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from 'for-editor';
import styles from './index.less';
import store from '@/store';
import { changeHeaderState } from '@/store/actionCreatores';
import { singleFileUpload } from '@/server/http';

export default class editor extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.$vm = React.createRef();
  }

  componentDidMount() {
    const action = changeHeaderState(false);
    store.dispatch(action);
  }

  componentWillUnmount() {
    const action = changeHeaderState(true);
    store.dispatch(action);
  }

  handleChange(value) {
    console.log(value);
    this.setState({
      value: value,
    });
  }

  // 保存
  saveEdit() {
    console.log(this.state.value);
  }

  // 添加图片
  async addImg($file) {
    // 上传图片到服务器
    let formData = new FormData();
    formData.append('file', $file);
    let data = await singleFileUpload(formData);
    this.$vm.current.$img2Url(data.data.fileName, data.data.url);
  }

  render() {
    const { value } = this.state;
    return (
      <div className={styles.editor}>
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
    );
  }
}
