import { createSlice, nanoid } from "@reduxjs/toolkit";

const initState = {
  blocks: [],
  selectedBlock: null,
};

const builderSlice = createSlice({
  name: "builder",
  initialState: initState,
  reducers: {
    addBlock: {
      reducer(state, action) {
        state.blocks.push(action.payload);
      },
      prepare(type, props) {
        return {
          payload: {
            id: nanoid(),
            type,
            props,
            x: 0,
            y: 0,
          },
        };
      },
    },
    updateBlockPosition(state, action) {
      const { id, x, y } = action.payload;
      const block = state.blocks.find((b) => b.id === id);
      if (block) {
        block.x = x;
        block.y = y;
      }
    },
    selectBlock(state, action) {
      state.selectedBlock = action.payload;
    },
    updateBlockProps(state, action) {
      const { id, props } = action.payload;
      const block = state.blocks.find((b) => b.id === id);
      if (block) {
        block.props = { ...block.props, ...props };
      }
    },
    deleteBlock(state, action) {
      state.blocks = state.blocks.filter((b) => b.id !== action.payload);
      if (state.selectedBlock === action.payload) {
        state.selectedBlock = null;
      }
    },
    updateBlockOrder(state, action) {
      state.blocks = action.payload; 
    }
  },
});

export const { addBlock, updateBlockPosition, selectBlock, updateBlockProps, deleteBlock, updateBlockOrder } =
  builderSlice.actions;
export default builderSlice.reducer;
