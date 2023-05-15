import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { getUSDate, getUSDateShort } from "../../shared/utils/utils";

export interface LineChartData {
  time: Date;
  value: number;
}

export const RenderLineChart = ({
  data,
  timeMap,
  valueFormatter,
}: {
  data: LineChartData[];
  timeMap: (date: Date) => string;
  valueFormatter?: (value: ValueType) => string | string[];
}) => {
  const chartData = data.map((d) => ({
    ...d,
    time: timeMap(d.time),
  }));
  console.log(chartData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    // <ResponsiveContainer className="w-full h-full">
    //   <LineChart data={chartData}>
    //     <CartesianGrid vertical={false} opacity={50} strokeOpacity={0.5} />
    //     <Line
    //       type="monotone"
    //       dot={false}
    //       dataKey="value"
    //       stroke="#8884d8"
    //       strokeWidth={1.5}
    //       animationDuration={0}
    //     />
    //     <XAxis
    //       dataKey="time"
    //       style={{
    //         fontSize: "0.85rem",
    //       }}
    //     />
    //     <YAxis
    //       style={{
    //         fontSize: "0.85rem",
    //       }}
    //     />
    //     <Tooltip
    //       formatter={(value) =>
    //         valueFormatter ? valueFormatter(value) : value
    //       }
    //     />
    //   </LineChart>
    // </ResponsiveContainer>
  );
};
