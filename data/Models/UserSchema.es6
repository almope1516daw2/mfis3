import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import pbkdf2 from "pbkdf2";


let UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    salt: String,
    hash: String,
    type: String
});

UserSchema.set('toJSON', {getters: true});

let User = mongoose.model('User', UserSchema);

exports.UserSchema = User;

function getUserById(id) {
    return new Promise((resolve, reject) => {
        User.findOne({id: id}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

exports.getUserById = getUserById;

exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.getListOfUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.generateJwt = () => {

    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);


    return jwt.sign({
        _id: this._id,
        name: this.name,
        surname: this.surname,
        mail: this.mail,

        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};


exports.addRegister = ({name, surname, mail, image, salt, hash}) => {
    var newUser = new User({
        name: name,
        surname: surname,
        mail: mail,
        image: image,
        salt: salt,
        hash: hash

    });

    let api_key = 'key-1aae833bae423813bf1e81d378dc216b';
    let domain = 'sandboxaa708984991b4bfd86c8d8fa759302c8.mailgun.org';
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    let data = {
        from: 'Mifisio <postmaster@sandboxaa708984991b4bfd86c8d8fa759302c8.mailgun.org>',
        to: mail,
        subject: 'Gracias por registrarte',
        text: 'Saludos ' + name + ".\n Gracias por registrarte en Mifisio."
    };

    mailgun.messages().send(data, function (error, body) {

    });


    return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.searchLogin = ({mail, password}) => {


        User.findOne({mail: mail}, "mail salt hash").exec((err, res) => {
            let checkHash = crypto.pbkdf2Sync(password, res.salt, 1000, 64).toString('hex');

            if(res===null) {
                console.log(res)
                return null;
            }else if(checkHash === res.hash) {
                console.log(res)
                return res;
            }
            else {
                console.log("not")
                console.log(res)
                return null;
            }

            //err ? reject(err) : resolve(res);
        });

};