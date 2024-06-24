"use client";

const LogCard = ({ entry, analysis }) => {
  const date = new Date(entry.createdAt).toDateString();

  // Find the analysis for the current entry
  const entryAnalysis = analysis.find((an) => an.logId === entry.id);

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
      <div className="px-4 py-5 bg-pink-600 text-white font-semibold sm:px-6">
        {date}
      </div>
      {entryAnalysis ? (
        <div className="px-4 py-5 bg-pink-300 text-gray-900 sm:p-6">
          Subject: {entryAnalysis.subject || "Loading..."}
        </div>
      ) : (
        <div className="px-4 py-5 bg-pink-300 text-gray-900 sm:p-6">
          Subject: Loading...
        </div>
      )}
      <div className="px-4 py-4 bg-pink-300 text-gray-900 sm:px-6">
        Mood: {entryAnalysis?.mood || "Loading..."}
      </div>
    </div>
  );
};
export default LogCard;
