import React from "react";
import Profile from "../components/Profile/Profile";

const data = {
  cover:
    "https://st.quantrimang.com/photos/image/2018/09/20/anh-bia-facebook-mau-den-1.jpg",
  image: "https://static.productionready.io/images/smiley-cyrus.jpg",
  userName: "Tungnd24",
  userTag: "Gnutyud",
  content:
    "A user is a person who utilizes a computer or network service. Users of computer systems and software products generally lack the technical expertise required to fully understand how they work.",
};

export default function ProfileContainer() {
  const [userData, setUserData] = React.useState(data);

  return (
    <Profile
      cover={userData.cover}
      image={userData.image}
      userName={userData.userName}
      userTag={userData.userTag}
      content={userData.content}
    />
  );
}
