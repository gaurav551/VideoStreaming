import React, { Fragment, useRef, useState, useCallback } from 'react';
import Loading from '../../../components/UI/Loading';
import { openNotification } from '../../../components/UI/Notification';
import { Progress } from 'antd';
import { QuickGuide } from '../../../components/UI/QuickQuide';
import { useHistory } from 'react-router-dom'
import { getLoggedInUserToken } from '../../../services/getLoggedInUserToken';
import { VideoUploadForm } from './VideoUploadForm';
import firebase from '../../../firebase'
import { authHeader } from '../../../services/Authheader';


export const VideoUpload = () => {
  const history = useHistory();
  const routeToPage = useCallback(() => history.push('/my-videos'), [history]);

  const [submiting, setsubmiting] = useState(false)
  const [progress, setProgress] = useState( 0 );
  const [downloadUrl, setdownloadUrl] = useState("")


  const submitForm = (file, desc, title, tags, categories) => {
    setsubmiting(true);
    
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child('folder/' + file.name).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        var progressFinal = progress.toPrecision(4);

        console.log("Progress Final " + progressFinal);
        setProgress(progressFinal)
      }, (error) => {
        alert(error)
        throw error
      }, () => {
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        //Save to Databse
        var data = JSON.stringify({ title: title, description: desc, videoName: url, tags: tags, categories: categories.join() });
        var myHeaders = new Headers();
       
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+ getLoggedInUserToken())
        const res =  fetch('api/video/',{
          method: "POST",
          body: data,
          headers: myHeaders
        }).then(async response => {
          const data = await response.json()
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          console.log('success');
          openNotification({type:'success',message:data.message,description:""}) 
          routeToPage()  
        })
        .catch(error => {
             
         alert('There was an error!', error);
      }).finally(x=> {});

      setsubmiting(false);
      setProgress(0)
     


         
        
        })

       
       

      }
    )
  }

  //         var formdata = new FormData();
  //         formdata.append("videoFile", file);


  // let request = new XMLHttpRequest();
  // request.open('POST', `/api/video?title=${title}&tags=${tags}&description=${desc}&categories=${categories}`); 
  // //jtw

  // request.setRequestHeader("Authorization",'Bearer '+getLoggedInUserToken());

  // // upload progress event
  // request.upload.addEventListener('progress', function(e) {
  // 	// upload progress as percentage
  // 	let percent_completed = Math.round((e.loaded / e.total)*100);
  //   setProgress(percent_completed);
  // });

  // // request finished event
  // request.addEventListener('load', function(e) {
  // 	// HTTP status message (200, 404 etc)
  // // send POST request to server
  //   if (request.status === 200) {
  //    openNotification({type:'success',message: JSON.parse(request.response).message  ,description:""})
  //    routeToPage() 

  //   }  
  //    else {
  //       openNotification({type:'error',message:request.responseText,description:""})   
  //         }
  //   setsubmiting(false)
  // });
  // request.send(formdata);




  return (
    <Fragment>
      {submiting && <Loading name="Uploading" />}

      <br></br>
      <div className='row'> 
        <div className='col-sm-9'>
          <div className='card'>
            <div className='card-body'>


              <VideoUploadForm onSubmit={submitForm} submiting={submiting} progress={progress} />
              {progress !== 0 &&
                <Progress percent={progress} size="small" status="active" />
              }
            </div>
          </div>
        </div>
        <div className='col-sm-3'>
          <QuickGuide />


        </div>
      </div>
    </Fragment>
  )
}
