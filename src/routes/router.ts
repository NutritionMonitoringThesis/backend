import { Request, Response, Router } from "express";
import loginRoute from "./loginRouter";
import userRoute from "./userRouter";
import anakRouter from "./anakRouter";
import { articleRoute } from "./educationRouter";
import testingRouter from "./testingRouter";
import historyRouter from "./historyRouter";
import giziRouter from "./giziMakananRouter";

const router = Router()

router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/anak', anakRouter)
router.use('/education', articleRoute)
router.use('/testing', testingRouter)
router.use('/history', historyRouter)
router.use( '/gizi', giziRouter)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {   
                success: true,
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })
    



export default router