import { useState } from "react";
import { desserts } from "./desserts";

export default function App() {
  const [itemAdded, setItemAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const [cartItems, setCartItems] = useState(
    desserts.map((dessert) => ({
      id: dessert.id,
      itemAdded: false,
      quantity: 0,
    }))
  );

  const handleAddtoCart = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, itemAdded: true, quantity: 1 } : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 0,
              itemAdded: item.quantity > 1,
            }
          : item
      )
    );
  };
  return (
    <>
      <h1>Desserts</h1>
      <div className="main-section">
        <DessertsList
          handleAddtoCart={handleAddtoCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          cartItems={cartItems}
        />
        <YourCart />
      </div>
    </>
  );
}

function DessertsList({
  cartItems,
  handleAddtoCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <div className="main-container">
      {desserts.map((des) => {
        const cartItem = cartItems.find((item) => item.id === des.id); // ✅ Find correct dessert state
        return (
          <SingleDessert
            key={des.id}
            des={des}
            itemAdded={cartItem.itemAdded}
            quantity={cartItem.quantity}
            handleAddtoCart={() => handleAddtoCart(des.id)}
            increaseQuantity={() => increaseQuantity(des.id)}
            decreaseQuantity={() => decreaseQuantity(des.id)}
          />
        );
      })}
    </div>
  );
}

function SingleDessert({
  itemAdded,
  handleAddtoCart,
  increaseQuantity,
  decreaseQuantity,
  quantity,
  des,
}) {
  return (
    <div className="single-container">
      <img
        className={`img-product ${itemAdded ? "border-red" : ""}`}
        src={des.image.desktop}
        alt={des.name}
      />

      <Button
        itemAdded={itemAdded}
        handleAddtoCart={handleAddtoCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        quantity={quantity}
      />

      <p>{des.category}</p>
      <h4>{des.name}</h4>
      <h4 className="price">${des.price.toFixed(2)}</h4>
    </div>
  );
}

function Button({
  itemAdded,
  handleAddtoCart,
  increaseQuantity,
  decreaseQuantity,
  quantity,
}) {
  return (
    <button
      onClick={!itemAdded ? handleAddtoCart : null}
      className={itemAdded ? "added" : ""}
    >
      {!itemAdded ? (
        <>
          <img src="/assets/images/icon-add-to-cart.svg" alt="Add to cart" />
          Add to Cart
        </>
      ) : (
        <div className="quantity-control">
          <span className="quantity-btn" onClick={decreaseQuantity}>
            -
          </span>
          <span className="quantity-value">{quantity}</span>
          <span className="quantity-btn" onClick={increaseQuantity}>
            +
          </span>
        </div>
      )}
    </button>
  );
}

function YourCart() {
  return (
    <div className="cart-container">
      <h2>Your Cart (0)</h2>
      <div>
        <img
          src=" /assets/images/illustration-empty-cart.svg"
          alt="Your Cart"
        />
        <p>Your added items will appear here</p>
      </div>
    </div>
  );
}
