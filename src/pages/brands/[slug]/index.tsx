import { GET_BRAND } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Feature, FeatureValue, SelectedFeature } from "@/types/feature";
import { CREATE_ORDER } from "@/graphql/mutations";

const OrderNew = Yup.object().shape({
  quantity: Yup.number(),
  features: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      value: Yup.string(),
    })
  ),
});

const BrandDetail = () => {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_BRAND, {
    variables: { id: parseInt(String(params?.slug)) },
  });

  const [createOrder] = useMutation(CREATE_ORDER);

  const brand = data?.brand || [];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: any,
    feature: any
  ) => {
    const value = event.target.value.toString();

    const featureValue = feature?.limit?.limitValues[0].featureValues.find(
      (featureValue: FeatureValue) => featureValue.value === value
    );

    setFieldValue(`features[${index}][value]`, featureValue.id);
    setFieldValue(`features[${index}][feature]`, feature.id);
  };

  const handleSubmit = (values: any) => {
    createOrder({
      variables: {
        productId: parseInt(String(params?.slug)),
        quantity: 1,
        selectedFeatures: values?.features.map((feature: SelectedFeature) => {
          return {
            featureId: Number(feature.feature),
            featureValueId: Number(feature.value),
          };
        }),
      },
    });
  };

  if (loading) {
    return <div className="text-center font-bold">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center font-bold">Error loading the brand with</div>
    );
  }

  return (
    <div className="flex gap-16">
      <div className="divider">
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

      <div className="divider w-4/12">
        <Formik
          enableReinitialize
          initialValues={{
            quantity: 1,
            features: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={OrderNew}
        >
          {({ setFieldValue }) => {
            return (
              <Form>
                {data.brand.features
                  .filter((feature: Feature) => !!feature.limit)
                  .map((feature: Feature, index: number) => {
                    const options =
                      feature?.limit?.limitValues
                        .map((lv) => lv.featureValues)
                        .flat() || [];

                    return (
                      <div key={index} className="form-field my-4">
                        <label>{data.brand.features[index]["name"]}</label>
                        <Field
                          as="select"
                          name={`features[${index}][value]`}
                          value={data.brand.features[index]["value"]}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(
                              event,
                              index,
                              setFieldValue,
                              data.brand.features[index]
                            );
                          }}
                        >
                          <option defaultChecked value="">
                            Select one feature
                          </option>
                          {options.length > 0
                            ? options.map((option) => {
                                return (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
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
