import React from "react";
import Button from "@mui/material/Button";

const commonButton = ({ children, color, size, variant, sx, onClick }) => {
  return (
    <Button
      color={color}
      size={size}
      variant={variant}
      sx={sx}
      type="submit"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default commonButton;