import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {useProfileData, useSetProfileData,} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no_results.png";
import { ProfileEditDropdown } from "../../components/DropdownMenu";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
        await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`/workshops/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        <p className="text-center text-secondary"><strong>{profile?.owner}</strong></p>
        </Col>
        <Col lg={6}>
          <h3 className="m-2"><strong>{profile?.first_name} {profile?.last_name}</strong></h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <p><strong>{profile?.posts_count}</strong></p>
              <p>posts</p>
            </Col>
            <Col xs={3} className="my-2">
            <p><strong>{profile?.followers_count}</strong></p>
              <p>followers</p>
            </Col>
            <Col xs={3} className="my-2">
            <p><strong>{profile?.following_count}</strong></p>
              <p>following</p>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id}/>}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={btnStyles.Button}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={btnStyles.Button}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.about && <Col className="p-3">{profile.about}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <h3 className="text-center text-secondary m-3">my posts</h3>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spin />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          msg={`${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

 
  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
              
            </>
          ) : (
            <Asset spin />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;