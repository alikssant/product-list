export function OrderConfirmationModal({ cartItems, desserts, onClose }) {
  const matchedDesserts = cartItems
    .filter((item) => item.itemAdded && item.quantity > 0)
    .map((item) => {
      const dessert = desserts.find((d) => d.id === item.id);
      return {
        ...item,
        name: dessert.name,
        price: dessert.price,
        image: dessert.image,
      };
    });

  const orderTotal = matchedDesserts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img
          src="/assets/images/icon-order-confirmed.svg"
          className="check-icon"
          alt="order-confirmed"
        />
        <h2>Order Confirmed</h2>
        <p className="subtitle">We hope you enjoy your food!</p>
        <div className="order-summary">
          <div className="order-items">
            {matchedDesserts.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span> {item.quantity}x</span>
                </div>
                <div className="item-total">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Order Total</span>
            <strong>${orderTotal.toFixed(2)}</strong>
          </div>
        </div>

        <button className="new-order-btn" onClick={onClose}>
          Start New Order
        </button>
      </div>
    </div>
  );
}
