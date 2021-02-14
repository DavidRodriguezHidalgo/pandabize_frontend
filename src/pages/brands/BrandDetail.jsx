import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import BrandsService from "../../services/data/brands_service";
import FeatureValuesService from "../../services/data/feature_values_service";
import OrdersService from "../../services/data/orders_service";
import { createNotification } from "../../services/notifications";

const OrderNew = Yup.object().shape({
  quantity: Yup.number(),
  features: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      value: Yup.string(),
    })
  ),
});
const BrandDetail = ({ match }) => {
  const [brand, setBrand] = useState();
  const [featureValues, setFeatureValues] = useState();
  const [limit, setLimit] = useState([]);
  const [limited, setLimited] = useState(false);

  useEffect(() => {
    BrandsService.loadBrand(match.params.id).then((response) => {
      setBrand(response.data);

      let ids = [];
      response.data.features.map((feature) => {
        ids.push(...feature.feature_values.map((fv) => fv.id));
      });
      FeatureValuesService.loadFeatureValues(ids).then((response) => {
        setFeatureValues(response.data);
      });
    });
  }, []);

  const getOptionsByFeatureId = (id) => {
    if (limited) {
      let selectedFeatures = [];
      limit.map((feature) => selectedFeatures.push(...feature.feature_values));
      const featuresLimitedIds = selectedFeatures.map(
        (value) => value.feature_id
      );

      if (featuresLimitedIds.includes(id)) {
        return selectedFeatures;
      }
    }
    if (featureValues) {
      return featureValues.filter((fv) => fv.feature_id === id);
    }
  };

  const handleSubmit = (values) => {
    if (values) {
      const valuesToSend = values.features
        .map((feature) => feature.value)
        .filter((val) => val != undefined);
      if (
        valuesToSend.length > 0 &&
        valuesToSend.length === values.features.length
      ) {
        OrdersService.createOrder(
          brand,
          values.quantity,
          values.features
        ).then((response) => {
          createNotification("success", "You have created an order");
        });
      } else {
        createNotification("warning", "Please select any features");
      }
    }
  };

  const handleChange = (event, index, setFiedlValue) => {
    const value = event.target.value.toString();
    setFiedlValue(`features[${index}][value]`, value);
    let selectedValue = featureValues.find(
      (featureValue) => featureValue.value === value
    );
    if (selectedValue && selectedValue.limit) {
      setLimit(selectedValue.limit.limit_values);
      setLimited(true);
    } else {
      setLimited(false);
    }
  };

  return (
    <div className="container">
      <div className="divider">
        <img src="http://localhost:3000/bicicle.jpeg" alt="bicicleImage" />
        <div style={{ margin: "20px 0px" }}>
          <span>{brand?.name}</span>
          <span style={{ float: "right", marginRight: "15px" }}>
            {brand?.price} €
          </span>
        </div>
        <div>
          A bicycle, also called a bike or cycle, is a human-powered or
          motor-powered, pedal-driven, single-track vehicle, having two wheels
          attached to a frame, one behind the other. A bicycle rider is called a
          cyclist, or bicyclist.
        </div>
      </div>

      <div className="divider product-features">
        <Formik
          enableReinitialize
          initialValues={{
            quantity: 1,
            features: brand
              ? brand.features.map((feature) => {
                  return { name: feature.name, id: feature.id };
                })
              : [],
          }}
          onSubmit={handleSubmit}
          validationSchema={OrderNew}
        >
          {({ isSubmitting, setFieldValue, values }) => {
            return (
              <Form>
                {values.features.map((feature, index) => {
                  const options =
                    getOptionsByFeatureId(values.features[index]["id"]) || [];

                  return (
                    <div className="form-field">
                      <label>{values.features[index]["name"]}</label>
                      <Field
                        as="select"
                        name={`features[${index}][value]`}
                        value={values.features[index]["value"]}
                        onChange={(event) =>
                          handleChange(event, index, setFieldValue)
                        }
                      >
                        <option defaultValue value="">
                          Select one feature
                        </option>
                        {options.length > 0
                          ? options.map((option) => {
                              return (
                                <option value={option.value}>
                                  {option.value}
                                </option>
                              );
                            })
                          : null}
                      </Field>
                      <ErrorMessage
                        component="small"
                        name={`features[${index}][name]`}
                        style={{ color: "red" }}
                      />
                    </div>
                  );
                })}
                <div className="form-field">
                  <label>Quantity</label>
                  <Field type="number" name="quantity"></Field>
                  <ErrorMessage
                    component="small"
                    name="quantity"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="form-field">
                  <button type="submit">Send</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BrandDetail;
