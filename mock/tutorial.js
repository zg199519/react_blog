import Mock from 'mockjs'
let Random = Mock.Random;

export default {
    // 小册列表
    'POST /api/tutorial/getLists': Mock.mock({ 
        code: 10000,
        data:{
            total:100,
            list:()=>{
                let lists = []
                for (let index = 0; index < 10; index++) {
                    lists.push({
                        user:{ name: Random.cword(2,3) , portrait: Random.image('100x100', Random.color(), Random.cword(1))},//会员信息
                        cover: Random.image('100x100', Random.color(), Random.cword(1)),
                        readingTime:Random.integer(10,10000),//阅读时长
                        views:Random.integer(10,10000),//浏览量
                        chapters:Random.integer(10,100),//章节
                        title:Random.cword(10,40),//小册标题
                        desc:Random.cword(20,60),//小册描述
                        createdAt:Random.date(),
                        updatedAt:Random.date(),
                    })
                }
                return lists
            },
           
        }
    }),







}



