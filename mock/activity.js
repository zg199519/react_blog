import Mock from 'mockjs'
let Random = Mock.Random;

export default {
    // 帖子列表
    'POST /api/activity/lists': Mock.mock({ 
        code: 10000,
        data:{
            total:100,
            list:()=>{
                let lists = []
                for (let index = 0; index < 10; index++) {
                    lists.push({
                        cover:Random.image('200x100', Random.color(), Random.cword(1)),
                        creationDate: Random.date(),//创建时间
                        title:Random.cword(4,20),//标题
                        city:Random.cword(2,4)//城市
                    })
                }
                return lists
            },
           
        }
    })

}



