import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import './Post.css';

const Post = ({ title, user, content, createdAt, _id, author }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='post-body'>
      <span className='post-title'>
        <Link to={`/posts/${_id}`}>
          <h3>{title}</h3>
        </Link>
      </span>
      <div className='post-subtitle'>
        <div className='post-author'>{author}</div>
        <span className='post-time'>{createdAt}</span>
      </div>
      <div className='post-content'>{content}</div>
    </div>
  );
};

export default Post;
