import axios from "axios";


// Removed trailing slash from the base URL
const URL = "http://localhost:3009";

// Function to get all posts
export async function getPosts() {
    try {
        const response = await axios.get(`${URL}/posts`);
        if (response.status === 200) {
            return response.data; // Return data on successful response
        } else {
            console.error('Unexpected response status:', response.status);
            return []; // Return an empty array if status is not 200
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return an empty array in case of error
    }
}

export async function getChallenges() {

    try {
        const response = await axios.get(`${URL}/challengecome`);
        if (response.status === 200) {
            return response.data; // Return data on successful response
        } else {
            console.error('Unexpected response status:', response.status);
            return []; // Return an empty array if status is not 200
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return an empty array in case of error
    }
}


// Function to get a specific post by ID
export async function getPost(id) {
    const response = await axios.get(`${URL}/posts/${id}`);
    const post = response.data;
    const data = await getImage(post.imageId);
    post.image = data;
    return post;
}

// Function to create a new post
export async function createPost(post) {
    console.log(post);
    const data = await createImage(post.file);
    console.log(data)
    const imageId = post.file.name;
    post.imageId = imageId;
    const response = await axios.post(`${URL}/posts`, post);
    console.log(response);
    return response;
}

// Function to update a post by ID
export async function updatePost(id, post) {
    const response = await axios.put(`${URL}/posts/${id}`, post);
    return response;
}

// Function to delete a post by ID
export async function deletePost(id) {
    const response = await axios.delete(`${URL}/posts/${id}`);
    return response;
}

// Function to get all users
export async function userPosts() {
    const response = await axios.get(`${URL}/users`);
    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

// Function to get a specific user by ID
export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`);
    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

// Function to create a new user
export async function createUser(user) {
    const response = await axios.post(`${URL}/users`, user);
    return response;
}

// Function to log in a user
export async function loginUser(user){
    const response = await axios.post(`${URL}/users/login`,user)
    console.log(response)
    if (response.data.success) {
        return response.data.token
    } else {
        return
    }
}





// Function to update a user by ID
export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/users/${id}`, user);
    return response;
}

// Function to upload an image (multipart/form-data)
export async function createImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(`${URL}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

// Function to get an image by ID
export async function getImage(id) {
    const response = await axios.get(`${URL}/images/${id}`);
    return response;
}


export async function createChallenge(Challenge) {
    const response = await axios.post(`${URL}/challenge`, Challenge);
    return response;
}


// import axios from "axios"
// const URL= "https://mongobase-two.vercel.app/"
// export async function getPosts(){
//     const response = await axios.get(`${URL}/posts`)
//     if (response.status===200){
//     return response.data
//     } else{
//         return
//     }
// }

// export async function getPost(id) {
//     //"http://localhost:3000/posts/12345"
//     const response = await axios.get(`${URL}/posts/${id}`)

//     const post = response.data
//     const data = await getImage(post.imageId)
//     post.image = data
//     return post
// }


// export async function createPost(post){
//     console.log(post)
//     const data= await createImage(post.file)
//     const imageId = post.file.name
//     post.imageId= imageId
//     const response = await axios.post(`${URL}/posts`,post)
//         console.log(response)
//         return response
// }

// export async function updatePost(id, post){
//     const response = await axios.put(`${URL}/posts/${id}`,post)
//     return response
// }

// export async function deletePost(id){
//     const response = await axios.delete(`${URL}/posts/${id}`)
//         return response
// }


// export async function userPosts(){
//     const response = await axios.get(`${URL}/users`)
//     if (response.status===200){
//     return response.data
//     } else{
//         return
//     }
// }

// export async function getUser(id) {
//         const response = await axios.get(`${URL}/users/${id}`)
//         if (response.status===200){
//         return response.data
//         } else{
//             return
//         }
// }

// export async function createUser(user){
//     const response = await axios.post(`${URL}/users`,user)
//         return response
// }

// export async function updateUser(id, user){
//     const response = await axios.put(`${URL}/users/${id}`,user)
//     return response
// }
// export async function createImage(file) {
//     const formData = new FormData()
//     formData.append('image', file)
//     const response = await axios.post(`${URL}/images`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
//     return response
// }

// export async function getImage(id) {
//     const response = await axios.get(`${URL}/images/${id}`)
//     return response
// }

// export async function loginUser(user) {
//     try {
//         const response = await axios.post(`${URL}/users/login`, user);

//         if (response.data.success) {
//             return response.data.user;  // Ensure this is the expected response from the backend
//             console.log(response)
//         } else {
//             throw new Error(response.data.message || 'Login failed');
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// }