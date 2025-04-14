import { useState } from "react";
import { desserts } from "./desserts";

export default function App() {
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
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  console.log(cartItems);
  //console.log(totalItems);
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
        <YourCart
          totalItems={totalItems}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
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
        const cartItem = cartItems.find((item) => item.id === des.id);
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
      className={itemAdded ? "added" : "main"}
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

// function YourCart({ totalItems, cartItems }) {
//   return (
//     <>
//       {!totalItems > 0 ? (
//         <div className="cart-container">
//           <h3>Your Cart ({totalItems})</h3>
//           <div>
//             <img
//               src=" /assets/images/illustration-empty-cart.svg"
//               alt="Your Cart"
//             />
//             <p>Your added items will appear here</p>
//           </div>
//         </div>
//       ) : (
//         <div className="cart-container-with-items">
//           <h3>Your Cart ({totalItems})</h3>
//           <div>
//             <p className="item-name">Classic Tiramisu</p>
//             <div className="item-details">
//               <span className="item-quantity">1x</span>
//               <span className="item-unit-price">@$8.00</span>
//               <span className="item-total-price">$8.00</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="12"
//                 height="12"
//                 viewBox="0 0 10 10"
//                 className="remove-button"
//               >
//                 <path
//                   d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="cart-summary">
//             <div className="total-div">
//               <p>Order Total</p>
//               <p className="carbon-total">$8.00</p>
//             </div>
//             <p className="carbo-neutral">
//               <img
//                 src="/assets/images/icon-carbon-neutral.svg"
//                 alt="carbon-neutral"
//               />
//               This is a carbo-neutral delivery
//             </p>

//             <button className="confirm-order">Confirm Order</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
function YourCart({ totalItems, cartItems, setCartItems }) {
  const selectedItems = cartItems.filter(
    (item) => item.itemAdded && item.quantity > 0
  );
  const matchedDesserts = selectedItems.map((item) => {
    const dessert = desserts.find((d) => d.id === item.id);
    return {
      ...item,
      name: dessert.name,
      price: dessert.price,
    };
  });

  const orderTotal = matchedDesserts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, itemAdded: false, quantity: 0 } : item
      )
    );
  };

  return (
    <>
      {totalItems === 0 ? (
        <div className="cart-container">
          <h3>Your Cart ({totalItems})</h3>
          <div>
            <img
              src=" /assets/images/illustration-empty-cart.svg"
              alt="Your Cart"
            />
            <p>Your added items will appear here</p>
          </div>
        </div>
      ) : (
        <div className="cart-container-with-items">
          <h3>Your Cart ({totalItems})</h3>
          <div>
            {matchedDesserts.map((item) => (
              <div key={item.id}>
                <p className="item-name">{item.name}</p>
                <div className="item-details">
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-unit-price">
                    @${item.price.toFixed(2)}
                  </span>
                  <span className="item-total-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 10 10"
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total-div">
              <p>Order Total</p>
              <p className="carbon-total">${orderTotal.toFixed(2)}</p>
            </div>
            <p className="carbo-neutral">
              <img
                src="/assets/images/icon-carbon-neutral.svg"
                alt="carbon-neutral"
              />
              This is a carbo-neutral delivery
            </p>

            <button className="confirm-order">Confirm Order</button>
          </div>
        </div>
      )}
    </>
  );
}
