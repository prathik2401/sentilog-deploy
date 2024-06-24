import LogCard from "@/components/LogCard";
import NewLogCard from "@/components/NewLogCard";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

const getlogs = async () => {
  const user = await getUserByClerkId();
  const logs = await prisma.journalLog.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return logs;
};

const getAnalysis = async () => {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  });
  return analysis;
};

const JournalPage = async () => {
  const logs = await getlogs();
  const analysis = await getAnalysis();
  return (
    <div className="p-10 bg-zinc-900 h-full">
      <h2 className="text-3xl mb-8 text-white font-semibold">Logs</h2>
      <div className="w-full my-8">
        <Question />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10">
        <NewLogCard />
        {logs.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <LogCard entry={entry} analysis={analysis} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
