/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from "./Chart.module.css";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import React, { useEffect, useRef } from "react";
import type { BarSeriesOption } from "echarts/charts";

// Register the required components
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  BarChart,
  CanvasRenderer,
]);

const Chart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // There should not be negative values in rawData
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320],
  ];
  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  const series: BarSeriesOption[] = [
    "Direct",
    "Mail Ad",
    "Affiliate Ad",
    "Video Ad",
    "Search Engine",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: true,
        formatter: (params: any) => Math.round(params.value * 1000) / 10 + "%",
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      ),
    };
  });

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      const options: echarts.EChartsCoreOption = {
        grid: {
          left: "0%",
          right: "2%",
          bottom: "0%",
          top: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series,
      };
      chartInstance.current.setOption(options);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

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

export default Chart;

// export default React.memo(Chart, (prevProps, nextProps) => {
//   return JSON.stringify(prevProps.source) === JSON.stringify(nextProps.source);
// });
