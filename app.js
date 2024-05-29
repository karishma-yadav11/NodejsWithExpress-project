//IMPORT PACKAGE
const { count, error } = require('console');
const express = require('express');
const { json, status } = require('express/lib/response');
const fs = require('fs');
const { METHODS } = require('http');
const { join } = require('path');
let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movie.json','utf-8')) //it has two parameters
app.use(express.json()); //touse the stringify method we need to use this method

 
//ROUTE = HTTP method + URL
app.get('/information',(req,res)=>{
    res.status(200).json({ 
        count:movies.length,
        data:movies}) //json onject is in always curly bracjets
})

app.get('/',(req,res)=>{
    res.status(200).send("Hello all") //json onject is in always curly braces
})

//create a server
const port = 3000;
app.listen(port,()=>{
     
    console.log("Server has started!..")
})

//POST METHOD
app.post('/',(req,res)=>{
     const newId = movies[movies.length-1].id+1 //index of any value is zero
     const newMovie = Object.assign({id:newId},req.body) //object.asssing method is used to merge the data
     movies.push(newMovie);
     fs.writeFile('./data/movie.json',JSON.stringify(movies),(error)=>{
        res.status(201).json({
            movie:movies
          
        }) //to insert data we use 201 status code and to display the data we use the status code 200

     })
}) //having two parameters
//params method
//by id findout the movie name 
app.get('/:id',(req,res)=>{
    const id = req.params.id *1; // becase of this id separate from url and *1 is used to convert 
                                 //string value into the integer value.
    let movie = movies.find(eL => eL.id ===id) // it is for loop for finding the movie and eL is
                                 // the variable to store the onject and it is a user define
    if(!movie){
        return res.status(400).json({
            message: "Movie  with this id  are Not found"
        })
    }                             
    res.status(200).json({
        movie:movie
    })
})
//By Name findout the movie:
// app.get('/:name',(req,res)=>{
//     const name = req.params.name;
//     let movie = movies.find(el => el.name===name)
//     if(!movie){
//         return res.status(400).json({
//             message: "Movie with this Name are not Found."
//         })
//     }
// })


// PATCH Method
app.patch('/information/:id',(req,res)=>{
    let id = req.params.id *1;
    let movieToUpdate = movies.find(el => el.id ===id)
    if(!movieToUpdate){
        return res.status(400).json({     //json - json formating
            status:"Fail",
            message: "Movie object with ID '+id+'  are not Found."
        })
    }
    let index = movies.indexOf(movieToUpdate)
    Object.assign(movieToUpdate,req.body); // this method is used to replace the data
    movies[index] = movieToUpdate;
    fs.writeFile('./data/movie.json',JSON.stringify(movies),(error)=>{
        res.status(200).json({
            data:movies
        })
    })
 })

 //Delete Method
 app.delete('/deleteinfo/:name',(req,res)=>{
    const name = req.params.name;
    const movieToDelete = movies.find(el => el.name ===name)
    if(!movieToDelete){
        return res.status(400).json({     //json - json formating
            status:"Fail",
            message: "Movie object with ID '+name+'  are not Found."
        })
    }
    const index = movies.indexOf(movieToDelete);
    movies.splice(index,1); //1 is taken that if we delete movie with id 1 the movie with id 2 should we the 1st
    fs.writeFile('./data/movie.json',JSON.stringify(movies),(err)=>{
        
        res.status(204).json({
            status:"success"  ,
            data:"Use get request to check the Updated data"
         })

    })
 })
