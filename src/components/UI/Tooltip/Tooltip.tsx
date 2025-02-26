import React from "react";
import MuiTooltip, { TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledTooltip = styled(MuiTooltip)<TooltipProps>(() => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "#00D1C1",
    color: "black",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "4px",
  },
}));

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  placement = "top",
  ...props
}) => {
  return (
    <StyledTooltip title={title} placement={placement} {...props}>
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
