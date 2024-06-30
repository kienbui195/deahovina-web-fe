import * as React from "react";
import ProductDetail from "./ProductDetail";

const ProductIndexPage = ({ params }: { params: { slug: string } }) => {
  return <ProductDetail slug={params.slug}/>;
};

export default ProductIndexPage;
