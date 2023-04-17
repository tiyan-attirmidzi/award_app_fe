export interface AwardGetRequestParamTypes {
  page: number;
  page_size: number;
  type: string;
  min_point: number;
  max_point: number;
}

export interface AwardTypes {
  id: number;
  name: string;
  exchange_points: number;
  type: string;
  image: string;
}
