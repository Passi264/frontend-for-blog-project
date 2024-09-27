import { createContext, useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { getChallenges, getPost, getPosts, getUserLikes } from "./api";


const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [fliker, setFliker] = useState(false)
    const [login, setLogin] = useState(false)
    const [posts, setPosts] = useState()
    const [user, setUser] = useState()
    const [challenges, setChallenges] = useState()


    useEffect(() => {
        let token = sessionStorage.getItem("User")
        if(token){
            token = token.replace(/^"|"$/g, '')
            const decoded = jwt_decode.jwtDecode(token)
            setUser(() => decoded)
        }
        else(
            setUser(null)
        )

    }, [login, fliker])


    useEffect(() => {

        const fetchPosts = async () => {
            const posts = await getPosts();
            setPosts(posts);
        };

        fetchPosts()

    },[fliker])


    useEffect(() => {

        const fetchChallenges = async () => {
            const challenges = await getChallenges();
            setChallenges(challenges);
          };
        
          fetchChallenges()

    },[fliker])


    const updateLog = () => setLogin(!login)
    const runFliker = () => setFliker(!fliker)

    return(
        <DataContext.Provider value={{posts, challenges, user, login , updateLog, runFliker, fliker }} >
            {children}
        </DataContext.Provider>
    )

}

export default DataContext