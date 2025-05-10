import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LoadingSkeletonChartBar from "../loading/LoadingSkeletonChartBar";

type StatusRealisasiChartProps = {
  workedTotal: number | undefined;
  canceledTotal: number | undefined;
  holdTotal: number | undefined;
  loading: boolean;
};

export default function StatusRealisasiChart({
  workedTotal,
  canceledTotal,
  holdTotal,
  loading,
}: StatusRealisasiChartProps) {
  const data = [
    {
      name: "Worked",
      value: workedTotal,
      fill: "#beede6",
    },
    {
      name: "Canceled",
      value: canceledTotal,
      fill: "#f2d0ec",
    },
    {
      name: "Hold",
      value: holdTotal,
      fill: "#d2d0f2",
    },
  ];
  return (
    <>
      {loading ? (
        <LoadingSkeletonChartBar />
      ) : (
        <>
          <div className="w-full bg-white rounded-md shadow p-5 flex justify-center items-center h-full">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
}
