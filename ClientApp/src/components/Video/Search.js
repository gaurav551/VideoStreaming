import React, { Fragment, useEffect, useState } from 'react'
import useApiRequest from '../../services/FetchService/useApiRequest'
import Loading from '../UI/Loading'
import Video from './Video'




export const Search = (props) => {
    const [filterVisible, setfilterVisible] = useState(false)
    var styles = {display: filterVisible? 'block':'none'}
    //let location = useLocation();
    var query = props.match.params.id;

    const { data, error, isLoaded } = useApiRequest(
        'api/video/search?query='+query
        );
    document.title = "Search "+ query
    
    let content = <Loading name='Loading' />;
    if (isLoaded && data.length !== 0) {
        content = data.map(x=> {return <div className="col-lg-3 col-md-6 col-sm-6 col-6 full_wdth"> <Video  key={x.id} id={x.id} title={x.title} videoName={x.videoName} views={x.views} channelName={x.channelName} uploadedOn={x.uploadDate}/> </div> })
    }

    if (isLoaded && data.length === 0) {
        content = 'NO VIDEOS'
    }
    return (
        <Fragment>
            <br></br>
        <section class="filter-sec">
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth">
                    <div class="filter">
                        <h3 style={{cursor:'pointer'}} class="fl-head" onClick={()=> setfilterVisible(!filterVisible)}><i class="icon-filter"></i>{!filterVisible? 'Show' : "Hide"} Filter</h3>
                    </div>					
                </div>
                <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth" style={styles} >
                    <div class="filter">
                        <h3 class="fl-head"><i class="icon-calender"></i> Upload Date</h3>
                        <ul class="lnks">
                            <li><a href="#" title="">Last hour</a></li>
                            <li><a href="#" title="">Today</a></li>
                            <li><a href="#" title="">This week</a></li>
                            <li><a href="#" title="">This month</a></li>
                            <li><a href="#" title="">This year</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth" style={styles}>
                    <div class="filter">
                        <h3 class="fl-head"><i class="icon-playlist"></i> Type</h3>
                        <ul class="lnks">
                            <li><a href="#" title="">Video <i class="icon-cancel"></i></a></li>
                            <li><a href="#" title="">Channel</a></li>
                            <li><a href="#" title="">Playlist</a></li>
                            <li><a href="#" title="">Movie</a></li>
                            <li><a href="#" title="">Show</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth" style={styles}>
                    <div class="filter">
                        <h3 class="fl-head"><i class="icon-watch_later"></i> Duration</h3>
                        <ul class="lnks">
                            <li><a href="#" title="">Short ( 4 min)</a></li>
                            <li><a href="#" title="">Long ( 20 min)</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth" style={styles}>
                    <div class="filter">
                        <h3 class="fl-head"><i class="icon-features"></i> Features</h3>
                        <ul class="lnks">
                            <li><a href="#" title="">Live</a></li>
                            <li><a href="#" title="">4K</a></li>
                            <li><a href="#" title="">HD <i class="icon-cancel"></i></a></li>
                            <li><a href="#" title="">360</a></li>
                            <li><a href="#" title="">3D</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-4 col-6 full_wdth" style={styles}>
                    <div class="filter">
                        <h3 class="fl-head"><i class="icon-star"></i> Sort by</h3>
                        <ul class="lnks">
                            <li><a href="#" title="">Relevance </a></li>
                            <li><a href="#" title="">Upload data</a></li>
                            <li><a href="#" title="">View count</a></li>
                            <li><a href="#" title="">Rating</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
       
    </section>
    <h3>{content}</h3>
    </Fragment>
    )
}
