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

  filter() {
    const queryCopy = { ...this.qureyStr };
    const removedFields = ["keyword", "limit", "page"];
    removedFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating
    let qureyStr = JSON.stringify(queryCopy);
    qureyStr = qureyStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.qurey = this.qurey.find(JSON.parse(qureyStr));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.qureyStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.qurey = this.qurey.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;
