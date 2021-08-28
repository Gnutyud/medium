import { selectUser } from 'features/setting/settingSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProfileComponent from '../components/ProfileComponent';
import { getProfile, profileSelector } from '../profileSlice';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const currentProfile = useAppSelector(profileSelector);
  const currentUser = useAppSelector(selectUser);
  useEffect(() => {
    dispatch(getProfile(currentUser?.username));
  }, [dispatch]);
  if (currentProfile) {
    return <ProfileComponent author={currentProfile} />;
  } else {
    return <h3>Loading...</h3>;
  }
}
