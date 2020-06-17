import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Profile.css';
import { updateUser } from '../../services/users';
import { AuthContext } from '../../contexts/auth';
import { getCommentsByUser } from '../../services/comments';
import Layout from '../../components/Layout/Layout';
import Comment from '../../components/Comment/Comment';

const Profile = () => {
  const { push } = useHistory();
  const {
    currentUser: { username, email, password, _id, posts, comments },
    toggleSignIn,
    currentUser
  } = useContext(AuthContext);
  const [input, setInput] = useState({ username, email, password });
  const [userComments, setUserComments] = useState([]);

  const handleChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await updateUser(_id, input);
    toggleSignIn({ ...input, _id, posts, comments });
    console.log(response);
    push('/');
  };

  const fetchData = async () => {
    console.log(currentUser);
    const response = await getCommentsByUser(_id);
    setUserComments(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className='profile-body'>
        <div className='form-body'>
          <form className='profile-form' onSubmit={handleSubmit}>
            <input
              name='username'
              value={input.username}
              onChange={handleChange}
            />
            <input name='email' value={input.email} onChange={handleChange} />
            <input
              name='password'
              value={input.password}
              onChange={handleChange}
            />
            <button>update</button>
          </form>
        </div>
        <span>
          <h3>Comments</h3>
        </span>
        <div className='profile-comments'>
          {userComments.map((each, idx) => (
            <div key={idx} className='profile-comment'>
              <span>{each.content}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
