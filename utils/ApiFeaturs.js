class ApiFeatures {
  constructor(
    query,
    { _order, _sort, fields, page, limit, limitdocument, text, ...filterFields }
  ) {
    this.query = query;
    this._order = _order;
    this._sort = _sort;
    this.fields = fields;
    this.page = page;
    this.limit = limit;
    this.filterFields = filterFields;
    this.limitdocument = limitdocument;
    this.text = text;
  }

  filter() {
    if (Object.keys(this.filterFields).length > 0) {
      let queryStr = JSON.stringify(this.filterFields);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      const queryObj = JSON.parse(queryStr);
      this.query = this.query.find(queryObj);
    }
    return this;
  }

  getNumberOfDocument() {
    if (this.limitdocument) {
      this.query = this.query.limit(this.limitdocument);
    }
    return this;
  }
  limitFields() {
    if (this.fields) {
      const fieldsArray = this.fields.split(",");
      this.query = this.query.select(fieldsArray);
    }
    return this;
  }
  pagination(videoCount) {
    if (this.limit && this.page) {
      const skipDoc = this.limit * (this.page - 1);
      if (skipDoc >= videoCount) {
        throw new Error("This page is not found!");
      }
      this.query = this.query.skip(skipDoc).limit(this.limit);
    }
    return this;
  }
  sort() {
    if (this._sort) {
      const sort = this._sort.split(",");
      const sortValue = this._order === "desc" ? -1 : 1;
      const sortObj = {};
      for (let x of sort) {
        sortObj[x] = sortValue;
      }
      this.query = this.query.sort(sortObj);
    }
    return this;
  }
  textSearch() {
    if (this.text) {
      this.query = this.query.find({
        $text: { $search: this.text },
      });
    }
    return this;
  }
}

module.exports = ApiFeatures;
