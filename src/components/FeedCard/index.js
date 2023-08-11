import { IoChatbubble, IoChatbubbleOutline, IoHeartOutline, IoShareOutline } from "react-icons/io5"
import "./styles.scss";

export const FeedCard = ({ image, content, username, avatar, onSwap }) => {
   const actions = [Math.floor(Math.random() * (10 - 1 + 1) + 1), Math.floor(Math.random() * (10 - 1 + 1) + 1)];

   return (
      <div className="feedcard">
         <div className="info">
            <div className="user">
               <div className="avatar" style={{
                  background: `url(${avatar}) no-repeat center center / cover`
               }}></div>
               <span className="name">{ username }</span>
            </div>
            <div className="meta">
               <span className="meta-item"><IoHeartOutline className="icon"/> {actions[0]}</span>
               <span className="meta-item"><IoChatbubbleOutline className="icon"/> {actions[1]}</span>
            </div>
         </div>

         <div className="content">
            <p className="content-p">{content}</p>

            <img src={image}/>
         </div>

         <div className="action">
            <div className="action-item">
               <span className="title"><IoHeartOutline className="icon"/>Like</span>
            </div>
            <div className="action-item">
               <span className="title"><IoChatbubbleOutline className="icon"/>Comments</span>
            </div>
            <div className="action-item" onClick={onSwap}>
               <span className="title"><IoShareOutline className="icon"/> Swap</span>
            </div>
         </div>
      </div>
   )
}