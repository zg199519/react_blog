import Mock from 'mockjs'
let Random = Mock.Random;

export default {

    // 会员个人信息 
    '/api/user/info': Mock.mock({ 
        code: 10000,
        data: {
            portrait:Random.image('100x100', Random.color(), Random.cword(1)),
            name:Random.cword(10,40),
            position:Random.cword(10,40)
        }
    }),


    // 会员个人信息 
    '/api/user/statistical': Mock.mock({ 
        code: 10000,
        data: {
            postNum:20,
            focus:40,
            beFocus:100,
        }
    }),


    // 作者排行榜
    '/api/author/lists': Mock.mock({ 
        code: 10000,
        data:{
            list:()=>{
                let lists = []
                for (let index = 0; index < 6; index++) {
                    lists.push({
                        portrait:Random.image('100x100', Random.color(), Random.cword(1)),
                        name: Random.cword(10,40),
                        company: Random.cword(4,20),//企业
                        job: Random.cword(8,16)//
                    })
                }
                return lists
            },
            
        }
    })

    


}
