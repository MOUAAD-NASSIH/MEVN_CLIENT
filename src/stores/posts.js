import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
// const api = "http://localhost:5000/api/posts";
const api = "https://mevn-api-z0nb.onrender.com/api/posts";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);

  async function getAllPosts() {
    const res = await axios.get(api);
    console.log("data fetched !", res.data);
    return res.data;
  }
  async function getPostByID(id) {
    const res = await axios.get(`${api}/${id}`);
    // console.log("data fetched !", res.data);
    return res.data;
  }
  async function addPost(post) {
    const res = await axios.post(api, post);
    console.log("data posted !", res.data);
    return res.data;
  }
  async function deletePost(id) {
    const res = await axios.delete(`${api}/${id}`);
    console.log("data deleted !", res.data);
    return res.data;
  }
  async function updatePost(id, post) {
    const res = await axios.patch(`${api}/${id}`, post);
    console.log("data posted !", res.data);
    return res.data;
  }
  return { posts, getAllPosts, getPostByID, addPost, deletePost, updatePost };
});
