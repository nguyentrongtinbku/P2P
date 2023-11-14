import { useEffect, useState } from "react";

const HomePage = () => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  return <></>;
};

export default HomePage;
