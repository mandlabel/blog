import { Router } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
    trim: true,
  },
  password: { type: String, select: false },
  registeredAt: { type: Date, default: Date.now, select: false },
})

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)

const router = Router()

const TOKEN_SECRET = 'some very secret text'

router.post('/register', async (req, res, next) => {
  const { username, password, password2 } = req.body
  const user = await User.findOne({ username })
  if (user || password != password2) {
    // next('User exists / Wrong password!')
    res.status(401).json({message: 'Felhasználó létezik / Rossz jelszó!'})
  } 
  else if(!user && password == password2) {
    const hashed = await bcrypt.hash(password, 10)
    const createdUser = await User.create({ username, password: hashed })
    res.json({ id: createdUser.id })
  }
})


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')
  const match = await bcrypt.compare(password, user.password)
  if (!user || !match ) {
    // next('No such user / Wrong password!') 
    res.status(401).json({message: 'Nem található név / Rossz jelszó!'})
  } else {
    const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
      expiresIn: '1h',
    })
    res.cookie('auth', token, { httpOnly: true })
    res.json({ token })
  }
})

const authMW = async (req, res, next) => {
  const token = req.cookies.auth
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    next()
  } catch (error) {
    next(error)
  }
}
// get loggedIn
router.get("/loggedIn", async (req, res) => {
  const token = req.cookies.auth
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    res.send(true)
  } catch (error) {
    res.send(false)
  }
});
// log out
router.get("/logout", authMW, (req, res) => {
  res.cookie("auth", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send()
});
// get user posts
router.get('/mypost', authMW, async (req, res) => {
  const myposts = await Post.find({ createdBy: req.user })
  res.json(myposts)
})
// get all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find({}).populate('createdBy').exec()
  console.log(posts)
  res.json(posts)
})
// write post
router.post('/posts', authMW, async (req, res) => {
  try {
    const { title, content } = req.body
    const created = await Post.create({ title, content, createdBy: req.user })
    res.json(created)
  }
  catch(err) {
    res.status(500).send(err.message);
  }
})
// delete post
router.delete('/remove/:id', async (req, res) => {
    const deleted = await Post.findByIdAndDelete(req.params.id)
    res.json(deleted)
}); 
// update post
router.put('/update/:id', async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, {title : req.body.title, content : req.body.content})
  res.json(updated)
})

router.get('/csrf-protection', (req, res) => {
  try {
    res.json({ csrfToken: req.csrfToken() })
  }catch(err) {
    console.error(err)
  }
})

export default router
