import React from "react";

const useHover = (styleOnHover, styleOnNotHover) => {
  const [style, setStyle] = React.useState(styleOnNotHover);

  const onMouseEnter = () => setStyle(styleOnHover);
  const onMouseLeave = () => setStyle(styleOnNotHover);

  return { style, onMouseEnter, onMouseLeave };
};

export default useHover;