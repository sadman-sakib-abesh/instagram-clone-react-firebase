import React,{useState,useEffect} from 'react';
import Post from './Post'
import './App.css';
import {db,auth} from './firebase'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles';
import ImageUploder from './ImageUploder';
import InstagramEmbed from 'react-instagram-embed'
import { Avatar } from '@material-ui/core';
import { SpeakerNotesOff } from '@material-ui/icons';

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };

}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const [card,setCard]=useState(false)
  const[posts,setPosts]=useState([])
  const [open, setOpen] = useState(false);
  const [opensign,setOpensign]=useState(false)
  const [openpost,setOpenpost]=useState(false)
const [username,setUsername]=useState('')
const [password,setPassword]=useState('')
const [email,setEmail]=useState('')
const [user,setUser]=useState(null)
const [alluser,setAlluser]=useState([])
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);



useEffect(()=>{
db.collection('posts').onSnapshot(res=>{

  setPosts(res.docs.map(doc=>({
    id:doc.id,
    post:doc.data()
  })))

})
},posts)


useEffect(()=>{
  db.collection('users').onSnapshot(res=>{

    setAlluser(res.docs.map(doc=>({
      id:doc.id,
      users:doc.data()
    })))

  })
},[])



useEffect(()=>{
 const unsubscribe=auth.onAuthStateChanged((authUser)=>{
  if(authUser){

    setUser(authUser)
if(authUser.displayName){
  console.log(authUser.displayName)
}else{

 
 return authUser.updateProfile({
    displayName:username
  })
}
    
    //user logged in
  }else{
    setUser(null)
    //user logged out
  }
})


return ()=>{
  unsubscribe()
}

},[user,username])



const signUp=(event)=>{
  setOpen(false)
auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
  

  db.collection("users").add({
    name:username,
    uid:authUser.uid
      })
  

  alert('signup successful')
  
}).catch(error=> alert(error))


}


const login=(event)=>{
  setOpensign(false)
  
  auth.signInWithEmailAndPassword(email,password).then(res=>alert('logged in')).catch(error=>{
    alert(error)
  })
  
}






  return (
    <div className="App">

<Modal
        open={card}
        onClose={()=>setCard(false)}
        >
         
 <div style={modalStyle} className={classes.paper}>
   <center>
   <div className='first_paper'>
   <Button type='submit' onClick={()=>setOpenpost(true)} className='sign_up'>post</Button>
<Button type='submit' onClick={()=>{auth.signOut();setCard(false)}} className='sign_up'>LOG OUT</Button>

</div>
</center>
</div>

</Modal>





<Modal
        open={openpost}
        onClose={()=>setOpenpost(false)}
        >
          
 <div style={modalStyle} className={classes.paper}>
   
      
   {user?<ImageUploder userName={user.displayName}/>:(<h3>you need to login first</h3>)}
</div></Modal>
      
  



 <Modal
        open={open}
        onClose={()=>setOpen(false)}
        >
          
 <div style={modalStyle} className={classes.paper}>
   <center>
     <div className='app_signup'>
    <center><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' 
alt='instagram_logo'
 className='form_image' /></center><br/>
 <Input type='text' placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
 <Input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
 <Input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
<Button type='submit' onClick={(e)=>signUp()}>SIGN UP</Button>

     </div>


</center>
</div>



        </Modal>

        <Modal
        open={opensign}
        onClose={()=>setOpensign(false)}
        >
          
 <div style={modalStyle} className={classes.paper}>
   <center>
 <div className='app_signup'>
    <center><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' 
alt='instagram_logo' className='form_image' /></center><br/>
<Input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
 <Input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
<Button type='submit' onClick={()=>login()}>LOG IN</Button>

     </div>


</center>
</div>



        </Modal>
   
      <div id='header_app' className='header_app'>
<img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' 
alt='instagram_logo'
 className='header_image' />
 
{user?<span className='sign_up_2'> <i id='avatar-head' class="fa fa-home"></i>
<i id='avatar-head' class="fa fa-paper-plane-o"></i>   
<i id='avatar-head' class="fa fa-compass"></i>  
 <i id='avatar-head' class='fa fa-heart-o'></i>    
        <Avatar onClick={()=>setCard(true)} alt={user.displayName}
                 src="/static/images/avatar/1.jpg" 
                 className='nav_avatar' style={{ height: '25px', width: '25px',fontSize:'10px'}} /></span>:<span className='log_container'>
<span className='sign_up_2'>
  <Button type='submit' onClick={()=>setOpen(true)} className='sign_up'>SIGN UP</Button>&nbsp;&nbsp;
  <Button type='submit' onClick={()=>setOpensign(true)} className='sign_up'>LOG IN</Button>
</span>



</span>}
</div>
<div id='feed'>
      <div className='post_container'>
    
     {posts.map(({id,post})=><>
     
     <Post
     id={id}
     key={id}
     like={post.like}
     user={user?(user.displayName):(false)}
     comments={post.comments}
     userName={post.userName}
     image={post.image}
     Caption={post.Caption}
     />
     </>)}
</div>
{user?<div className='side'>
<b>Suggestions For You</b><br/><br/>
{alluser.map(({users})=><div>{users.name===user.displayName?<></>:<div className='suggestion'>
  <Avatar alt={users.name}
              style={{ height: '35px', width: '35px',fontSize:'18px'}}
                 src="/static/images/avatar/1.jpg" 
                 className='post_avatar' /><h5>{users.name}</h5>



</div>}</div>)
}




</div>:<></>}
</div>
      
    </div>
  );
}

export default App;
