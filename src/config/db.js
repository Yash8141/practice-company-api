import mongoose from 'mongoose'

export async function connectDB(uri){
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB Connected')
    } catch(error){
        console.log('MongoDB Connection error',error);
        process.exit(1)
    }
}