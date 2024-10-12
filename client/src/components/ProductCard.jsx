const ProductCard = (product) => {
  //   console.log(puct);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1>{product.product.title}</h1>
      <p>{product.product.description}</p>
      <p>Price: ${product.product.price}</p>
    </div>
  );
};

export default ProductCard;
