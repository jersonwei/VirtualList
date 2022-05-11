const Mock = require('mockjs')
const express = require('express')
const app = express()

// 根据传入的参数num,生成num条模拟的数据列表
function generatprList(num){
    return Mock.mock({
        [`list|${num}`]:[
            {
                // 模拟ID,自增方式增加
                'id|+1':1,
                // 模拟标题,中文字符串长度为15到25位,
                // c开头表示中文
                title: "@ctitle(15,25)",
                // 模拟图片索引,自然数从0-15
                image: "@natural(0,15)",
                // 模拟访问人数,自然数从0-99999
                reads: "@natural(0,99999)",
                // 模拟新闻来源,中文字符串长度3-10位
                from: "@ctitle(3,10)",
                // 模拟发布时间,时间格式
                data: "@date('yyyy-MM-dd')"   
            }
        ]
    })
}

// 允许跨域请求返回数据
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,OPTIONS"),
    res.header("Access-Control-Allow-Headers","X-Requested-With"),
    res.header("Access-Control-Allow-Headers","Content-Type")
    next()
})

// 截取路由并返回数据
app.get("/data",function(req,res){
    // 获取get请求数据条数参数num
    const {num} = req.query
    return res.send(generatprList(num))
})

// 设置端口并打印对应的调用结果
const server = app.listen(4000, function(){
    console.log('本地mock服务启动,接口地址为:http://localhost:4000/data?num=请求列表数据')
}) 