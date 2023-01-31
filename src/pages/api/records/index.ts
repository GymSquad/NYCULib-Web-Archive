import { prisma } from "@/server/db";
import { createRecordSchema } from "@/types/record";
import { formatErrors } from "@/utils/error";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";

const recordHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      getRecord(req, res);
      break;
    case "POST":
      createRecord(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} Not Allowed`);
  }
};

const postSchema = z.object({
  body: createRecordSchema,
});

const getRecord = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const records = await prisma.record.findMany().catch(console.error);
    res.status(200).send(records);
  } catch {
    res.status(500).send("Internal Error");
  }
};

const createRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedReq = await postSchema.spa(req);
  if (!parsedReq.success) {
    res.status(422).send(formatErrors(parsedReq.error));
    return;
  }
  const { office, url } = parsedReq.data.body;
  const createdRecord = await prisma.record
    .create({
      data: {
        office,
        url,
      },
    })
    .catch(console.error);
  res.status(201).send(createdRecord);
};

export default recordHandler;
