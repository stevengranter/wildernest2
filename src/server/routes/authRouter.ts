import {Router} from 'express';

const router = Router();

router.post("/login", async (req, res) => {
    console.log(req.body);
    res.send("Received data");

})

export {router as authRouter}
