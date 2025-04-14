export interface BaseRecipe {
  id: number;
  documentId: string;
  totalTime: number;
  name: string;
  calories: number;
  images: Image[];
  ingradients: Ingradient[];
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  url: string;
  formats: {
    thumbnail: {
      url: string;
    };
  };
}

export interface Ingradient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}
