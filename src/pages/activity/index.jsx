import React from 'react';
import { Row, Col , Button} from 'antd';
import {
  ScheduleOutlined
} from '@ant-design/icons';
import styles from './index.less'

import { getActivityList } from '@/server/activity'

export default class message extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        list:[],//数据集合
    }
  }

  componentDidMount(){
    this.getList()//获取数据列表
  }

  // 获取分类数据列表
  async getList(){
    let data = await getActivityList();
    this.setState({
      list:data.data.list
    })
  }



  render() {
    return (
        <section>
          <div className={`container ${styles.context}`}>
          <Row gutter={16}>

            {
                this.state.list.map((item,index)=>{
                  return (
                    <Col className="gutter-row" span={6} key={index}>
                    <div className={styles.item}>
                      <div className={styles.cover} style={{backgroundImage:`url(${item.cover})`}}></div>
                      <div className={styles.info}>
                        <h4 className={`${styles.title} text-two`}>{item.title}</h4>
                        <div className={styles.dateTime}> <ScheduleOutlined /> {item.creationDate} </div>
                        <div className={styles.signUp}>
                            <div className={styles.address}>{item.city}</div>
                            <Button type="primary" size="small">立即报名</Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  )
                })
            }

          </Row>
          </div>
        </section>
    );
  }

}

