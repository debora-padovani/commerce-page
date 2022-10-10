type ProductItemType = {
    title: string
    thumbnail: string
    price: number
    rating: number
    discount: number
    brand: string
}

function ProductItem({thumbnail, title, price, rating, discount, brand}: ProductItemType) {

    const ratingRounded = Math.round(rating);
    const discountRounded = Math.round(discount);

  return (
    <div className="product__box">
        <div className="product__image">
            <img src={thumbnail} alt={title} />
        </div>
        <div className="product__info">
            <div className="product__productBrand">
                <p>{brand}</p>
            </div>
            <div className="product__productName">
                <p>{title}</p>
            </div>
            <div className="product__productPrice">
                <p>{price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}</p>
            </div>
            <div className="product__productRating">
                <p>{rating}</p>
            {
                [...Array(ratingRounded)].map((index) => {
                return <span key={index}>&#8902;</span>
                })
            }
            </div>
        </div>
        <div className="product__discount">
            <span>{discountRounded}% OFF</span>
        </div>
        
    </div>
  );
}

export default ProductItem;
