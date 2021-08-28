import { selectUser } from 'features/setting/settingSlice';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getProfile, profileSelector } from '../profileSlice';
import ProfileInfo from './ProfileInfo';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const currentProfile = useAppSelector(profileSelector);
  const currentUser = useAppSelector(selectUser);
  useEffect(() => {
    dispatch(getProfile(currentUser.username));
  }, [dispatch]);
  if (currentProfile) {
    return (
      <ProfileInfo
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
