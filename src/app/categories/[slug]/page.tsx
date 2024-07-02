import React from "react";
import CategoryDetail from "./CategoryDetail";

const CategoryDetailIndexPage = ({ params }: { params: { slug: string } }) => {
  return <CategoryDetail slug={params.slug} />;
};

export default CategoryDetailIndexPage;
