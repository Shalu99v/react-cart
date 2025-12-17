import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0,
    isCartOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.cartItems.find(
                (item) => item.id === action.payload.id 
            );
            if (exists) {
               
                toast.error("Duplicates products are not allowed");
            } else {
                state.cartItems.push(action.payload);
                state.totalPrice += action.payload.price * action.payload.quantity;
                state.totalQuantity += action.payload.quantity;
                toast.sucess("Product added to cart");
            }
        },
        removeFromCart: (state, action) => {
            const filteredCart = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );
            state.cartItems = filteredCart;
            state.totalPrice -= action.payload.price * action.payload.quantity;
            state.totalQuantity -= action.payload.quantity;
            toast.success("Product removed from cart");
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
            toast.success("Cart cleared");
        },
    },
});
export const { addToCart, removeFromCart, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;