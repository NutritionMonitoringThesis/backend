import { Request, Response, Router } from "express";
import loginRoute from "./loginRouter";
import userRoute from "./userRouter";
import anakRouter from "./anakRouter";
import { articleRoute } from "./educationRouter";

const router = Router()

router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/anak', anakRouter)
router.use('/education', articleRoute)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })
    



export default router