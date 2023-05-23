import { Request, Response, Router } from "express";

const router = Router()

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })
    



export default router