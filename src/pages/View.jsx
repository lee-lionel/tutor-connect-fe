import React, { useState, useEffect, useCallback } from 'react';
import SearchPage from '../components/SearchPage/SearchPage';
import { listPosts, listTutors } from '../utilities/api';
import { getRole } from '../utilities/users-service';

const View = () => {
  const [showClient, setShowClient] = useState([]);
  const [error, setError] = useState(null);
  // Read from the signed token rather than localStorage.
  const role = getRole();

  // useCallback keeps a stable reference so it can be both an effect
  // dependency and the refresh handler passed to SearchPage.
  const getArray = useCallback(async () => {
    try {
      if (role === 'tutor') {
        const response = await listPosts();
        if (response) setShowClient(response);
      } else if (role === 'parent') {
        const response = await listTutors();
        if (response) setShowClient(response);
      }
    } catch (error) {
      setError(error);
    }
  }, [role]);

  useEffect(() => { getArray() }, [getArray]);

  return (
    <div className="content-container">
      {error
        ? <p className="loading">Couldn't load this list: {error.message}</p>
        : <SearchPage showClient={showClient} type={role} onRefresh={getArray} />}
    </div>
  );
};

export default View;
