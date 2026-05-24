const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://marwinez:${password}@notesapp.weicngo.mongodb.net/notesapp?appName=notesapp`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
        id: '3',
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true,
    })

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })