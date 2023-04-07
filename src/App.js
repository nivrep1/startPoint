import React, { useMemo, useState, useRef, useEffect } from "react";
import PostList from "./components/PostList";
import "./styles/App.scss";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  /*  Post əlavə etmək üçün  */

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /*  Postu silmək üçün  */

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  /*  Axios  */

  async function fetchPosts() {
    const posts = await PostService.getAll();
    setPosts(posts);
  }

  /*  UseEffecT  */
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>Get Posts</MyButton>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0px" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} />
    </div>
  );
}

export default App;
