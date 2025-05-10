import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TInputDateRangeProps } from "./types";
import CInputDate from "../../atoms/input-date";

const CInputDateRange: React.FC<TInputDateRangeProps> = ({
  fromProps,
  toProps,
}) => {
  return (
    <div
      className={
        "flex justify-center items-center border border-gray-300 rounded-md w-full"
      }
    >
      <CInputDate {...fromProps} className="w-full" />
      <ArrowForwardIcon style={{ color: "#ced4da", fontSize: "20px" }} />
      <CInputDate {...toProps} className="w-full" />
    </div>
  );
};

export default CInputDateRange;
