const express = require('express')
const path = require("path");
const cp = require("child_process");
const nodemailer = require("nodemailer");
let PORT = process.env.PORT || 3000;
const app = express()

// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "", // generated ethereal user
//       pass: "", // generated ethereal password
//     },
//   });

app.get('/', function (req, res) {
    let pathOfIndexFile = path.join(__dirname, 'index.html');
    res.sendFile(pathOfIndexFile);
})

app.get('/details/:pin/:age/:email/',async function(req,res){
    let pin = req.params.pin;
    let email = req.params.email;
    let age = req.params.age;
    let scriptPath = path.join(__dirname,'script.js');
    let arr = cp.execSync(`node ${scriptPath} ${pin} ${age}`);
    res.send(arr);
    // let info = await transporter.sendMail({
    //     from: '"Mohd Aman" <saifiamaan@gmail.com>', // sender address
    //     to:  `${email}`, // list of receivers
    //     subject: "Figth Against Covid", // Subject line
    //     html: "<b>Schedule of Vaccination</b>", // html body
    //     attachments:[{path:"./Schedule.xlsx"}]
    //   });
    //   console.log("Message sent: %s", info.messageId);
})

app.listen(PORT,function(req,res){
  console.log("server is running");
})
