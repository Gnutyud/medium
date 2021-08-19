import React from "react";
import Profile from "../components/Profile/Profile";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".././app/hooks";
import { getProfile, profileSelector } from "../app/reducers/profileSlice";
import { userSelector } from "../app/reducers/authSlice";

export default function ProfileContainer() {
  const dispatch = useAppDispatch();
  const currentProfile = useAppSelector(profileSelector);
  const currentUser = useAppSelector(userSelector);
  useEffect(() => {
    dispatch(getProfile(currentUser.username));
  }, [dispatch]);
  if (currentProfile) {
    return (
      <Profile
        image={currentProfile.image}
        username={currentProfile.username}
        bio={currentProfile.bio}
        following={currentProfile.following}
      />
    );
  } else {
    return <h3>Loading...</h3>;
  }
}
