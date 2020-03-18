
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

