const express = require('express')
const cors = require('cors')
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 4000
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ishayujadon:INrJ3WsIF6wN7xUd@cluster0.7fydh5o.mongodb.net/?retryWrites=true&w=majority');


const Users = mongoose.model('Users', 
{ 
    username: String, 
    password: String,
    likedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
});
const Products = mongoose.model('Products ', { 
    pname: String, 
    pdesc: String, 
    price: String, 
    category: String, 
    pimage: String,
    addedBy: mongoose.Schema.Types.ObjectId
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/like-product', (req,res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;
    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

})

app.post('/add-product', upload.single('pimage'), (req,res)=>{
    console.log(req.body)
    console.log(req.file.path)
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.file.path;
    const addedBy = req.file.userId;

    const product = new Products({ pname,pdesc,price,category,pimage,addedBy});
    product.save()
    .then(()=>{
        res.send({message: 'product saved success'});
    })
    .catch(()=>{
        res.send({message: ' product saved unsuccess'});
    })
})

app.get('/get-products', (req,res)=>{
    Products.find()
        .then((result) => {
            res.send({ message: 'success', products: result })

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}) 

app.get('/get-product/:pId', (req,res)=>{
    console.log(req.params)
    Products.findOne({_id : req.params.pId})
        .then((result) => {
            res.send({ message: 'success', product: result })

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}) 

app.get('/get-user/:uId', (req,res)=>{
    const userId = req.params.uId
    Users.findOne({ _id: userId})
        .then((result) => {
            res.send({ message: 'success', user: result })

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
})

app.get('/liked-products',(req,res)=>{
    Users.find().populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result})

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}) 

app.post('/signup', (req,res)=>{ 
    const username = req.body.username;
    const password = req.body.password;
    const user = new Users({ username: username, password: password});
    user.save()
    .then(()=>{
        res.send({message: 'saved success'});
    })
    .catch(()=>{
        res.send({message: 'saved unsuccess'});
    })

})

app.post('/login', (req,res)=>{ 
    const username = req.body.username;
    const password = req.body.password;
    Users.findOne({username:username})
    .then((result)=>{
        console.log(result)
        if(!result){
            res.send({message: 'user not found'});
        }else{
            if(result.password == password){
                const token = jwt.sign({
                    data: result
                  }, 'MYKEY', { expiresIn: '1h' });
                res.send({message: 'find success', token:token, userId: result._id});
            }
            if(result.password != password){
                res.send({message: 'password wrong'});
            }
        }
    })
    .catch(()=>{
        res.send({message: 'find unsuccess'});
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

