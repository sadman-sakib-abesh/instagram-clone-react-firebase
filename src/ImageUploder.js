import { db,storage } from './firebase';

import React, { useEffect,useState } from 'react';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import firebase from 'firebase';

const ImageUploder =({userName}) =>{
    const [image,setImage]=useState('')
    const [progress,setProgress]=useState('')
    const [caption,setCaption]=useState('')


const handleUpload=()=>{
const uploadTask=storage.ref(`images/${image.name}`).put(image)
uploadTask.on('state_changed',(snapshot)=>{

    const progress=Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100

    setProgress(progress)
},(error)=>{
alert(error)
    console.log(error)
},()=>{

    storage.ref("images").child(`${image.name}`).getDownloadURL().then(url=>{

        db.collection("posts").add({

 timestamp:firebase.database.ServerValue.TIMESTAMP,
 Caption:caption,
 image:url,
 userName:userName,
 like:[],
 comments:[]
        })
setCaption('')
setImage(null)
setProgress(0)


    })

}

)

}



const handleChange=(e)=>{
if(e.target.files[0]){
    setImage(e.target.files[0])
}
}





        return (
            <div className='file_upload'>

<center>
<progress className='progress' value={progress} max='100'/>
<br/>
<Input type='text' className='input' placeholder='inter a caption' value={caption} onChange={(e)=>setCaption(e.target.value)}/><br/><br/><br/>
<input type='file' onChange={handleChange}/><br/><br/><br/>
<Button onClick={handleUpload}>upload</Button>
</center>

            </div>
        );
    
}

export default ImageUploder;