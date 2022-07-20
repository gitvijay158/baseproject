require("../config/mongoose").connect();
var User = require('../model/userModel.js');

exports.userList = async function (req, res) {
    res.status(200).send("users list");
}

exports.user = async function (req, res) {
    // Create a new user
    console.log('user token')
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.profile = async function (req, res) {
    // View logged in user profile
    res.send(req.user)
}

exports.login = async function (req, res) {
    console.log('user token login')
    
    //Login a registered user
    try {
        const { email, password } = req.body

        //console.log('user token login 2', req)
    
        const user = await User.findByCredentials(email, password)

        //console.log('user token login', user)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.logout = async function (req, res) {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.logoutall = async function (req, res) {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.adduser = async function (req, res) {

    // res.status(200).send("users add");
    User.create({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        salary: req.body.salary,
        empID: req.body.empID,
        joiningDate: req.body.joiningDate

    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database." + err);
            res.status(200).send(user);
        });
};


exports.alluser = async function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
};

exports.deleteuser = async function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
}

exports.updateuser = async function (req, res) {

    console.log('page found')
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user." + err);
        res.status(200).send(user);
    });
}

exports.singleuser = async function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
}