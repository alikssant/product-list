import { desserts } from "./desserts";
import { SingleDessert } from "./SingleDessert";

export function DessertsList({
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
