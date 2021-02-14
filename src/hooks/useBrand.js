import { useState, useEffect } from "react";
import BrandsService from "../services/data/brands_service";
import { createNotification } from "../services/notifications";

const useBrand = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    BrandsService.loadBrands()
      .then((response) => setBrands(response.data))
      .catch((error) => createNotification("error", "Error retrieving brands"));
  }, []);
  return [brands, setBrands];
};

export default useBrand;
