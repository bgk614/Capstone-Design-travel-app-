// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import "../../styles/PageStyle/Writepagestyle.css"


// function ContactForm() {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Submitting:', title, content);
//         alert(`Submitted:\nTitle: ${title}\nContent: ${content}`);
//     };

//     return (
//         <div className="contact-form-container">
//             <h1>Contact Us</h1>
//             <form onSubmit={handleSubmit} className="contact-form">
//                 <div>
//                     <label htmlFor="title" className="form-label">Title:</label>
//                     <input
//                         type="text"
//                         id="title"
//                         className="form-input"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="content" className="form-label">Message:</label>
//                     <textarea
//                         id="content"
//                         className="form-textarea"
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="submit-button">Send Message</button>
//             </form>
//         </div>
//     );
// }

// export default ContactForm;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/PageStyle/Writepagestyle.css"

function CreateFAQ() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;

    console.log('Submitting:', title, content);
    alert(`Submitted:\nTitle: ${title}\nContent: ${content}`);

    // 폼 제출 후 원하는 페이지로 리디렉션
    navigate('/FAQPage');  // '/some-page'로 변경하세요

    // 폼 제출 후 입력 필드 초기화
    event.target.reset();
  };

  return (
    <div className="post-form-container">
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Post</button>
      </form>
    </div>
  );
}

export default PostForm;
