import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getMyPosts, myDetails, updatePostStatus } from '../../utilities/api';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { getUser } from '../../utilities/users-service';
import PostCard from '../../components/PostCard/PostCard';
import './Profile.css'

const Profile = () => {
  // getUser() returns null once the token expires, so nothing here may
  // dereference it directly.
  const user = getUser();
  const id = user ? user._id : null;
  const role = user ? user.role : null;

  const [me, setMe] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (!id) return;
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
    if (!id || role !== 'parent') return;
    const retrievePosts = async () => {
      try {
        setLoading(true);
        const response = await getMyPosts(id);
        setMyPosts(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    retrievePosts();
  }, [id, role]);

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

  async function handleToggleFound(postId, foundTutor) {
    try {
      const updated = await updatePostStatus(postId, foundTutor);
      setMyPosts(prevPosts => prevPosts.map(post => (post._id === postId ? updated : post)));
    } catch (error) {
      alert(error);
    }
  }

  if (!user) {
    return null; // App renders the sign-in page when there is no user
  }

  if (loading) {
    return <div className="content-container"><p className="loading">Loading...</p></div>;
  }

  if (error) {
    return <div className="content-container"><p className="loading">Error: {error.message}</p></div>;
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

      {role === 'parent' && (
        <div>
          <h1 className='profile-posts-heading'>My Posts</h1>
          {myPosts.length === 0 ? (
            <p className='profile-posts-empty'>You haven't created any posts yet.</p>
          ) : (
            myPosts.map((post) => (
              <div className="post-card" key={post._id}>
                <PostCard post={post} role={role} />
                <div className='post-actions'>
                  <label className='found-tutor'>
                    <input
                      type='checkbox'
                      checked={Boolean(post.foundTutor)}
                      onChange={(e) => handleToggleFound(post._id, e.target.checked)}
                    />
                    Tutor found
                  </label>
                  <button className='delete-button' onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
