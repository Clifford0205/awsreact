export const IS_LOADING = "IS_LOADING";
export const IS_ANIMATED = "IS_ANIMATED";

export const isLoading = () => {
  return {
    type: IS_LOADING
  };
};

export const isAnimated = () => {
  return {
    type: IS_ANIMATED
  };
};
