const express = require('express');
const fs= require('fs');
const app = express();

app.post('/users', (req,res) =>{
    let body='';
    req.on('data', chunk=>{
        body +=chunk.toString()
    })
    req.on('end',()=>{
        try{
            const data = JSON.parse(body);
            //console.log(req.body);
            //console.log(req.app,req.baseurl,req.cookies,req.path,req.secure,req.protocol,req.signedcookies,req.stale,req.subdomains,req.xhr);
            //console.log(data);
            const users= JSON.parse(fs.readFileSync('./users.json','utf-8'))
            const existUsername = users.usersData.find(obj=>obj.username === data.username)
            const existEmail= users.usersData.find(obj=>obj.email === data.email)
            if(existUsername){
                res.end("Username is already taken");
            }
            else if(existEmail){
                res.end("Email is already taken");
            }
            else{
                  users.usersData.push(data) //pushing data that is on line 12
                  const datastore=JSON.stringify(users)
                  fs.writeFileSync("./users.json",datastore)
                  res.end("Added")
                }
        }catch(error){
            res.statusCode=400;
            res.end("Invalid JSON data");
        }
       
    })
})

app.listen(1090, () =>{
    console.log("Server listening on port 1090");
})