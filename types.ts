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
