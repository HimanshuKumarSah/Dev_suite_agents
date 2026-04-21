import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  token: null,
  cart: [],
  wishlist: [],
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null, cart: [] }),
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item._id === product._id);
    if (existing) {
      return { cart: state.cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item._id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item => item._id === productId ? { ...item, quantity } : item)
  })),
  clearCart: () => set({ cart: [] }),
  addToWishlist: (product) => set((state) => ({
    wishlist: state.wishlist.find(item => item._id === product._id) ? state.wishlist : [...state.wishlist, product]
  })),
}));

export default useStore;