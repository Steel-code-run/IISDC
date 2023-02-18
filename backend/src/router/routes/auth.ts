import {Router} from "express";
import {answerMessage, IUser} from "@iisdc/types";
import {generateToken, verifyToken} from "../../auth/jwt";
import {generateAnswer} from "../../utils/generateServerAnswer";
import * as sqliteUsers from "../../API/sqlite/users/users"

const router = Router();

router.post('/auth/login', (req, res) => {
    let userWithPassword:IUser = {
        name: req.body.name ?? "quest",
        password: req.body.password ?? "quest",
    }
    const user = sqliteUsers.getUsers(userWithPassword)[0]

    if (!user){
        res.json(generateAnswer({message: answerMessage.wrongPasswordOrEmailOrName}));
        return;
    }

    const token = generateToken(user)
    res.set("Authorization", "Bearer " + token);
    res.json(generateAnswer({message: answerMessage.success}));


});

router.post("/auth/decodeToken", (req, res)=>{
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token === undefined) {
        res.json(generateAnswer({message:answerMessage.success, data:"token - undefined"}))
        return
    }
    res.json(generateAnswer({message:answerMessage.success, data:verifyToken(token)}))
})
// router.post('/auth/register', (req, res) => {
    // const name = req.body.name;
    // const password = req.body.password;
    //
    // if (!name || !password) {
    //     res.status(400).json(generateAnswer({message: "Name or password is not defined"}));
    //     return;
    // }
    // if (name.length < 3) {
    //     res.status(400).json(generateAnswer({message: "Name must be at least 3 characters long"}));
    //     return;
    // }
    // if (password.length < 6) {
    //     res.status(400).json(generateAnswer({message: "Password must be at least 6 characters long"}));
    //     return;
    // }
    //
    // const userWithPassword:IUser = {
    //     id: -1,
    //     name,
    //     role: UserRole.user,
    //     password,
    // }
    // if (getUserByName(userWithPassword)){
    //     res.status(400).json(generateAnswer({message: answerMessage.userAlreadyExists}));
    //     return;
    // }
    //
    // insertUser(userWithPassword);
    // res.json(generateAnswer({message: answerMessage.success}));
// });

export default router