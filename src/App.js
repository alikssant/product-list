import { useState } from "react";

const desserts = [
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    id: crypto.randomUUID(),
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

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
  return (
    <div className="single-container">
      <img className="img-product" src={des.image.desktop} alt={des.name} />
      <Button />

      <p>{des.category}</p>
      <h4>{des.name}</h4>
      <h4 className="price">${des.price.toFixed(2)}</h4>
    </div>
  );
}

function Button() {
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
