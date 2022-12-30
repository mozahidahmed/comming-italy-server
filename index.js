const express=require('express');
const cors = require('cors');
const app =express();
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const port=5000;

//middleware
app.use(cors());
app.use(express.json());

//......................................................

//  const uri="mongodb+srv://cityitaly:FmcUZGB0NRWjbeMP@cluster0.unjca9b.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const uri = "mongodb+srv://service:WqppylUxViB54LVR@cluster0.ro517.mongodb.net/?retryWrites=true&w=majority";

 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 

async function run(){
try{
  await client.connect();

  
  const placesCollection=client.db('tour-italy').collection('places');
  const commentCollection=client.db('tour-italy').collection('comments');
  const hotelCollection=client.db('tour-italy').collection('hotel');
 



   app.get('/places',async(req,res)=>{      
    const query ={};
    const cursor=placesCollection.find(query);
    const place=await cursor.toArray();
    res.send(place);

   })
   
  //  ............
  app.get('/places/:id',async(req,res)=>{
    const id=req.params.id;
    const query={_id: ObjectId(id)}
    const comment=await placesCollection.findOne(query);
    res.send(comment)
  })
  // ............ 
   app.put('/places/:id',async (req,res)=>{
    const id=req.params.id;
    const query ={_id: ObjectId(id)};
    const body=req.body;
    const options={upsert:true}
    const updateDoc={
      $set:{
        likes:body.likes

      }
    }
    const like=await placesCollection.updateOne(query,updateDoc,options)
    res.send(like)
    })





  //  .............
  app.post('/comments',async (req,res)=>{
    const comment=req.body;
    console.log(comment)
    const comments =await commentCollection.insertOne(comment)
    res.send(comments)
    })



    // app.get('/allcomments',async(req,res)=>{      
    //   const query ={};
    //   const cursor= commentCollection.find(query);
    //   const place=await cursor.toArray();
    //   res.send(place);
  
    //  })


  app.get('/comments',async (req,res)=>{
    const name =req.query.name;
    const query={name:name}
    const comments= await commentCollection.find(query).toArray();
    res.send(comments);
    })





  


    
  //  .............



  // ....
  app.get('/hotel',async(req,res)=>{      
    const query ={};
    const cursor=hotelCollection.find(query);
    const hotel=await cursor.toArray();
    res.send(hotel);

   })

   app.get('/hotel/:id',async(req,res)=>{
    const id=req.params.id;
    const query={_id: ObjectId(id)}
    const hotel=await hotelCollection.findOne(query);
    res.send(hotel)
  })
  



  






}

finally{

}


}run().catch(console.dir);



// get
app.get('/',(req,res)=>{
  res.send('running server ')
});

// listen
app.listen(port,()=>{
console.log("I AM FIRST OPERATION",port)
})















