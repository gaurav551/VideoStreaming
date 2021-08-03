import React from 'react'
import { WatchShare } from '../components/Layout/WatchShare'
import { Search } from '../components/Search'
import { Videos } from '../components/Video/Videos'

export const Home = () => {

 
  return (
    <div>
   
     <WatchShare/>
     <section class="vds-main">
			<div class="vidz-row">
     
        <Videos/>
        </div>
        </section>
     <br></br>
     <br></br><br></br><br></br>
    </div>
  )
}
