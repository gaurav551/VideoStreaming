import React,{useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';

export default function Video({videoName,uploadedOn,title,id,views,channelName}) {

  const [time, settime] = useState('Loading')
 


function calculateTime()
{
 const videoId = "myVIdeo"+id;
 var vid = document.getElementById(videoId);
 if(vid==null)
 {
   return "Loading";
 }
 return Math.round(vid.duration/24)+" Min";

}
 

useEffect(() => {
  const timeout = setTimeout(() => {
    settime(calculateTime())
  }, 2000);
 
 
}, [])
 

 


  return (
    <div>
    <div className="videoo">
      <div className="vid_thumbainl">
        <Link  to={{
    pathname: '/watch/'+id // , state : {id : id}
  }}>
          <video id={"myVIdeo"+id} width='100%' src={`videos/${videoName}?t=15`} alt=""/>
          <span className="vid-time">{time}</span>
          <span className="watch_later">
            <i className="icon-watch_later_fill"></i>
          </span>
        </Link>	
      </div>
      <div className="video_info">
        <h3><Link  to={{
    pathname: '/watch/'+id , state : {id : id}
  }}>{title}</Link></h3>
        <h4><a href="#" title="">{channelName}</a> <span className="verify_ic"><i className="icon-tick"></i></span></h4>
        <span>{views} views .<small className="posted_dt">{uploadedOn}</small></span>
      </div>
    </div>
  </div>
  )
}