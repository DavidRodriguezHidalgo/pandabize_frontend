import axios from "../axios.js";

class FeatureValuesService {
  static loadFeatureValues = (ids) =>
    axios.get("/feature_values", {
      params: {
        ids: ids,
      },
    });
}

export default FeatureValuesService;
