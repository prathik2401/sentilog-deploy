import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import HistoryChart from "@/components/HistoryChart";
import React from "react";
import "./History.css"; // Assuming you move the CSS to an external file for cleanliness

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  });

  const sum = analyses.reduce(
    (all, current) => all + current.sentimentScore,
    0
  );
  const avg = Math.round(sum / analyses.length);
  return { analyses, avg };
};

const History = async () => {
  const { avg, analyses } = await getData();

  return (
    <div className="history-container">
      <div className="title">{`View your mood insights here`}</div>
      <div className="chart-container">
        <div>{`Average Sentiment: ${avg}`}</div>
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default History;
