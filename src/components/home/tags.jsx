import React from 'react'
import { Button , Space} from 'antd';
import TagStyles from './tags.less'

export default class Tags extends React.Component{

    state = {
        tags:[
            {name:'全部',value:1},
            {name:'Vue',value:1},
            {name:'React',value:1},
            {name:'小程序',value:1},
            {name:'Flutter/Dart',value:1},
            
            {name:'Html5',value:1},
            {name:'Css3',value:1},
            {name:'Es6',value:1},
            {name:'Node.js',value:1},
            {name:'Npm',value:1},

            {name:'Php',value:1},
            {name:'Java',value:1},
            {name:'Python',value:1},
            {name:'Es6',value:1},
            {name:'Node.js',value:1},
            {name:'Npm',value:1},
            {name:'Flutter/Dart',value:1}
        ]
    }

    render(){

        // 标签循环
        let tags = this.state.tags.map((item,index)=>{
           return <Button key={index} shape="round" size="small" className={TagStyles.tag}>{item.name}</Button>
        })


        return(
            <div>
                <div className={TagStyles.classification}>
                    <div className={`container ${TagStyles.item}`}>
                        <Button type="link" className={TagStyles.button}>全部</Button>
                        <Button type="link" className={TagStyles.button}>前端</Button>
                        <Button type="link" className={TagStyles.button}>后端</Button>
                        <Button type="link" className={TagStyles.button}>运维</Button>
                    </div>
                </div>

                {
                    this.props.code
                    ?
                        <div className="container">
                            <Space className={TagStyles.lists} size={14}>
                                {tags}
                            </Space>
                        </div>
                    :
                    ''
                }
            </div>
        )
    }

}
