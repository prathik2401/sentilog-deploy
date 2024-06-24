"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import React, { useState, useEffect } from "react";

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (active) {
    const analysis = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5  shadow-md border border-zinc-700 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30 text-slate-200">
          {dateLabel}
        </p>
        <p className="intro text-xl uppercase font-semibold">{analysis.mood}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = ({ data }) => {
  const [chartProps, setChartProps] = useState({
    strokeWidth: 2,
    activeDotRadius: 8,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartProps({
          strokeWidth: 1,
          activeDotRadius: 4,
        });
      } else {
        setChartProps({
          strokeWidth: 2,
          activeDotRadius: 8,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#00E396"
          strokeWidth={chartProps.strokeWidth}
          activeDot={{ r: chartProps.activeDotRadius }}
        />
        <XAxis dataKey="updatedAt" stroke="#9e9e9e" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
