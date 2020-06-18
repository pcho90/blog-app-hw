import React, { useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';

import './Homepage.css';
import { AuthContext } from '../../contexts/auth';
import { getPosts } from '../../services/posts';
import { signInUser } from '../../services/users';
import Layout from '../../components/Layout/Layout';
import Post from '../../components/Post/Post';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleSignIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPosts();
      setPosts(response);
      setLoading(false);

      const token = JSON.parse(localStorage.getItem('jwt-token'));

      if (token) {
        const user = await signInUser(null, token);
        toggleSignIn(user);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className='homepage'>
        {loading && (
          <Loader
            type='Hearts'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={20000}
          />
        )}
        {posts.map((post, idx) => (
          <Post key={idx} {...post} />
        ))}
      </div>
    </Layout>
  );
};

export default Homepage;
