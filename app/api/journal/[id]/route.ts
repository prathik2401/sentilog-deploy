import { analyze } from "@/utils/ai"
import { updatedLog } from "@/utils/api"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async (req: Request, { params }) => {
    const {content} = await req.json()
    const user = await getUserByClerkId()
    const updatedLog = await prisma.journalLog.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content,
        },
        include: {
            analysis: true,
        }
    })

    const analysis = await analyze(updatedLog.content)    

    const updated = await prisma.analysis.upsert({
        where: {
            logId: updatedLog.id,
        },
        create: {
            userId: user.id,
            logId: updatedLog.id,
            ...analysis
        },
        update: analysis
    })

    revalidatePath('/journal/${log.id}')

    return NextResponse.json({data: {...updatedLog, analysis: updated}})
}