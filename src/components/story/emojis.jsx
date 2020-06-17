import React, { useState , useRef , useEffect} from 'react'
import styles from './emojis.less'
import { emojis } from '@/utils/config'

function Emojis (props){
    console.log(props)

    const [ emojiLists ] = useState(emojis);

    useEffect(
        () => {

        },[]
    );

    // 点击图标
    function setEmoji(info,domain){
        let url = `<img src="${domain}${info.name}.svg"/>`
        props.receiveEmoji(url)
    }

    return (
        <div className={styles.emojis}>
            <ul>
                {
                    emojiLists.list.map((item,index)=>{
                        return (
                            <li key={index} onClick={()=>{setEmoji(item,emojiLists.domain)}}>
                                <img src={`${emojiLists.domain}${item.name}.svg`}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );

}

export default Emojis;