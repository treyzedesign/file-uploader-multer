const express  = require('express')
const cors = require('cors')
const path = require('path')
const multer = require("multer");
const { readFile } = require('fs');
const port = 4000
const server = express()
server.use(express.json())
server.use(cors())
// server.use(express.urlencoded({ extended: true }));
server.use("/uploads", express.static('uploads'))
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }

})
const upload = multer({storage: storage,
                       limits: {
                        fileSize: 1024 * 1024 * 11//4mb
                    }
    })

server.get('/server', (req, res)=>{
    res.send("welcome")
})
server.post('/server',upload.single('user-image'), (req,res)=>{
    console.log(req.file);
    res.status(201).json(req.file)
});

server.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})