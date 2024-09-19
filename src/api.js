import axios from "axios";


// Removed trailing slash from the base URL
const URL = "https://backendweb-seven.vercel.app";

// Function to get all posts
export async function getPosts() {
    try {
        const token = sessionStorage.getItem('User'); // or localStorage.getItem('User');
        const response = await axios.get(`${URL}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return null;
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
    const token = sessionStorage.getItem('User');
    const response = await axios.get(`${URL}/posts/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
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
        console.log(response.data)
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


export async function loginUser(user) {
    try {
      const response = await axios.post(`${URL}/users/login`, user);
      if (response.data.success) {
        const token = response.data.token;
        // Store the token in sessionStorage or localStorage
        sessionStorage.setItem('User', token); // or localStorage.setItem('User', token);
        console.log(token)
        return token;
      } else {
        console.error('Login failed:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return null;
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
    const token = sessionStorage.getItem('User');
    const response = await axios.get(`${URL}/images/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}


export async function createChallenge(Challenge) {
    const response = await axios.post(`${URL}/challenge`, Challenge);
    return response;
}


