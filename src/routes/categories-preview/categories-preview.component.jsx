import { useContext } from "react";

import { CategoriesContext } from "../../context/categories.context";

import CategoryPreview from "../../Components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview products={products} title={title} key={title} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
