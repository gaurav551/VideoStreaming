import React, { Fragment,useRef, useState,useCallback } from 'react';
import Loading from '../../../components/UI/Loading';
import { openNotification } from '../../../components/UI/Notification';
import { Progress } from 'antd';
import { QuickGuide } from '../../../components/UI/QuickQuide';
import { useHistory } from 'react-router-dom'
import { getLoggedInUserToken } from '../../../services/getLoggedInUserToken';
import { VideoUploadForm } from './VideoUploadForm';


export const VideoUpload = () => {
  const history = useHistory();
  const routeToPage = useCallback(() => history.push('/my-videos'), [history]);
   
  const [submiting, setsubmiting] = useState(false)
  const [progress, setProgress] = useState(0);

      
      const submitForm = (file,desc,title,tags,categories)=>{
        setsubmiting(true);
        var formdata = new FormData();
        formdata.append("videoFile", file);
      

let request = new XMLHttpRequest();
request.open('POST', `/api/video?title=${title}&tags=${tags}&description=${desc}&categories=${categories}`); 
//jtw

request.setRequestHeader("Authorization",'Bearer '+getLoggedInUserToken());

// upload progress event
request.upload.addEventListener('progress', function(e) {
	// upload progress as percentage
	let percent_completed = Math.round((e.loaded / e.total)*100);
  setProgress(percent_completed);
});

// request finished event
request.addEventListener('load', function(e) {
	// HTTP status message (200, 404 etc)
// send POST request to server
  if (request.status === 200) {
   openNotification({type:'success',message: JSON.parse(request.response).message  ,description:""})
   routeToPage() 

  }  
   else {
      openNotification({type:'error',message:request.responseText,description:""})   
        }
  setsubmiting(false)
});
request.send(formdata);



     }
        return (
        <Fragment>
        {submiting &&  <Loading  name="Uploading"/>}
        
        <br></br>
        <div className='row'>
        <div className='col-sm-9'>
      <div className='card'>
        <div className='card-body'>
        
  
          <VideoUploadForm onSubmit={submitForm} submiting={submiting} progress={progress}/>
          {progress!==0 &&
          <Progress percent={progress} size="small" status="active" />
          }
        </div>
      </div>
      </div>
      <div className='col-sm-3'>
        <QuickGuide/>

         
        </div>
        </div>
      </Fragment>
    )
}
