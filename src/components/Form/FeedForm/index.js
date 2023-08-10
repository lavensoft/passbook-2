import { IoImage, IoInformation, IoSend } from "react-icons/io5";
import "./styles.scss";

export const FeedForm = () => {
   return (
      <div className="feedform">
         <span className="title">
            <IoInformation className="icon"/>
            Content
         </span>

         <textarea placeholder="Write your content here..."></textarea>

         <div className="action">
            <div className="image-btn">
               <label>Add media / NFT <IoImage className="icon"/></label>
            </div>

            <button>Send <IoSend className="icon"/></button>
         </div>
      </div>
   )
}