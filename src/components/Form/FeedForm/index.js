import { IoImage, IoInformation, IoSend } from "react-icons/io5";
import "./styles.scss";

export const FeedForm = ({ image, onClickMedia, onSend, onChangeText }) => {
   return (
      <div className="feedform">
         <span className="title">
            <IoInformation className="icon"/>
            Content
         </span>

         <textarea onChange={e => onChangeText(e.target.value)} placeholder="Write your content here..."></textarea>

         {
            image && <img src={image}/>
         }

         <div className="action">
            <div className="image-btn" onClick={onClickMedia}>
               <label>Add media / NFT <IoImage className="icon"/></label>
            </div>

            <button onClick={onSend}>Send <IoSend className="icon"/></button>
         </div>
      </div>
   )
}