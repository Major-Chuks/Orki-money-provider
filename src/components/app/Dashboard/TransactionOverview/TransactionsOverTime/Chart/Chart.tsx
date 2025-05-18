import classes from "./Chart.module.css";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsOption } from "echarts";
import React, { useEffect, useRef } from "react";

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

const Chart = ({ data, series }: { data: string[]; series: number[] }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      const options: EChartsOption = {
        grid: {
          left: "0%",
          right: "2%",
          bottom: "0%",
          top: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: series,
            type: "line",
            areaStyle: {},
          },
        ],
      };
      chartInstance.current.setOption(options);
    }

    return () => {
      chartInstance.current?.dispose();
    };
  }, [data, series]);

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    const events = ["resize", "resize-panel"];
    events.forEach((event) => window.addEventListener(event, handleResize));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleResize)
      );
    };
  }, []);

  return <div className={classes.chart} ref={chartRef}></div>;
};

export default React.memo(Chart, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.series) === JSON.stringify(nextProps.series)
  );
});
