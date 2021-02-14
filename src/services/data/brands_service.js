import axios from "../axios.js";

class BrandsService {
  static loadBrands = () => axios.get("/brands");
  static loadBrand = (id) => axios.get(`brands/${id}`);
}

export default BrandsService;
