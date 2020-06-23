import React, { useState , useRef , useEffect} from 'react'
import styles from './editor.less'
import { Button , Popover , Input , Tag , Tooltip , Upload, Modal} from 'antd';
import { SmileOutlined , PictureOutlined , LinkOutlined , NumberOutlined , PlusOutlined } from '@ant-design/icons';
import Emojis from '@/components/story/emojis'
import Topic from '@/components/story/topic'
import { getBase64 , pasteHtmlAtCaret } from '@/utils/common'

function Editor (props){

    const maxCount = 1000;//最大数量
    const maxFile = 8;//允许上传最大数值
    const uploadRef = useRef() //上传文件
    const editorRef = useRef() //编辑器

    const [ count, setCount ] = useState(maxCount);//文字倒计时
    const [ link, setLink ] = useState('');//超链接
    const [ fileList, setFileList ] = useState([]);//图集列表
    const [ topic, setTopic] = useState('');//话题
    const [previewVisible,setPreviewVisible] = useState(false)
    const [previewImage,setPreviewImage] = useState('')
    

    useEffect(
        () => {
            
        },[]
    );

    // 接收表情事件
    function receiveEmoji(data){

        editorRef.current.focus()
        pasteHtmlAtCaret(data) //添加元素
        elementNumber(editorRef.current)
    }

    // 自定义点击上传
    function onFileUpload(){
        uploadRef.current.click()

    }

    // 编辑器事件
    function editorChange(e){
        // console.log(e.keyCode,e.ctrlKey,e.metaKey,e.shiftKey,e.target.innerText)
        elementNumber(e.target)
        if(e.metaKey && e.shiftKey && e.keyCode === 16 && (count < 1000 && count > 0)){
            console.log('提交事件')
        }
        
    }

    // 计算元素剩余数量
   function elementNumber(el){
        let text = el.innerText;//获取文本
        let imgs = el.getElementsByTagName("img").length
        setCount(maxCount-(text.length+imgs*2)) //计算剩余数量
   }

    // 点击图片
    async function previewImageFun(file){
        if (!file.url) {
            file.url = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url)
        setPreviewVisible(true)
    }
    
    const urlHtml = <Input defaultValue={link} type="text" onPressEnter={e => setLink(e.target.value)} placeholder="输入域名地址（回车可以添加）"/>

    // 上传
    const uploadButton = (
        <div ref={uploadRef}>
          <PlusOutlined />
          <div className="ant-upload-text">上传</div>
        </div>
    );

    return (
        <div className={styles.editor}>
            <div className={styles.editorBody}>
                <div className={`${styles.content} ${(count < 1000 && count > 0)?styles.active:''}`}>
                        {/* 编辑器 */}
                        <div 
                        ref={editorRef}
                        suppressContentEditableWarning
                        // onKeyDown={editorChange}
                        onKeyUp={editorChange}
                        className={styles.document} 
                        contentEditable="true" 
                        placeholder="告诉你个小秘密，发帖子时添加话题会被更多小伙伴看见呦~"
                        spellCheck="true"></div>

                        {/* 统计 */}
                        <div className={`${styles.remainingWords} ${count<0?styles.error:''}`}>{count}</div>
                        {/* 图片集合 */}
                        
                        <div className={`${styles.atlas} ${fileList.length>0?'':styles.none}`}>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={ previewImageFun }
                                onChange={ ({fileList})=>{setFileList(fileList)} }
                                >
                                { fileList.length >= maxFile ? null : uploadButton}

                            </Upload>

                            <Modal
                                visible={previewVisible}
                                title={'图片预览'}
                                footer={null}
                                onCancel={ ()=>{setPreviewVisible(false)}  }
                                >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>

                        {/* 超链接 话题名字 */}
                        <div className={styles.tag}>
                            {
                                topic?<Tag color="blue">话题</Tag>:''
                            }
                        
                            {
                                link?(
                                    <Tooltip title="http://www.baidu.com">
                                        <a href="" style={{display:'inline-grid'}}>
                                            <Tag color="purple" icon={<LinkOutlined />} className={`${styles.link} text-line`}> 
                                                {link}
                                            </Tag>
                                        </a>
                                    </Tooltip>
                                ):''
                            }

                        </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.operation}>
                    <div className={styles.item}>
                        <Popover placement="bottom" content={<Emojis receiveEmoji={receiveEmoji}></Emojis>} trigger="click">
                            <Button type="link" className={styles.name} size={13}>
                                <SmileOutlined /> <span>表情</span>  
                            </Button>
                        </Popover> 
                    </div>
                    <div className={styles.item} onClick={ onFileUpload }> 
                        <Button type="link" className={styles.name} size={13} disabled={fileList.length >= maxFile ? true : false}>
                            <PictureOutlined /> <span>图片</span> 
                        </Button>
                    </div>
                    <div className={styles.item}> 
                        <Popover placement="bottom" content={urlHtml} trigger="click">
                            <Button type="link" className={styles.name} size={13}>
                                <LinkOutlined /> <span>链接</span> 
                            </Button>
                        </Popover> 
                    </div>
                    <div className={styles.item}>
                        <Popover placement="bottom" content={Topic} trigger="click" style="padding:0">
                            <Button type="link" className={styles.name} size={13}>
                                <NumberOutlined />  <span>话题</span> 
                            </Button>
                        </Popover> 
                    </div>
                </div>
                <div className={styles.submit}>
                    <span className={styles.hint}>Ctrl or ⌘ + Shift</span>
                    <Button type="primary" disabled={ (count >= 1000 || count < 0) }>发布</Button>
                </div>
            </div>
        </div>
    );
}

export default Editor;