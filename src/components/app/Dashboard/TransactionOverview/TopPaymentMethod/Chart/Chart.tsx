import classes from "./Chart.module.css";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import React, { useEffect, useRef } from "react";

// Register the required components
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  PieChart,
  CanvasRenderer,
]);

const Chart = ({
  data,
  name,
}: {
  data: { value: number; name: string; color: string }[];
  name: string;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      const options: echarts.EChartsCoreOption = {
        tooltip: {},
        series: [
          {
            color: ["#00E065", "#FFC561", "#FF7B7B", "#00E065"],
            name,
            type: "pie",
            radius: ["70%", "100%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            data: data.map((item) => ({
              ...item,
              itemStyle: { color: item.color },
            })),
          },
        ],
      };
      chartInstance.current.setOption(options);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    const events = ["resize", "resize-panel"];
    events.forEach((event) => window.addEventListener(event, handleResize));

    // Cleanup listeners on unmount
    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleResize)
      );
    };
  }, []);

  return <div className={classes.chart} ref={chartRef}></div>;
};

export default React.memo(Chart, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});
