const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const port = 8000;
app.use('/files', express.static("files"))


require("./config/mongoose.config")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const AllUserRoutes = require('./routes/user.route')
AllUserRoutes(app)

const AllBookRoutes = require('./routes/book.route')
AllBookRoutes(app)

const AllAdminRoutes = require('./routes/admin.route')
AllAdminRoutes(app)

const AllAuditTrailRoutes = require('./routes/audit_trail.route')
AllAuditTrailRoutes(app)

app.listen(port, () => {
    console.log('server is running')
})









app.get('/', async (req, res) => {
    res.send("suceess")
})



const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

require("./models/file.model")
const FileSchema = mongoose.model("File")

require("./models/book.model")
const Book = mongoose.model("Book")

app.put('/upload-files/:id', upload.single("file"), async (req, res) => {
    console.log(req.file)
    res.send("HI")


    try {
        const fileName = req.file.filename;

        // Replace 'req.params.id' with the actual book ID you're updating
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { book_file: fileName },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook });

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
})

app.get("/get-files", async (req, res) => {
    try {
        FileSchema.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {

    }
})





require('./models/image.model')
const Images = mongoose.model('Image')

