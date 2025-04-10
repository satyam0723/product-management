import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProd: (state, action) => {
      state.products = action.payload;
    },
    createProd: (state, action) => {
      state.products.push(action.payload);
    },
    updateProd: (state, action) => {
      const { pid, newProduct } = action.payload;
      state.products = state.products.map((product) =>
        product._id == pid ? newProduct : product
      );
    },
    deleteProd: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product._id !== id);
    },
  },
});

export const { createProd, updateProd, deleteProd, setProd } =
  productSlice.actions;
export default productSlice.reducer;
