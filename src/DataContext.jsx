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
    const [userLikes, setUserLikes] = useState()

    useEffect( () => {
        console.log('Context API rendered')
            let token = sessionStorage.getItem("User")
            if(token){
                token = token.replace(/^"|"$/g, '')
                const decoded = jwt_decode.jwtDecode(token)

                try{
                    async function fetching(decoded){

                        console.log('token was found')
                        //decoded token has the user object
                        setUser(()=> decoded)
                        

                        //fetching all posts
                        const post = await getPosts()
                        if(post === null ){
                            return null
                        }
                        else{
                            setPosts(()=> post)
                        }

                        //fetching all challenges
                        const challenge = await getChallenges()
                        if(challenge === null ){
                            return null
                        }
                        else{
                            setChallenges(()=> challenge)
                        }

                        //fetching user's likes
                        const likedPost = await getUserLikes(decoded._id)
                        if(likedPost  === null ){
                            return null
                        }
                        else{
                            setUserLikes(()=> likedPost )
                            console.log(userLikes)
                        }
                    }
                    fetching(decoded)
                }

                catch(err){
                    console.log(err)
                }
            }
        }, [login, fliker])

        

    const updateLog = () => setLogin(!login)
    const runFliker = () => setFliker(!fliker)

    return(
        <DataContext.Provider value={{posts, challenges, user, login , updateLog, runFliker, fliker, userLikes }} >
            {children}
        </DataContext.Provider>
    )

}

export default DataContext