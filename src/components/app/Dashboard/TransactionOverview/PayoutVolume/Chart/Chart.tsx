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
import { get_transactionVolume } from "@/types/apis/analytics/get_transactionVolume";
import { IntervalType } from "../../../Dashboard";
import { formatDateByInterval } from "@/services/utils";

// Register the required components
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  BarChart,
  CanvasRenderer,
]);

const convertToChartData = (input: get_transactionVolume): number[][] => {
  const providers = Object.keys(
    input.provider_color_map
  ) as (keyof get_transactionVolume["data"][number]["providers"])[];

  // Initialize empty arrays: one per provider
  const chartData: number[][] = providers.map(() => []);

  input.data.forEach((entry) => {
    providers.forEach((provider, providerIndex) => {
      const value = entry.providers[provider] ?? 0;
      chartData[providerIndex].push(value);
    });
  });

  return chartData;
};

const Chart = ({
  data,
}: {
  data: get_transactionVolume;
  interval: IntervalType;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const rawData = convertToChartData(data);

  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  const series: BarSeriesOption[] = Object.keys(data.provider_color_map).map(
    (name, sid) => {
      return {
        name,
        type: "bar",
        stack: "total",
        barWidth: "60%",
        itemStyle: {
          color:
            data.provider_color_map[
              name as keyof typeof data.provider_color_map
            ],
        },
        label: {
          show: true,
          formatter: (params: any) =>
            Math.round(params.value * 1000) / 10 + "%",
        },
        data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        ),
      };
    }
  );

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
          data: data.data.map((entry) =>
            formatDateByInterval(entry.date, data.interval)
          ),
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
