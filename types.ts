export type Recipe = {
  _id: string;
  name: string;
  mainImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  slug: {
    _type: "slug";
    current: string;
  };
};

export type RecipeDetail = {
  _id: string;
  name: string;
  mainImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  slug: {
    _type: "slug";
    current: string;
  };
  ingredient: {
    _key: string;
    unit: string;
    wholeNumber: number;
    fraction: string;
    ingredient: {
      name: string;
    };
  }[];
  instruction: string;
};
