import { IoChatbubble, IoChatbubbleOutline, IoHeartOutline, IoShareOutline } from "react-icons/io5"
import "./styles.scss";

export const FeedCard = () => {
   return (
      <div className="feedcard">
         <div className="info">
            <div className="user">
               <div className="avatar" style={{
                  background: `url(https://coder.poly-bees.com/avatars/a19.png) no-repeat center center / cover`
               }}></div>
               <span className="name"></span>
            </div>
            <div className="meta">
               <span className="meta-item"><IoHeartOutline className="icon"/> 2</span>
               <span className="meta-item"><IoChatbubbleOutline className="icon"/> 2</span>
               <span className="meta-item"><IoHeartOutline className="icon"/> 2</span>
            </div>
         </div>

         <div className="content">
            <p className="content-p">Hello</p>

            <img src="https://bees.lavenes.com/files/photo_gowPIQoCTKau61yqXEqwwcx0w1685793677250.jpg"/>
         </div>

         <div className="action">
            <div className="action-item">
               <span className="title"><IoHeartOutline className="icon"/> Like</span>
            </div>
            <div className="action-item">
               <span className="title"><IoChatbubbleOutline className="icon"/> Comments</span>
            </div>
            <div className="action-item">
               <span className="title"><IoShareOutline className="icon"/> Swap</span>
            </div>
         </div>
      </div>
   )
}