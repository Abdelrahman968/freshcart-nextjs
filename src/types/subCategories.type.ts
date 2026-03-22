export interface SubCategoryData {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoriesType {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number | null;
  };
  data: SubCategoryData[];
}
