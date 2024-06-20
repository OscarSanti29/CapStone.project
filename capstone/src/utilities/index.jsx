export async function addtoCart(cart, item) {
  console.log("Initial cart:", cart);
  console.log("Item to add:", item);

  const itemInCart = cart.find((product) => product.id === item.id);
  let updatedCart;

  if (itemInCart) {
    updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: (cartItem.quantity || 0) + 1,
          }
        : cartItem
    );
  } else {
    updatedCart = [...cart, { ...item, quantity: 1 }];
  }

  console.log("Updated cart:", updatedCart);
  return updatedCart;
}
export async function removetoCart(cart, item) {
  const itemincart = cart.find((product) => {
    return product.id === item.id;
  });
  if (itemincart) {
    return cart.map((cartitem) =>
      cartitem.id === item.id
        ? {
            ...cartitem,
            quantity: cartitem.quantity
              ? cartitem.quantity - 1
              : (cartitem.quantity = 0),
          }
        : cartitem
    );
  } else {
    return [...cart, { ...item, quantity: 1 }];
  }
}
