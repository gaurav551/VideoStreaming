import React, { useEffect, useState } from 'react'
import useApiRequest from '../../services/FetchService/useApiRequest'
import Loading from '../UI/Loading'
import Video from './Video'



export const Videos = () => {

const { data, error, isLoaded } = useApiRequest(
            "api/video/videos");

    let content = <Loading name='Loading' />;
    if (isLoaded && data.length !== 0) {
        content = data.map(x=> {return <div className="col-lg-3 col-md-6 col-sm-6 col-6 full_wdth"> <Video  key={x.id} id={x.id} title={x.title} videoName={x.videoName} views={x.views} channelName={x.channelName} uploadedOn={x.uploadDate}/> </div> })
    }

    if (isLoaded && data.length === 0) {
        content = 'NO VIDEOS'
    }
    return (
        <div class="container">
        <div class="vidz_sec">
            <h3>Featured Videos</h3>
            <div class="vidz_list">
                <div class="row">
                    {content}
               </div>
           </div>
           </div>
        </div>
            
    )
}
