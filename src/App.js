import { useState } from "react";
import { desserts } from "./desserts";

export default function App() {
  return (
    <>
      <h1>Desserts</h1>
      <div className="main-section">
        <DessertsList />
        <YourCart />
      </div>
    </>
  );
}
function DessertsList() {
  const dessert = desserts;
  return (
    <div className="main-container">
      {dessert.map((des) => (
        <SingleDessert des={des} key={des.id} />
      ))}
    </div>
  );
}

function SingleDessert({ des }) {
  const [itemAdded, setItemAdded] = useState(false);

  const [quantity, setQuantity] = useState(0);

  const handleAddtoCart = () => {
    setItemAdded(true);
    setQuantity(1);
  };

  const increaseQuantity = (e) => {
    e.stopPropagation();

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setItemAdded(false);
      setQuantity(0);
    }
  };
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
