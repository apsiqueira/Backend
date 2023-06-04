import express from 'express';import { Interface } from 'readline';
import{v4 as uuid} from 'uuid'
const app=express();
//metodos htpp post|get|post|delete
//http://localhost:3333/users
let server:string="http://localhost:3333/";
app.use(express.json());

function checarExistencia(array:{id:string,nome:string,idade:string,eCivil:string}[],id:string){


}
// function checkRecordExists(//parametro de array para função
// array:User[],
//   //paramento de id para função as duas devem ser satifeitas e validas retornando true para prosseguir
//   id: string): boolean {
//     //variavel index recebe o index do objeto da lista caso encontre caso contrario nao retorna nada.
//   const index = array.findIndex((record) => record.id === id);
//   return index !== -1;
// }

interface User{
  id:string,
  nome:string,
  idade:number;
  eCivil:string
}

const users:User[]=[{id:uuid(),nome:"Pablo", idade:20,eCivil:"Casado"}];

app.get('/users',(request,response)=>{
 // return response.json(['usuario 1','usuario 2']);
 //const {perPage,currentPage}=request.query;
 return response.json(
  users
 );


});
app.post('/users',(request,response)=>{
  const {nome,idade,eCivil}=request.body;
  const user={
    id:uuid(),
    nome,
    idade,
    eCivil
    
  }
users.push(user);
  //return response.json(user);
  return response.status(200).json(user);

//return response.json({message:'criando usuario',body});
});


app.put('/users/:id',(request,response)=>{
//const params=request.params;
const {id}=request.params;  
const {nome,idade,eCivil}=request.body;
const attUser={id,nome,idade,eCivil}
const userIndex=users.findIndex((user)=>
  user.id===id);
  if(userIndex !==-1){
    users[userIndex]=attUser;
    return response.status(200).json("success");
    
  }
  else{
    return response.status(404).json("Usuario não encontrado");
  }




//return response.json({message:'atualizando usuario' + params.id});
});



app.delete('/users/:id',(request,response)=>{
   const {id}=request.params;

   const userIndex=users.findIndex((user)=>
  user.id===id);
  if(userIndex !==-1){
    users.splice(userIndex,1);
    return response.status(200).json("success");
    
  }
  else{
    return response.status(404).json("Usuario não encontrado");
  }




});


app.listen('3333',()=>{

  console.log("server start");

})