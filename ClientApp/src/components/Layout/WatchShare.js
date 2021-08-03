import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../services/IsLoggedIn'

export const WatchShare = () => {
    return (
        <Fragment>
            {!isLoggedIn() && 
                    <section className="banner-section">
			<div className="container">
				<div className="banner-text">
					<h2>Watch share and upload with friends</h2>
					<Link to='/register' title="">Create my account</Link>
				</div>
				<h3 className="headline">Video of the Day by <a href="#" title="">newfox media</a></h3>
			</div>
		</section>
            }
        </Fragment>
    )
}
