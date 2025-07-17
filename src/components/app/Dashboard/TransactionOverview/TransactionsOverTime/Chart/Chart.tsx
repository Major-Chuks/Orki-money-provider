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
import type {
  EChartsOption,
  SeriesOption,
  TooltipComponentOption,
} from "echarts";
import React, { useEffect, useRef } from "react";

// Register ECharts components
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

// Props type now accepts multiple series
type ChartProps = {
  data: string[]; // x-axis labels
  series: { name: string; data: number[]; color?: string }[]; // multiple lines
};

const Chart = ({ data, series }: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);

      const seriesOptions: SeriesOption[] = series.map((s) => ({
        name: s.name,
        type: "line",
        stack: "total", // Important for stacking
        areaStyle: {}, // Enable filled area
        emphasis: { focus: "series" },
        data: s.data,
        color: s.color,
      }));

      const options: EChartsOption = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            const items = Array.isArray(params) ? params : [params];
            return items
              .map((item) => {
                const isSuccess = (item.seriesName ?? "")
                  .toLowerCase()
                  .includes("success");
                const color = isSuccess ? "#30CF22" : "#E03130";
                return `
                  <div style="margin-bottom: 4px;">
                    <span style="color:${color}; font-weight: 500; font-size: 12px">● ${item.seriesName}</span>: ${item.data}
                  </div>
                `;
              })
              .join("");
          },
        } as TooltipComponentOption,
        legend: {
          top: 0,
        },
        grid: {
          left: "0%",
          right: "2%",
          bottom: "0%",
          top: "10%",
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
        series: seriesOptions,
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

// Memoize chart rendering
export default React.memo(Chart, (prev, next) => {
  return (
    JSON.stringify(prev.data) === JSON.stringify(next.data) &&
    JSON.stringify(prev.series) === JSON.stringify(next.series)
  );
});
