export interface Feature {
  id: number;
  name: string;
  limit: Limit;
}

export interface Limit {
  id: number;
  limitValues: LimitValue[];
}

export interface LimitValue {
  id: number;
  feature: Feature;
  featureValues: FeatureValue[];
}

export interface FeatureValue {
  id: number;
  value: string;
}

export interface SelectedFeature {
  feature: string;
  value: string;
}
