const router = require("express").Router();


router.post('/', async (req, res) => {
    const {username, email, password} = req.body;

    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);

    try{
        await user.signUp();
    }
    catch(error){
        res.status(500).json(error)
    }
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await Parse.User.logIn(username, password);
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;