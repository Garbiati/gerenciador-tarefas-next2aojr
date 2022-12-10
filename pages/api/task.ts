import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../middlewares/database";
import { jwtValidator } from "../../middlewares/jwt";
import { TaskModel } from "../../models/TaskModel";
import { DefaultMsgResponse } from "../../types/DefaultMsgResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse | object>) => {
    try {

        const userId = req?.body?.userId ? req.body.userId : req?.query?.userId;

        switch(req.method){
            case 'GET': 
                return await getTasks(req,res, userId);
            default:
                return res.status(405).json({error: 'O Método HTTP informado não existe'});
        }

    } catch (e: any) {
        console.log('Ocorreu erro ao utilizar as tarefa:', e);
        return res.status(500).json({ error: 'Ocorreu erro ao utilizar as tarefa, tente novamente' });
    }
}

const getTasks = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse | object>, userId:string) => {
    const result = await TaskModel.find({userId});
    return res.status(200).json(result);
}

export default connectToDB(jwtValidator(handler));