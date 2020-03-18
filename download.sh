
data_link=https://file.hankcs.com/hanlp/data-for-1.7.5.zip
ChnSentiCorp_link=https://file.hankcs.com/corpus/ChnSentiCorp.zip

download() {
    wget -P static/ $1
    unzip -o -d static/ static/`basename $1`
}

echo "下载 hanlp data"
download $data_link

echo "下载 hanlp sentiment corpus"
download $ChnSentiCorp_link
