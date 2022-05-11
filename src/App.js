import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
class App extends React.Component {
//   creating costructor
  constructor(props) {
   super(props)
 
   this.state = {
      users:[],
      name:'',
      email:'',
      id:0,
    
      
   }
 }

  //  fetch
  componentDidMount(){
    axios.get("http://localhost:4000/users")
    .then(result=>{
      //  for showing dta
      this.setState({
        users:result.data
      })
    })
  }

  //  ye method vlaue set kr dega jo hum write krne ki kisis kr rahe hai
 // state k under set krdega name vali k
  nameChange=(e)=>{
  this.setState({
    name:e.target.value
  })
}
//  ye method vlaue set kr dega jo hum write krne ki kisis kr rahe hai
// state k under set krdega email vali k
emailChange=(e)=>{
  this.setState({
    email:e.target.value
  })
}
// send post req for adding new user
addRec=(e,id)=>{



  if(id===0){
    axios.post('http://localhost:4000/users',{name:this.state.name,email:this.state.email})//pssing data as a state when we work with post
    .then(()=>{
      this.componentDidMount();
    })
  }else{

    axios.put(`http://localhost:4000/users/${id}`,{name:this.state.name,email:this.state.email})//pssing data as a state when we work with post
    .then(()=>{
      this.componentDidMount();
    })
  }

}

// dlete fuction
delRec=(e,id)=>{
  axios.delete(`http://localhost:4000/users/${id}`)//pssing data as a state when we work with post
  .then( ()=> {  
    // console.log(res);  
    // console.log(res.data);  

    // const posts = this.state.users.filter(item => item.id !== id);  
    // this.setState({ posts });  
    this.componentDidMount();
  })
  
  }
// edit fnction
  editRec=(e,id)=>{ 
axios.get(`http://localhost:4000/users/${id}`).
then(result=>{
this.setState({
  name:result.data.name,
  email:result.data.email,
  id:result.data.id
})
})
  }




  render(){
  //   destruring users 
    const{users}=this.state
  return (
    <div className="container">
  
  <form onSubmit={(e)=>this.addRec(e,this.state.id)}>
    <div className='form-group'>
{/* taking user input for name field */}
<label><b>Name</b></label>
<input type="text"
 className='form-control' 
 placeholder='enter your name'
 value={this.state.name}
 onChange={(e)=>this.nameChange(e)}/>

{/* taking user input for email field */}
<label><b>email</b></label>
<input type="text"
 className='form-control' 
 placeholder='enter your email'
 value={this.state.email}
 onChange={(e)=>this.emailChange(e)}
 />
  </div>

{/* Adding user post button and coditonal rndring when user click on edit btn then add btn change into update btn */}
<input type="submit" className={this.state.id===0?"btn btn-primary":"btn btn-success"} value={this.state.id===0?"Add":"Update"}/>

   
  </form>
  
  
  <table className='table table-border table-bordered text-center table-striped shadow'>
    <thead>
    <tr>
      <th>User_id</th>
      <th>User_Name</th>
      <th>Email</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>
    </thead>
    <tbody>
      {/*  jo bhi url se data ayega vo yaha show hoga */}
      {users.map(user=>(
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><button onClick={(e)=>this.editRec(e,user.id)} className='btn btn-success' >Edit</button></td>
          <td><button onClick={(e)=>this.delRec(e,user.id)} className='btn btn-danger' >delete</button></td>{/* dlete button */}
        
        </tr>
      ))}
     
    </tbody>
  </table>
 
 
    </div>
  );
  }
}


export default App;
