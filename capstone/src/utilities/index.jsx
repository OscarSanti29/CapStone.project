export async function addtoCart(cart, item) {
  const itemincart = cart.find((product) => {
    return product.id === item.id;
  });
  if (itemincart) {
    return cart.map((cartitem) =>
      cartitem.id === item.id
        ? {
            ...cartitem,
            quantity: cartitem.quantity
              ? cartitem.quantity + 1
              : (cartitem.quantity = 1),
          }
        : cartitem
    );
  } else {
    return [...cart, { ...item, quantity: 1 }];
  }
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
