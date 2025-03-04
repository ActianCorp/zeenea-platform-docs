  // Formpage\index.js
  import { useLocation } from "react-router-dom";
  
  const React = require("react");
  const { useState } = React;

  export default function Form() {
    const location = useLocation()
    const [formData, setFormData] = useState({ message: "" });
    const [isOpen, setIsOpen] = useState(false);  
    const handleChange = (e) => {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const toggle = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
   return (
      <span>
        <a onClick={toggle} href="#" className="navbar__link">
            <span className='pageFeedback'>&nbsp;&nbsp;Page&nbsp;Feedback</span>
        </a>
        {isOpen ? ( 
          <form data-netlify="true" name="feedback" method="post">
            <input type="hidden" name="form-name" value="feedback" />        
            <div>
              <div className="feedbackDiv">
                <label className="formLabel">Your feedback helps us improve our docs!</label><br />
                <textarea type="text" name="message" required minLength="10" id="message" rows="6" placeholder="Comments, questions, good, bad - please let us know." value={formData.message} onChange={handleChange} />
                <input type="hidden" name="pageURL" value={location.pathname}/>
                <input type="submit" className="submit" value={"Send Feedback"}/>
              </div>
            </div>
            </form>) : ( "" )
    }
    </span>
  )}