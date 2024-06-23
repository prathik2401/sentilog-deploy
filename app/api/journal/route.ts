import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
    const user = await getUserByClerkId()
    const log = await prisma.journalLog.create({
        data: {
            userId: user.id,
            content: 'Write about your day here.'
        }
    })

    const analysis = await analyze(log)
    await prisma.analysis.create({
        data: {
            userId: user.id,
            logId: log.id,
            ...analysis
        }
    })

    revalidatePath('/journal')

    return NextResponse.json({data: log})
}