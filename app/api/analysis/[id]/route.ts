import { prisma } from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';
 // Adjust the import path according to your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const analysis = await prisma.analysis.findUnique({
      where: {
        id: String(id), // Ensure the id is treated as a string, adjust the type casting as necessary
      },
    });

    if (analysis) {
      res.status(200).json(analysis);
    } else {
      res.status(404).json({ message: 'Analysis not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}