import axios from "axios"
const URL= "https://backend-for-blog-website.vercel.app"
export async function getPosts(){
    const response = await axios.get(`${URL}/posts`)
    if (response.status===200){
    return response.data
    } else{
        return
    }
}

export async function getPost(id) {
    //"http://localhost:3000/posts/12345"
    const response = await axios.get(`${URL}/posts/${id}`)

    const post = response.data
    const data = await getImage(post.imageId)
    post.image = data
    return post
}


export async function createPost(post){
    console.log(post)
    const data= await createImage(post.file)
    const imageId = post.file.name
    post.imageId= imageId
    const response = await axios.post(`${URL}/posts`,post)
        console.log(response)
        return response
}

export async function updatePost(id, post){
    const response = await axios.put(`${URL}/posts/${id}`,post)
    return response
}

export async function deletePost(id){
    const response = await axios.delete(`${URL}/posts/${id}`)
        return response
}


export async function userPosts(){
    const response = await axios.get(`${URL}/users`)
    if (response.status===200){
    return response.data
    } else{
        return
    }
}

export async function getUser(id) {
        const response = await axios.get(`${URL}/users/${id}`)
        if (response.status===200){
        return response.data
        } else{
            return
        }
}

export async function createUser(user){
    const response = await axios.post(`${URL}/users`,user)
        return response
}
export async function loginUser(user){
    const response = await axios.post(`${URL}/users/login`,user)
    console.log(response)
    if(response.request.status==200){
        return response.data.token
    } else{
        throw new Error(response.statusText)
    }
}

export async function updateUser(id, user){
    const response = await axios.put(`${URL}/users/${id}`,user)
    return response
}
export async function createImage(file) {
    const formData = new FormData()
    formData.append('image', file)
    const response = await axios.post(`${URL}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}

export async function getImage(id) {
    const response = await axios.get(`${URL}/images/${id}`)
    return response
}

