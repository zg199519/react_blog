import Mock from 'mockjs'
let Random = Mock.Random;

export default {
    // 分类列表
    '/api/category/lists': Mock.mock({ 
        code: 10000,
        data: [
            {name:'后端',id:1},
            {name:'前端',id:2},
            {name:'Android',id:3},
            {name:'ios',id:4},
            {name:'人工智能',id:5},
            {name:'开发工具',id:6},
            {name:'代码人生',id:7},
            {name:'阅读',id:8}
        ]
    }),

    // 二级分类标签列表
    '/api/tags/lists': Mock.mock({ 
        code: 10000,
        data: [
            {name:'Java',tagId:1},
            {name:'Spring',tagId:2},
            {name:'Go',tagId:3},
            {name:'MySQL',tagId:4},
            {name:'Redis',tagId:5},
            {name:'Python',tagId:6},
            {name:'Linux',tagId:7},
            {name:'JVM',tagId:8}
        ]
    }),

    // 广告
    '/api/advertising': Mock.mock({ 
        code: 10000,
        data: {
            img:Random.image('100x100', Random.color(), Random.cword(1)),
            name:'广告'
        }
    }),




}



