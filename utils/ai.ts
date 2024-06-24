import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from "@langchain/core/prompts"
import { Document } from 'langchain/document'
import { loadQARefineChain } from "langchain/chains"  
import { MemoryVectorStore } from "langchain/vectorstores/memory"

const parser = StructuredOutputParser.fromZodSchema(
    z.object({ 
        mood: z.string().describe('the mood of the person who wrote the journal entry'),
        subject: z.string().describe('the subject of the input prompt, i.e. the journal log(do not use the word journal, and emotions)'),
        summary: z.string().describe('quick summary of the entry in second person. it should be a single sentence only, not exceeding 8 words!'),
        color: z.string().describe('a hexadecimal color code representing the mood of the journal entry. Example #0101fe for blue representing happiness'),
        negative: z.boolean().describe('is the journal entry negative? (i.e. it does it contain negative emotions?)'),
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
    })
)

const getPrompt = async (content) => {
    let format_instructions = parser.getFormatInstructions();
    format_instructions = format_instructions.replace(/{/g, '{{').replace(/}/g, '}}');

    const prompt = new PromptTemplate({
        template: `Analyze the following journal entry. Follow the instructions and
        format your response to match the format instructions, no matter what!\n
        ${format_instructions}\n${content}`,
        inputVariables: ['log'],
        partialVariables: { format_instructions },
    });
    const input = await prompt.format({
        log: content,
    });
    console.log(input);
    
    return input;
}

export const analyze = async (log) => {
    const input = await getPrompt(log)
    const model = new ChatGoogleGenerativeAI({
        temperature: 0,
        model: 'gemini-pro', 
        maxOutputTokens: 100,
    })
    const result = await model.invoke(input)
    try {
        return parser.parse(result.content.toString())
    } catch (error) {
        console.log(error);
    }
}

// Question Component

export const qa = async (question, logs) => { 
    console.log(logs.createdAt);
    
    const docs = logs.map((log) => {
        return new Document({
            pageContent: log.content,
            metadata: {
                id: log.id,
                createdAt: log.createdAt,
            }
        })
    })
    const model = new ChatGoogleGenerativeAI({temperature: 0, modelName: 'gemini-pro',})
    const chain = loadQARefineChain(model)
    const embeddings = new GoogleGenerativeAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question)
    const modifiedQuestion = `Please answer the following question in less than 20 words, and respond in second person: ${question}. don't use the words refined answer, and dont tell me the count of words!`;
    const res = await chain.invoke({
        input_documents: relevantDocs,
        question: modifiedQuestion,
    })
    return res.output_text
}