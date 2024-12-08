import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query getBrands {
    brands {
      id
      name
      price
    }
  }
`;

export const GET_BRAND = gql`
  query getBrand($id: ID!) {
    brand(id: $id) {
      id
      name
      price
      features {
        id
        name
        featureValues {
          id
          value
        }
        limit {
          id
          limitValues {
            id
            feature {
              id
              name
            }
            featureValues {
              id
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders {
    orders {
      id
      amount
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
