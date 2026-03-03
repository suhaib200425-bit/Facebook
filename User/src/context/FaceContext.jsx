import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;

export const FaceContext = createContext();

export const FaceProvider = ({ children }) => {

  // const Navigate = useNavigate()
  const [User, setUser] = useState(null);
  const [AllPosts, setAllPosts] = useState(null);
  const Token = localStorage.getItem('token')
  //pop

  const [Controller, setController] = useState({
    pop:'',
    right:0
  })

  async function LoggedUser(Token) {
    try {
      const response = await axios.get(
        `${BACKENDAPI}/api/user/logged`,
        {
          headers: {
            Authorization: `Bearer ${Token}`   // ✅ correct format
          }
        }
      );
      console.log(response.data);

      if (response.data.status) {
        setUser(response.data.user)
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      // Navigate('/login')
    }
  }
  async function GetPosts(Token) {
    try {
      const response = await axios.get(
        `${BACKENDAPI}/api/post/getall`,
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }
      );
      console.log(response.data);

      if (response.data.status) {
        console.log('START');
        setAllPosts(response.data.posts)
        console.log("END");

      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      // Navigate('/login')
    }
  }
  useEffect(() => {

    if (User == null || Token)
      Promise.all([LoggedUser(Token), GetPosts(Token)])

  }, [Token])
  return (
    <FaceContext.Provider value={{
      User,
      setUser,
      AllPosts,
      setAllPosts,
      //POP
      setController,
      Controller,
      //other functions
      GetPosts,
      LoggedUser
    }}>
      {children}
    </FaceContext.Provider>
  );
};

// ✅ Custom hook
export const useFace = () => {
  return useContext(FaceContext);
};