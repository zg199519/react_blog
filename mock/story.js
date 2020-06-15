import Mock from 'mockjs'
let Random = Mock.Random;

export default {
    // 帖子列表
    'POST /api/story/lists': Mock.mock({ 
        code: 10000,
        data:{
            total:100,
            list:()=>{
                let lists = []
                for (let index = 0; index < 10; index++) {
                    lists.push({
                        user:{ 
                            name: Random.cword(2,3),//会员昵称 
                            company: Random.cword(4,10),//公司昵称 
                            job: Random.cword(4,8),//岗位
                            portrait: Random.image('100x100', Random.color(), Random.cword(1)),//会员头像
                        },//会员信息
                        creationTime: Random.date(),//创建时间
                        content:Random.cparagraph(),//内容
                        pictures:[
                            Random.image('100x100', Random.color(), Random.cword(1)),
                            Random.image('100x100', Random.color(), Random.cword(1)),
                            Random.image('100x100', Random.color(), Random.cword(1)),
                            Random.image('100x100', Random.color(), Random.cword(1))
                        ],
                        topics:[
                            {name:Random.cword(2,6),id:1},
                            {name:Random.cword(2,6),id:2}
                        ]//话题集合
                    })
                }
                return lists
            },
           
        }
    }),


    // 帖子分类
    '/api/story/categoryList': Mock.mock({ 
        code: 10000,
        data: [
            {name:'吹牛',id:1},
            {name:'生活',id:2},
            {name:'招聘',id:3},
            {name:'交友',id:4},
            {name:'感情',id:5}
        ]
    }),




}



