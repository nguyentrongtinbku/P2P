import { useEffect, useState } from "react";

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi component được mount
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          console.log(parsedUserData.data)
        }
      }, []);
  return (
    <div>
      <h1>thien</h1>
    </div>
  );
};

export default HomePage;
