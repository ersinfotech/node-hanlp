# node-hanlp

hanlp for nodejs, 着重拓展性

## 如何使用

```
npm install @ersinfotech/node-hanlp
```

## 准备工作

下载HanLP相关数据以及examples中训练模型所需要的语料

```sh
# 也可以手动下载并解压到 static 子目录即可
sh download.sh
```

## 环境变量配置

### java 内存配置

- 名称: `JAVA_OPTIONS`
- 默认值: `-Xms512m -Xmx2014m`

### HanLP hanlp.properties

- 名称: `HANLP_PROPERTIES_PATH`
- 默认值: `当前安装包/static`

## 示例

### 基本接口

HanLP 自带其它接口，请参考 https://github.com/hankcs/pyhanlp

```javascript
// node examples/segement.js

const { HanLP, toJson } = require('..')

console.log(toJson(HanLP.segment('你好，欢迎在Python中调用HanLP的API')))

// 结果
[
{ word: '你好', nature: { ordinal: 72, name: 'vl' }, offset: 0 },
{ word: '，', nature: { ordinal: 130, name: 'w' }, offset: 0 },
{ word: '欢迎', nature: { ordinal: 64, name: 'v' }, offset: 0 },
{ word: '在', nature: { ordinal: 103, name: 'p' }, offset: 0 },
{ word: 'Python', nature: { ordinal: 3, name: 'nx' }, offset: 0 },
{ word: '中', nature: { ordinal: 63, name: 'f' }, offset: 0 },
{ word: '调用', nature: { ordinal: 64, name: 'v' }, offset: 0 },
{ word: 'HanLP', nature: { ordinal: 3, name: 'nx' }, offset: 0 },
{ word: '的', nature: { ordinal: 112, name: 'ude1' }, offset: 0 },
{ word: 'API', nature: { ordinal: 3, name: 'nx' }, offset: 0 }
]

```

### 进阶接口

```javascript
// node examples/tokenizer.js

const { JClass, toJson } = require('..')
const analyzer = JClass('com.hankcs.hanlp.model.perceptron.PerceptronLexicalAnalyzer')
console.log(toJson(analyzer.analyze("上海华安工业（集团）公司董事长谭旭光和秘书胡花蕊来到美国纽约现代艺术博物馆参观")))

// 结果
{
wordList: [
{ innerList: [Array], label: 'nt' },
{ value: '董事长', label: 'n' },
{ value: '谭旭光', label: 'nr' },
{ value: '和', label: 'c' },
{ value: '秘书', label: 'n' },
{ value: '胡花蕊', label: 'nr' },
{ value: '来到', label: 'v' },
{ innerList: [Array], label: 'ns' },
{ value: '参观', label: 'v' }
]
}
```

### 训练模型

```javascript
// node examples/sentiment.js

const fs = require('fs')
const { IOUtil, StaticPath, JClass } = require('..')

const train_or_load_model = (corpus, className, retrain = false) => {
const corpus_path = StaticPath + '/' + corpus
const model_path = corpus_path + '.sert'

let model

if (!retrain && fs.existsSync(model_path)) {
model = IOUtil.readObjectFrom(model_path)
} else {
const model_builder = JClass(className)
model_builder.train(corpus_path)
model = model_builder.getModel()
IOUtil.saveObjectTo(model, model_path)
}

return JClass(className, model)
}

const classifier = train_or_load_model('ChnSentiCorp情感分析酒店评论', 'com.hankcs.hanlp.classification.classifiers.NaiveBayesClassifier')

console.log(classifier.classify("前台客房服务态度非常好！早餐很丰富，房价很干净。再接再厉！"))
console.log(classifier.classify("结果大失所望，灯光昏暗，空间极其狭小，床垫质量恶劣，房间还伴着一股霉味。"))

// 结果
// 正面
// 负面

```

## 感谢

https://github.com/beyai/node-hanlp
