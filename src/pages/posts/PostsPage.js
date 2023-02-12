import React, { useEffect, useState } from 'react';
import { Badge, Container, Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Post from './Post';
import NoResults from "../../assets/no_results.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from "../profiles/PopularProfiles";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SearchBar.module.css";
import Tips from "../../assets/tips.png";
import Recommendations from "../../assets/recommend.jpg";
import DidYouKnow from "../../assets/did_you_know.jpg";
import FunPosts from "../../assets/fun_posts.png";
import All from "../../assets/all.jpg";
import Other from "../../assets/other.jpg";



/*
    Display all posts.
 */
function PostsPage({ filter = '' }) {
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');

  const currentUser = useCurrentUser();

/*
    Fetch posts from API.
*/
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}${
          category !== null ? `&category=${category}` : ""
      }`); //    get search results
        setPosts(data);
        setHasLoaded(true);
      } catch (error) {
        //console.log(error);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, category]);

  return (
<Row className="h-100">
  <Col className="py-2 p-0 p-lg-2" lg={8}>
  <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(e) => e.preventDefault()}
        >
          
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
            aria-label="search bar"
          />
          <i className={`fa-solid fa-eraser ${styles.Clear}`} onClick={() => setQuery("")} />
        </Form>
       
      <PopularProfiles mobile />
      <Container
    >
        <OverlayTrigger placement="top" overlay={<Tooltip>All</Tooltip>}>
          <Badge variant="secondary" className={btnStyles.Button} onClick={() => setCategory(null)}><img src={All} alt="All" height="40" /></Badge> 
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Did you know?</Tooltip>}>
          <Badge variant="secondary" className={btnStyles.Button} onClick={() => setCategory("did_you_know")}><img src={DidYouKnow} alt="Did you know?" height="40" /></Badge>             
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Tips & How Tos</Tooltip>}>
        <Badge variant="secondary" className={btnStyles.Button} onClick={() => setCategory("tips&how_tos")}><img src={Tips} alt="Tips & How Tos" height="40" /></Badge>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Fun Posts</Tooltip>}>
        <Badge variant="secondary" className={btnStyles.Button} onClick={() => setCategory("fun_posts")}><img src={FunPosts} alt="Fun Posts" height="40" /></Badge>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Recommendations</Tooltip>}>
        <Badge variant="secondary" className={btnStyles.Button} onClick={() => setCategory("recommendations")}><img src={Recommendations} alt="Recommendations" height="40" /></Badge>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Other</Tooltip>}>
        <Badge variant="secondary" className={btnStyles.Button} onClick={() => setCategory("other")}><img src={Other} alt="Other" height="40" /></Badge>
        </OverlayTrigger>
      </Container>
        <Form onSubmit={(event) => event.preventDefault()}>
      </Form>
           {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll 
              children={
                posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))
              }
              dataLength={posts.results.length}
              loader={<Asset spin />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
              />
              
            ) : (
              <Container>
                <Asset src={NoResults} />
              </Container>
            )}
          </>
        ) : (
            <Asset spin />
        )}
      </Col>
      <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
 
  );
}
export default PostsPage;

 

