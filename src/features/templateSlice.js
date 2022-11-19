import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice({
  name: "template",
  initialState: {
    selectedTemplate: { templateId: "", templateUrl: "" },
    templates: [],
  },
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action;
    },
    resetSelectedTemplate: (state) => {
      state.selectedTemplate = { templateId: "", templateUrl: "" };
    },
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
  },
});

export const { setSelectedTemplate, resetSelectedTemplate, setTemplates } =
  templateSlice.actions;

export default templateSlice.reducer;
