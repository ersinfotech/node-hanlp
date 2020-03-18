
const path = require('path')
const fs = require('fs')

const java = require('java')

const StaticPath = path.resolve(__dirname, '../static')

exports.StaticPath = StaticPath

const JAVA_OPTIONS = process.env.JAVA_OPTIONS || '-Xms512m -Xmx2014m'

java.options = JAVA_OPTIONS.trim().split(/\s+/)

java.asyncOptions = { asyncSuffix: undefined, syncSuffix: "" }

for (let file of fs.readdirSync(StaticPath)) {
    if (!file.endsWith('.jar')) continue
    java.classpath.push(path.join(StaticPath, file))
}

const HANLP_PROPERTIES_PATH = process.env.HANLP_PROPERTIES_PATH || path.join(StaticPath, 'hanlp.perperties')

if (!fs.existsSync(HANLP_PROPERTIES_PATH)) {
fs.writeFileSync(HANLP_PROPERTIES_PATH, `# 自动生成 ersinfotech/node-hanlp
root=${StaticPath}
`, 'utf8')
}

java.import('com.hankcs.hanlp.utility.Predefine').HANLP_PROPERTIES_PATH = HANLP_PROPERTIES_PATH

exports.HanLP = java.import('com.hankcs.hanlp.HanLP')

exports.IOUtil = java.import('com.hankcs.hanlp.corpus.io.IOUtil')

const Gson = java.newInstanceSync('com.google.gson.Gson')

exports.toJson = (value) => JSON.parse(Gson.toJson(value))

exports.JClass = (className, ...args) => java.newInstanceSync(className, ...args)
