import React,{useRef, useState, useEffect} from 'react'
import { authHeader } from '../../services/Authheader'
import { isLoggedIn } from '../../services/IsLoggedIn'
import { openNotification } from '../UI/Notification'


export const CommentBox = ({videoId}) => {
    const commentText = useRef('')
    const submitHandler = (e)=>
    {
        e.preventDefault()
        var value = commentText.current.value; 
        if(value.length<3)
        {
            return;
        }
    
        if (!isLoggedIn()) {
			openNotification({ type: 'error', message: 'you must be logged in to comment', description: "" })
            return;

		}
     
      
        fetch('/api/video/comment?text='+value+'&videoId='+videoId, {method:'POST', headers : authHeader()}).then(response=> response.json())
        .then(data=> {
         var newData = [{
            firstName: data.firstName,
            lastName : data.lastName,
            commentDate : data.commentDate,
            commentText : data.commentText}].concat(commentsData)
      
        setCommentsData(newData)
        commentText.current.value = '';

        
        })
        .catch(ex => {alert(ex)})
    }

    const fetchComments = ()=>{
        fetch('api/video/comments?videoId='+videoId, {method:"GET"}).then(respone=> respone.json())
        .then(data=> {setCommentsData(data)})
    }
   
    const [commentsData, setCommentsData] = useState([])

    useEffect(() => {
        //Fetch on first load
        fetchComments()
       
        const interval = setInterval(() => {
            //fetch every one minutes
    
            fetchComments();
      

        },120000)
        return () => clearInterval(interval);
        
       
    }, [videoId])
    return (
        <div className="cmt-bx">
            <ul className="cmt-pr">
                <li><span>{commentsData.length}</span> Comments</li>
                <li>
                    <span><i className="icon-sort_by"></i><a  title="">Sort By</a></span>
                </li>
            </ul>
            <div className="clearfix"></div>
            <div className="clearfix"></div>
            <div className="vcp_inf pc">
                <div className="vc_hd">
                    <img src="assets/images/user.png" alt="" />
                </div>
                <form onSubmit={submitHandler}>
                    <input ref={commentText} type="text" placeholder="Add a public comment" />
                    <button type="submit">Comment</button>
                </form>
                <div className="clearfix"></div>
                <div className="rt-cmt">
                    
                        <i onClick={()=>commentText.current.value=''} className="icon-cancel"></i>
                    
                    <div className="clearfix"></div>
                </div>
            </div>
            <ul className="cmn-lst">
                 {commentsData.map(x=> {return <li  key={x.commentId}>
                  <div className="vcp_inf">
                      <div className="vc_hd">
                          <img src="assets/images/user.png" alt="" />
                      </div>
                      <div className="coments">
                          <h2>{x.firstName +' '+ x.lastName} <small className="posted_dt"> {x.commentDate}</small></h2>
                          <p>{x.commentText} </p>
                          {/* <ul className="cmn-i">
                              <li>
                                  <a href="#" title="">
                                      <i className="icon-thumbs_up icon-active"></i>
                                  </a>
                                  <span>61</span>
                              </li>
                            
                          </ul> */}
                       
                      </div>
                  </div>
              </li>
                
                })}
               

               
            </ul>
        </div>
    )
}
