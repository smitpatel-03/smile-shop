class ApiFeature {
  constructor(qurey, qureyStr) {
    this.qurey = qurey;
    this.qureyStr = qureyStr;
  }
  search() {
    const keyword = this.qureyStr.keyword
      ? {
          name: {
            $regex: this.qureyStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.qurey = this.qurey.find({ ...keyword });
    return this;
  }
}

module.exports = ApiFeature;
