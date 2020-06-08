import mockjs from 'mockjs'
export default {
    // home  模块

    // 
    '/api/home/getLists': mockjs.mock({ 
        'list|10': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
     }),
}