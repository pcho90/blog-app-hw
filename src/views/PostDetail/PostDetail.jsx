import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './PostDetail.css';

import { getPost } from '../../services/posts';
import { AuthContext } from '../../contexts/auth';
import { createComment, getComments } from '../../services/comments';
import Layout from '../../components/Layout/Layout';
import Comment from '../../components/Comment/Comment';

const PostDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const { push } = useHistory();
  const [input, setInput] = useState('');
  const [replies, setReplies] = useState([]);
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    createdAt: '',
    comments: []
  });

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const { username, _id } = currentUser;

    await createComment({
      content: input,
      author: username,
      user: _id,
      post: id
    });

    const response = await getComments(id);
    setReplies(response);

    setInput('');
  };

  const fetchData = async () => {
    const response = await getPost(id);
    const commentResponse = await getComments(id);
    setPost(response);
    setReplies(commentResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { title, content, author, createdAt: time, comments } = post;

  return (
    <Layout>
      {post && (
        <div className='post-detail-page'>
          <div className='post-details'>
            <div className='original-post'>
              <span className='original-title'>{title}</span>
              <div className='original-subtitle'>
                <span className='original-author'>{author}</span>
                <span>{time}</span>
              </div>
              <span className='original-content'>{content}</span>
              {currentUser && currentUser.username === post.author && (
                <button
                  className='original-button'
                  onClick={() => push(`/posts/${id}/edit`)}
                >
                  Edit
                </button>
              )}
            </div>
            <div className='comments'>
              {replies.map((each, idx) => (
                <Comment key={idx} fetchData={fetchData} {...each} />
              ))}
            </div>
          </div>
          {currentUser && (
            <form className='comment-form' onSubmit={handleSubmit}>
              <textarea
                className='comment-textarea'
                rows='10'
                onChange={handleChange}
                value={input}
              />
              <button>Submit</button>
            </form>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PostDetail;
