import React, {useState, useEffect} from 'react'
import Loading from '../UI/Loading'
import Video from './Video'

export const SimilarVideoSidebar = ({videoId}) => {
const [videos, setVideos] = useState({ data: [], isLoaded: false })


 const fetchSimilar = () => {
     fetch('api/video/similar?id='+videoId, {method:"Get"})
     .then(response => response.json())
     .then(resData => setVideos({ data: resData, isLoaded: true }))
     .catch(e => alert(e));
 }   

useEffect(() => {
    fetchSimilar()
}, [videoId])

    if(!videos.isLoaded)
    {
        return <p>Loading</p>
    }
    return (
        <div>
         {videos.data.map(x=> {return  <Video  key={x.id} id={x.id} title={x.title} videoName={x.videoName} views={x.views} channelName={x.channelName} uploadedOn={x.uploadDate}/>})}
        </div>
    )
}
