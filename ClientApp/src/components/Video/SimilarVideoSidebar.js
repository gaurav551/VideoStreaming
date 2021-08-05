import React, {useState, useEffect} from 'react'
import useApiRequest from '../../services/FetchService/useApiRequest'
import Loading from '../UI/Loading'
import Video from './Video'


export const SimilarVideoSidebar = ({videoId}) => {
const { data, error, isLoaded } = useApiRequest(
    'api/video/similar?id='+videoId);



    if(!isLoaded)
    {
        return <p>Loading</p>
    }
    return (
        <div>
         {data.map(x=> {return  <Video  key={x.id} id={x.id} title={x.title} videoName={x.videoName} views={x.views} channelName={x.channelName} uploadedOn={x.uploadDate}/>})}
        </div>
    )
}
