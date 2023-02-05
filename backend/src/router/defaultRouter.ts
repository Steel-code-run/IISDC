import {Router} from 'express';
import {answerMessage, IUserWithPassword} from '@iisdc/types';
import {getUserByName, getUserByNameAndPassword, insertUser} from "../API/sqlite/users/users";
import {generateAnswer} from "../utils/generateServerAnswer";
import {generateToken} from "../auth/jwt";

const defaultRouter = Router();


defaultRouter.post('/login', (req, res) => {
	let userWithPassword:IUserWithPassword = {
		id: -1,
		name: req.body.name ?? "quest",
		password: req.body.password ?? "quest",
	}
	userWithPassword =  getUserByNameAndPassword(userWithPassword)

	if (!userWithPassword){
		res.json(generateAnswer({message: answerMessage.wrongPasswordOrEmail}));

		return;
	}

	const token = generateToken(userWithPassword)
	res.set("Authorization", "Bearer " + token);
	res.json(generateAnswer({message: answerMessage.success}));


});
defaultRouter.post('/register', (req, res) => {
	const name = req.body.name;
	const password = req.body.password;
	if (!name || !password) {
		res.status(400).json(generateAnswer({message: "Name or password is not defined"}));
		return;
	}
	if (name.length < 3) {
		res.status(400).json(generateAnswer({message: "Name must be at least 3 characters long"}));
		return;
	}
	if (password.length < 6) {
		res.status(400).json(generateAnswer({message: "Password must be at least 6 characters long"}));
		return;
	}

	const userWithPassword:IUserWithPassword = {
		id: -1,
		name,
		password,
	}
	if (getUserByName(userWithPassword)){
		res.status(400).json(generateAnswer({message: answerMessage.userAlreadyExists}));
		return;
	}

	res.json(generateAnswer({message: answerMessage.success}));

});



export default defaultRouter;