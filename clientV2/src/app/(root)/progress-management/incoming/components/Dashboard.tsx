import { useMemo } from "react";
import useProgressAssetManagement from "../hooks";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TInputsProgress } from "../../types";

export default function Dashboard() {
  const { dataProgressList } = useProgressAssetManagement();

  const aggregatedByDept = useMemo(() => {
    if (!dataProgressList) return [];
    const sums: Record<string, number> = {};
    dataProgressList.data?.forEach((row: TInputsProgress) => {
      const dept = row.dept;
      const num =
        parseFloat(row.totalRecipt.toString().replace(/[^0-9.-]+/g, "")) || 0;
      sums[dept] = (sums[dept] || 0) + num;
    });
    const totalAll = Object.values(sums).reduce((a, b) => a + b, 0);
    return Object.entries(sums).map(([dept, sum]) => ({
      name: dept,
      value: sum,
      percent: totalAll > 0 ? +((sum / totalAll) * 100).toFixed(1) : 0,
    }));
  }, [dataProgressList]);
  const fixedColors: Record<string, string> = {
    HCGS: "#a667b0",
    PLANT: "#e1c134",
    ICT: "#09114f",
    SHE: "#78b5f8",
    ENG: "#5e166a",
  };

  const prByDept = useMemo(() => {
    if (!dataProgressList) return [];
    const sums: Record<string, number> = {};
    dataProgressList.data?.forEach((row: TInputsProgress) => {
      const dept = row.dept;
      const num =
        parseFloat(row.totalPr.toString().replace(/[^0-9.-]+/g, "")) || 0;
      sums[dept] = (sums[dept] || 0) + num;
    });
    const totalAll = Object.values(sums).reduce((a, b) => a + b, 0);
    return Object.entries(sums).map(([dept, sum]) => ({
      name: dept,
      value: sum,
      percent: totalAll > 0 ? +((sum / totalAll) * 100).toFixed(1) : 0,
    }));
  }, [dataProgressList]);

  const rupiahFormatter = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const prOutstanding = useMemo(() => {
    if (!dataProgressList) return 0;
    return (
      dataProgressList.data?.reduce((acc: number, row: TInputsProgress) => {
        const num =
          parseFloat(row.prOutstanding.toString().replace(/[^0-9.-]+/g, "")) ||
          0;
        return acc + num;
      }, 0) ?? 0
    );
  }, [dataProgressList]);

  const poOutstanding = useMemo(() => {
    if (!dataProgressList) return 0;
    return (
      dataProgressList.data?.reduce((acc: number, row: TInputsProgress) => {
        const num =
          parseFloat(row.poOutstanding.toString().replace(/[^0-9.-]+/g, "")) ||
          0;
        return acc + num;
      }, 0) ?? 0
    );
  }, [dataProgressList]);

  const prCurrent = prOutstanding;
  const prMax = 721000000;
  const poCurrent = poOutstanding;
  const poMax = 905000000;

  const prPercentage = (prCurrent / prMax) * 100;
  const poPercentage = (poCurrent / poMax) * 100;

  const prData = [{ value: prPercentage, fill: "#4096ff" }];
  const poData = [{ value: poPercentage, fill: "#4096ff" }];

  const formatToJt = (value: number) => Math.round(value / 1_000_000);

  const prCurrentJt = formatToJt(prCurrent);
  const poCurrentJt = formatToJt(poCurrent);
  const prMaxJt = formatToJt(prMax);
  const poMaxJt = formatToJt(poMax);

  return (
    <>
      <div className="w-full flex flex-col md:grid grid-cols-3 gap-4 max-h-[377px]">
        <div className="flex flex-col gap-4">
          <div className="bg-red-600 h-[180px] rounded-md shadow-sm p-3">
            <div className="text-white font-bold text-center text-sm mb-1">
              TOTAL PR OUTSTANDING
            </div>

            <div className="relative flex justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  innerRadius="65%"
                  outerRadius="100%"
                  barSize={20}
                  startAngle={180}
                  endAngle={0}
                  data={prData}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background={{ fill: "white" }}
                    dataKey="value"
                    cornerRadius={0}
                    angleAxisId={0}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 gap-10 justify-center transform flex items-center -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">
                <div className="text-sm pl-4">0Jt</div>
                {prCurrentJt}Jt
                <div className="text-sm">{prMaxJt}Jt</div>
              </div>
            </div>
          </div>

          <div className="bg-red-600 h-[180px] rounded-md shadow-sm p-3">
            <div className="text-white font-bold text-center text-sm mb-1">
              TOTAL PO OUTSTANDING
            </div>
            <div className="relative flex justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  innerRadius="65%"
                  outerRadius="100%"
                  barSize={20}
                  startAngle={180}
                  endAngle={0}
                  data={poData}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background={{ fill: "white" }}
                    dataKey="value"
                    cornerRadius={0}
                    angleAxisId={0}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 gap-10 justify-center transform flex items-center -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">
                <div className="text-sm pl-4">0Jt</div>
                {poCurrentJt}Jt
                <div className="text-sm">{poMaxJt}Jt</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-indigo-900 h-[377px] rounded-md shadow-sm">
          <div className="text-white font-bold text-center text-sm mb-1 mt-5">
            TOTAL PR/PO DAN TOTAL BUDGET OLEH DEPT
          </div>
          <ResponsiveContainer width="100%" maxHeight={300}>
            <PieChart>
              <Pie
                data={prByDept}
                dataKey="value"
                nameKey="name"
                cx="55%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: ${entry.percent}%`}
              >
                {prByDept.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={fixedColors[entry.name] || "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  rupiahFormatter(value),
                  name,
                ]}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => (
                  <span style={{ color: "white" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-indigo-900 h-[377px] rounded-md shadow-sm">
          <div className="text-white font-bold text-center text-sm mb-1 mt-5">
            TOTAL PO RECIPT DEPT
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aggregatedByDept}
                  dataKey="value"
                  nameKey="name"
                  cx="55%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.percent}%`}
                >
                  {aggregatedByDept.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={fixedColors[entry.name] || "#8884d8"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    rupiahFormatter(value),
                    name,
                  ]}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  formatter={(value) => (
                    <span style={{ color: "white" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
