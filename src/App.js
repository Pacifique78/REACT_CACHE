import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './store/actions';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Badge } from 'react-bootstrap';

function App() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const startTime = useSelector((state) => state.posts.startTime);
  const endTime = useSelector((state) => state.posts.endTime);
  const origin = useSelector((state) => state.posts.origin);

  const fetchPosts = useCallback(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="w-50 h-100 m-auto d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column justify-items-center align-items-center">
          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {posts.length > 0 && !loading && (
            <>
              <div>Number of Posts: {posts.length}</div>
              <div>
                Response from: <Badge bg="primary">{origin}</Badge>
              </div>
              <div>Time spent: {endTime - startTime}ms</div>
            </>
          )}
          <Button onClick={fetchPosts}>Get Posts</Button>
          {error && (
            <Alert key="danger" variant="danger">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
