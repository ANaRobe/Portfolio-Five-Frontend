import React from "react";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import appStyles from"../../App.module.css";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
    className={`${
      mobile && "d-lg-none text-center mb-3"
    }`}
  >
    {popularProfiles.results.length ? (
      
      <>
      <div className="text-center"><strong >Most followed profiles</strong><hr className={appStyles.Line} /></div>
        {mobile ? (
          <div className="d-flex justify-content-around">
            {popularProfiles.results.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} mobile />
            ))}
          </div>
        ) : (
          popularProfiles.results.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))
        )}
      </>
    ) : (
      <Asset spin />
      )}
    </Container>
  );
};

export default PopularProfiles;