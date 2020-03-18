
const { HanLP, toJson } = require('..')

console.log(toJson(HanLP.segment('你好，欢迎在Python中调用HanLP的API')))
