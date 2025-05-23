import { useState } from "react";
import { desserts } from "./desserts";
import { motion, AnimatePresence } from "framer-motion";
import { OrderConfirmationModal } from "./OrderConfirmationModal";
import { DessertsList } from "./DessertsList";

export default function App() {
  const [cartItems, setCartItems] = useState(
    desserts.map((dessert) => ({
      id: dessert.id,
      itemAdded: false,
      quantity: 0,
    }))
  );

  const [orderConfirmed, setOrderConfirmed] = useState(false);

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
          setOrderConfirmed={setOrderConfirmed}
        />

        {orderConfirmed && (
          <OrderConfirmationModal
            cartItems={cartItems}
            desserts={desserts}
            onClose={() => {
              setOrderConfirmed(false);
              setCartItems(
                cartItems.map((item) => ({
                  ...item,
                  itemAdded: false,
                  quantity: 0,
                }))
              );
            }}
          />
        )}
      </div>
    </>
  );
}

function YourCart({ totalItems, cartItems, setCartItems, setOrderConfirmed }) {
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
        <motion.div
          className="cart-container-with-items"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Your Cart ({totalItems})</h3>
          <div>
            <AnimatePresence>
              {matchedDesserts.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              ))}
            </AnimatePresence>
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

            <button
              className="confirm-order"
              onClick={() => setOrderConfirmed(true)}
            >
              Confirm Order
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
