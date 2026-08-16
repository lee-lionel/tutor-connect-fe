import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getMyPosts, myDetails } from '../../utilities/api';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { getUser } from '../../utilities/users-service';
import PostCard from '../../components/PostCard/PostCard';
import './Profile.css'

const Profile = () => {
  const id = getUser()._id;
  const [me, setMe] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const role = localStorage.getItem('role');
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        const response = await myDetails(id);
        setMe(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [id]);

  useEffect(() => {
    const retrievePosts = async () => {
      try {
        setLoading(true);
        const response = await getMyPosts(id);
        console.log(response);
        setMyPosts(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    retrievePosts();
  }, [role]);

  async function handleDelete(postId) {
    try {
      const response = await deletePost(postId);
      if (response) {
        setMyPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      alert(error);
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="content-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <ProfileCard profile={me} role={role} />
        {role === 'tutor' ? (
          <div className='profile-actions'>
            <Link to='/edit-profile' className='edit-button'>Edit Info</Link>
          </div>
        ) : role === 'parent' ? (
          <div className='profile-actions'>
            <Link to='/create-post' className='create-button'>Create Post</Link>
          </div>
        ) : null}
      </div>

      <div style={{ display: role === 'parent' ? 'block' : 'none' }}>
        <h1 className='profile-posts-heading'>My Posts</h1>
        {myPosts.length === 0 ? (
          <p className='profile-posts-empty'>You haven't created any posts yet.</p>
        ) : (
          myPosts.map((post) => (
            <div className="post-card" key={post._id}>
              <PostCard post={post} role={role} />
              {/* <input
              type='checkbox'
              checked={post.foundTutor}
              onChange={()=>handleEdit(post._id)}
              /> */}
              <div className='post-actions'>
                <button className='delete-button' onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
