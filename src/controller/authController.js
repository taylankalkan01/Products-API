const User = require("../model/User")
const Joi = require("@hapi/joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerSchema = Joi.object({
    name:Joi.string().required().min(3).max(255),
    email:Joi.string().required().email().min(6).max(255),
    password:Joi.string().required().min(6).max(255),
})

const loginSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
})


const loginController = (req,res)=>{
    const { error } = registerSchema.validate(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password,salt)

    const user = new User({ ...req.body,password:hash })
    user.save()
    .then((user) => {

        const token = jwt.sign({_id:user._id,},process.env.JWT_CODE)
        res .header("Authorization",token).json({ accessToken: token });

    }).catch((err) => {
        res.json(err);
    });
}

const registerController = (req,res)=>{
    const {email,password} = req.body;

    const { error } = loginSchema.validate({ email, password });
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    User.findOne({email})
    .then((user) =>{
        //user check
        if(!user){
            res.status(400).send("Invalid email or password")
            return;
        }

        //password check
        const isValid = bcrypt.compareSync(password,user.password);
        if(!isValid){
            res.status(400).send("Invalid email or password")
            return;
        }

        const token = jwt.sign({_id:user._id,},process.env.JWT_CODE)

        //if user and password are correct then:
        res .header("Authorization",token)
            .json({ accessToken: token });

    })
    .catch(()=>{
        res.status(400).send("Invalid email or password")
    })
}

module.exports = {
    loginController,
    registerController
}