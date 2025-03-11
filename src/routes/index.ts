import {Router} from "express";


const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from router");
})


router.get("/test-error", (req, res) => {
    throw new Error();
})
export default router;