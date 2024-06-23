import { qa } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    const { question } = await request.json()
    const user = await getUserByClerkId()

    const logs = await prisma.journalLog.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
        }
    })

    const answer = await qa(question, logs)

    return NextResponse.json({data: answer})
}