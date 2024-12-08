import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder(
    $quantity: Int!
    $productId: ID!
    $selectedFeatures: [SelectedFeaturesInput!]!
  ) {
    createOrder(
      items: [
        {
          productId: $productId
          quantity: $quantity
          selectedFeatures: $selectedFeatures
        }
      ]
    ) {
      items {
        productId
        quantity
        selectedFeatures {
          feature
          featureValue
        }
      }
    }
  }
`;
