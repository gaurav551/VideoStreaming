import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player'
import { openNotification } from '../../components/UI/Notification';
import moment from 'moment';
import { CommentBox } from './CommentBox';
import Loading from '../UI/Loading';
import { isLoggedIn } from '../../services/IsLoggedIn';
import { authHeader } from '../../services/Authheader';
import { SimilarVideoSidebar } from './SimilarVideoSidebar';





export const Watch = (props) => {
	const [likeStatus, setLikeStatus] = useState({ likes: 0, isLiked: false })
	const [subscribeStatus, setSubscribeStatus] = useState({ subscribers: 0, isSubscribed: false })

	//let  location  = useLocation();
	//From Query String
	let videoId = props.match.params.id//location.state.id
	const [video, setVideos] = useState({ data: {}, isLoaded: false })


	const fetchWatch = () => {
		var url = 'api/video/watch?id=' + videoId
		fetch(url, {
			method: 'GET',
			headers: authHeader()
		})
			.then(res => res.json())
			.then(resData => {
				setVideos({ data: resData, isLoaded: true })
				setLikeStatus({ likes: resData.likes, isLiked: resData.isLiked })
				setSubscribeStatus({subscribers: resData.subscribersCount, isSubscribed: resData.isSubscribed})
			}
			)
			.catch(e => alert(e));
	}
	const likeHanlder = () => {
		if (!isLoggedIn()) {
			openNotification({ type: 'error', message: 'you must be logged in to like', description: "" })

		}
		else {
			fetch('/api/video/like?videoId=' +videoId, {
				method: 'GET',
				headers: authHeader()
			}).then(response => response.json())
				.then(data => {
					openNotification({ type: 'success', message: data.message, description: "" })
					if (likeStatus.isLiked) {
						setLikeStatus({ isLiked: false, likes: likeStatus.likes - 1 })
					}
					else {
						setLikeStatus({ isLiked: true, likes: likeStatus.likes + 1 })
					}

				})
				.catch(err => { alert(err) })


		}
	}
	const subscribeHandler = () => {
		if (!isLoggedIn()) {
			openNotification({ type: 'error', message: 'you must be logged in to subscribe', description: "" })

		}
		setSubscribeStatus({isSubscribed: !subscribeStatus.isSubscribed, subscribers: subscribeStatus.isSubscribed? subscribeStatus.subscribers-1 : subscribeStatus.subscribers+1 })
	}



	useEffect(() => {
		fetchWatch();
		
    }, [videoId])
	let player = ""

	if (video.isLoaded) {

		player = <div className="video-wrapper"><ReactPlayer playing={false} controls={true} width='100%' height='100%' className='react-player' url={`videos/${video.data.video.videoName}`} /> </div>

	}
	if (!video.isLoaded) {
		return <Loading />
	}
	document.title = video.isLoaded && video.data.video.title
	return (

		<section className="mn-sec">

			<div className="container">
				<div className="row">
					<div className="col-lg-9">
						<div className="mn-vid-sc single_video">
							<div className="vid-1">
								<div >
									<br></br>
									{player}
								</div>
								<div className="vid-info">
									<h3>{video.data.video.title}</h3>
									<div className="info-pr">
										<span>{video.data.views} views</span>
										<ul className="pr_links">
											<li>
												<button onClick={likeHanlder} data-toggle="tooltip" data-placement="top" title="I like this">
													<i className={likeStatus.isLiked ? 'icon-thumbs_up_fill icon-active' : 'icon-thumbs_up_fill'}></i>
												</button>
												<span>{likeStatus.likes} </span>
											</li>

										</ul>
										<div className="clearfix"></div>
									</div>
								</div>
							</div>
							<div className="abt-mk">
								<div className="info-pr-sec">
									<div className="vcp_inf cr">
										<div className="vc_hd">
											<img src="assets/images/user.png" alt="" />
										</div>
										<div className="vc_info pr">
											<h4><a href="#" title="">{video.data.channelName}</a></h4>
											<span>Published on {moment(video.data.video.uploadedOn).format('DD-MMM-YYYY')}</span>
										</div>
									</div>
									<ul className="chan_cantrz">

										<li>
											<a onClick={subscribeHandler} title="subscribe this channel" className="subscribe">{subscribeStatus.isSubscribed? "✔ Subscribed" : "Subscribe"}  <strong>{subscribeStatus.subscribers}</strong></a>
										</li>
									</ul>
									<ul className="df-list">
										<li>
											<button data-toggle="tooltip" data-placement="top" title="Add to playlist">
												<i className="icon-add_to_playlist"></i>
											</button>
										</li>
										<li>
											<button data-toggle="tooltip" data-placement="top" title="Favorite">
												<i className="icon-like"></i>
											</button>
										</li>
										<li>
											<button data-toggle="tooltip" data-placement="top" title="Watch Later">
												<i className="icon-watch_later"></i>
											</button>
										</li>
										<li>
											<button data-toggle="tooltip" data-placement="top" title="Share">
												<i className="icon-share"></i>
											</button>
										</li>
										<li>
											<button data-toggle="tooltip" data-placement="top" title="Report Video">
												<i className="icon-flag"></i>
											</button>
										</li>
									</ul>
									<div className="clearfix"></div>
								</div>
								<div className="clearfix"></div>
								<div className="about-ch-sec">

									<div className="abt-rw">
										<h4>Category : </h4>
										<ul>
											{video.data.video.categories!=null && video.data.video.categories.split(',').map(x=> {return <li>
											<span key={x}>{x}</span></li>
											 })}
											
											
										</ul>
									</div>
									<div className="abt-rw">
										<h4>About : </h4>
										<p> {video.data.video.description} </p>
									</div>
									<div className="abt-rw tgs">
										<h4>Tags : </h4>
										<ul>
											{video.data.video.tags.split(',').map(x => {
												return <li key={x}>
													#{x}
												</li>
											})}
										</ul>
									</div>
								</div>
							</div>
							<CommentBox videoId={videoId} />
						</div>
					</div>
					<div className="col-lg-3">
						<div className="sidebar">
							<div className="vidz-prt">
								<h2 className="sm-vidz">Similar Videos</h2>
								<h3 className="aut-vid">
									<span>Autoplay </span>
									<label className="switch">
										<input type="checkbox" />
										<b className="slider round"></b>
									</label>
								</h3>
								<div className="clearfix"></div>
							</div>
							<div className="videoo-list-ab">
								<SimilarVideoSidebar videoId={videoId}/>
								

							</div>
						</div>
					</div>
				</div>
			</div>

		</section>

	)
}
