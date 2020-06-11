import Mock from 'mockjs'
let Random = Mock.Random;

export default {
    // 技术贴列表数据
    'POST /api/home/getLists': Mock.mock({ 
        code: 10000,
        data:{
            total:100,
            list:()=>{
                let lists = []
                for (let index = 0; index < 10; index++) {
                    lists.push({
                        user:{ name: Random.cword(2,3) },//会员信息
                        hot:true,//是否推荐
                        title:Random.cword(10,40),
                        cover: Random.image('100x100', Random.color(), Random.cword(1)),
                        commentsCount:Random.integer(10,10000),
                        likeCount:Random.integer(80,10000),
                        category:{name:'前端'},
                        tags:[{title:'Vue'}],
                        createdAt:Random.date(),
                        updatedAt:Random.date(),
                    })
                }
                return lists
            },
           
        }
    }),







}



