import ApiFeatures from "../utils/apiFeatures.js";

class Controller {
  constructor(Model, documentName) {
    this.Model = Model;
    this.documentName = documentName;
    this.documentsName = `${documentName}s`;
  }

  _addQuery(options) {
    const features = new ApiFeatures(options.query, options.queryString);
    features
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate(options.populate);

    return features.query;
  }

  async getAllDocuments(request, response, next) {
    request.filterObject = request.filterObject ?? {};

    const documents = await this._addQuery({
      query: this.Model.find(request.filterObject),
      queryString: request.query,
    });

    response.status(200).json({
      status: "success",
      data: { [this.documentsName]: documents },
    });
  }
}

export default Controller;

// const features = new ApiFeatures(
//   this.Model.find(request.filterObject),
//   request.query
// );
// features.filter().sort().limitFields().paginate();

// const documents = await features.query;
