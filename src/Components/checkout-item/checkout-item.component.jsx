import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const { imageUrl, name, quantity, price } = cartItem;

  const addItemToCartHandler = () => {
    addItemToCart(cartItem);
  };

  const removeItemFromCartHandler = () => {
    removeItemFromCart(cartItem);
  };
  const cleaItemHandler = () => {
    clearItemFromCart(cartItem);
  };
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={cleaItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
