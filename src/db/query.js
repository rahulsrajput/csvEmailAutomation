import { ObjectId } from 'mongodb'


const query = [
    {
        $match:{
            _id: new ObjectId("69148285e25411e0bd7f59ab")
        }
    }
]

export default query;