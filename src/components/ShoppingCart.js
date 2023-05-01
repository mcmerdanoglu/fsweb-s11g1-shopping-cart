import React from "react";
import { ScCartCheckout } from "./scParts";

// Components
import Item from "./ShoppingCartItem";

//Context
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const ShoppingCart = (/*props*/) => {
  const sepet = useContext(CartContext);
  const { cart } = useContext(CartContext);

  const getCartTotal = () => {
    return props.cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      {props.cart.map((item) => (
        <Item key={item.id} {...item} />
      ))}

      <ScCartCheckout>
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </ScCartCheckout>
    </div>
  );
};

export default ShoppingCart;
