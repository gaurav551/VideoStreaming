import React, {  } from 'react'
import { SearchForm } from './SearchForm'

export const SideMenu = (props) => {

  
	
	
	
    return (
        <div className={props.class} style={{top:'82px'}}>
			<div className="form_dvv">
				<div className='search-form'>
					
				<SearchForm onToggle={props.onToggle}/>
				
				</div>
			</div>
			<div className="sd_menu">
				<ul className="mm_menu">
					<li>
						<span>
							<i className="icon-home"></i>
						</span>
						<a onClick={()=> alert('HEYY')}  title="">Home</a>
					</li>
					<li>
						<span>
							<i className="icon-fire"></i>
						</span>
						<a  title="">Trending</a>
					</li>
					<li>
						<span>
							<i className="icon-subscriptions"></i>
						</span>
						<a  title="">Subscriptions</a>
					</li>
				</ul>
			</div>
			<div className="sd_menu">
				<h3>Library</h3>
				<ul className="mm_menu">
					<li>
						<span>
							<i className="icon-history"></i>
						</span>
						<a  title="">History</a>
					</li>
					<li>
						<span>
							<i className="icon-watch_later"></i>
						</span>
						<a href="#" title="">Watch Later</a>
					</li>
					<li>
						<span>
							<i className="icon-purchased"></i>
						</span>
						<a href="#" title="">Purchases</a>
					</li>
					<li>
						<span>
							<i className="icon-like"></i>
						</span>
						<a href="#" title="">Liked Videos</a>
					</li>
					<li>
						<span>
							<i className="icon-play_list"></i>
						</span>
						<a href="#" title="">Playlist</a>
					</li>
				</ul>
			</div>
			<div className="sd_menu subs_lst">
				<h3>Subscriptions</h3>
				<ul className="mm_menu">
					<li>
						<span className="usr_name">
							<img src="images/resources/th1.png" alt=""/>
						</span>
						<a href="#" title="">Dr Disrespect</a>
						<small>3</small>
					</li>
					<li>
						<span className="usr_name">
							<img src="images/resources/th2.png" alt=""/>
						</span>
						<a href="#" title="">ASMR</a>
						<small>6</small>
					</li>
					<li>
						<span className="usr_name">
							<img src="images/resources/th3.png" alt=""/>
						</span>
						<a href="#" title="">Rivvrs</a>
						<small>2</small>
					</li>
					<li>
						<span className="usr_name">
							<img src="images/resources/th4.png" alt=""/>
						</span>
						<a href="#" title="">The Verge</a>
						<small>11</small>
					</li>
					<li>
						<span className="usr_name">
							<img src="images/resources/th5.png" alt=""/>
						</span>
						<a href="#" title="">Seeker</a>
						<small>3</small>
					</li>
					<li>
						<span className="usr_name">
							<img src="images/resources/sn.png" alt=""/>
						</span>
						<a href="#" title="">Music</a>
						<small>20</small>
					</li>
				</ul>
				<a href="#" title="" className="more-ch"><i className="icon-arrow_below"></i> Show 14 more</a>
			</div>
			<div className="sd_menu">
				<ul className="mm_menu">
					<li>
						<span>
							<i className="icon-settings"></i>
						</span>
						<a href="#" title="">Settings</a>
					</li>
					<li>
						<span>
							<i className="icon-flag"></i>
						</span>
						<a href="#" title="">Report history</a>
					</li>
					<li>
						<span>
							<i className="icon-logout"></i>
						</span>
						<a href="#" title="">Sign out</a>
					</li>
				</ul>
			</div>
			<div className="sd_menu m_linkz">
				<ul className="mm_menu">
					<li><a href="#">About</a></li>
					<li><a href="#">Community Rules </a></li>
					<li><a href="#">Privacy</a></li>
					<li><a href="#">Terms</a></li>
					<li><a href="#">Blogs</a></li>
					<li><a href="#">Contracts </a></li>
					<li><a href="#">Donate</a></li>
					<li><a href="#">FAQ</a></li>
				</ul>
				<span>azyrusthemes</span>
			</div>
			<div className="sd_menu bb-0">
				<ul className="social_links">
					<li>
						<a href="#" title="">
							<i className="icon-facebook-official"></i>
						</a>
					</li>
					<li>
						<a href="#" title="">
							<i className="icon-twitter"></i>
						</a>
					</li>
					<li>
						<a href="#" title="">
							<i className="icon-instagram"></i>
						</a>
					</li>
				</ul>
			</div>
			<div className="dd_menu"></div>
		</div>

    )
}
