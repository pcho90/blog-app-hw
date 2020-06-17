import React, { useState, useContext } from 'react';

import './Comment.css';
import { AuthContext } from '../../contexts/auth';
import { updateComment } from '../../services/comments';

const Comment = ({
  content,
  author,
  createdAt,
  _id,
  user,
  post,
  fetchData
}) => {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(content);
  const { currentUser } = useContext(AuthContext);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    console.log(_id);
    await updateComment(_id, { content: input, author, user, post });
    await fetchData();
    setEditMode(false);
  };

  let mode;
  if (!editMode) {
    mode = (
      <div className='content'>
        <div className='content-main'>{content}</div>
        <div className='content-subtitle'>
          <span className='comment-author'>{author}</span>
          <span>{createdAt}</span>
        </div>
        {currentUser && currentUser.username === author && (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
      </div>
    );
  } else {
    mode = (
      <form onSubmit={handleSubmit}>
        <div className='content'>
          <input
            className='content-input'
            value={input}
            onChange={handleChange}
          />
          <div className='content-subtitle'>
            <span className='comment-author'>{author}</span>
            <span>{createdAt}</span>
          </div>
          <button>Save</button>
        </div>
      </form>
    );
  }

  return mode;
};

export default Comment;
