import React, { useEffect, useState } from 'react'
import Loading from '../UI/Loading'
import Video from './Video'


export const Videos = () => {
    const [videos, setVideos] = useState({ data: [], isLoaded: false })


    const fetchVideos = () => {
        var url = 'api/video/videos'
        fetch(url, { method: 'GET'}).then(res => res.json())
            .then(resData => setVideos({ data: resData, isLoaded: true }))
            .catch(e => alert(e));
    }


    useEffect(() => {
        fetchVideos();
      
    }, [])
    

    let content = <Loading name='Loading' />;
    if (videos.isLoaded && videos.data.length !== 0) {
        content = videos.data.map(x=> {return <div className="col-lg-3 col-md-6 col-sm-6 col-6 full_wdth"> <Video  key={x.id} id={x.id} title={x.title} videoName={x.videoName} views={x.views} channelName={x.channelName} uploadedOn={x.uploadDate}/> </div> })
    }

    if (videos.isLoaded && videos.data.length === 0) {
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
