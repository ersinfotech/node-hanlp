
const { JClass, toJson } = require('..')
const analyzer = JClass('com.hankcs.hanlp.model.perceptron.PerceptronLexicalAnalyzer')
console.log(toJson(analyzer.analyze("上海华安工业（集团）公司董事长谭旭光和秘书胡花蕊来到美国纽约现代艺术博物馆参观")))

