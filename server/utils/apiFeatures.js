class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ["sort", "fields", "limit", "page"];
    excludedFields.forEach((field) => delete queryObject[field]);

    const queryString = JSON.stringify(queryObject).replace(
      /\b(gt|gte|lt|lte|ne)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    const { sort } = this.queryString;

    if (sort === "none") return this;

    if (sort) {
      const sortBy = sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString || 1;
    const limit = this.queryString || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  populate(options) {
    if (options) {
      this.query = this.query.populate(options);
    }

    return this;
  }
}

export default ApiFeatures;
