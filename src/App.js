import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MySelect from "./components/UI/select/MySelect";

import "./Style/App.css"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "sdh", body: "description" },
    { id: 2, title: "fgnmhy", body: "description" },
    { id: 3, title: "yi.gm", body: "description" },
  ])
  const [selectedSort, setSelectedSort] = useState("")
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPost = (sort) => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPost}
          defaultValue="Cортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]} />
      </div>
      {posts.length
        ? <PostList remove={removePost} posts={posts} title="Список постов Javascript" />
        : <h1 style={{ textAlign: "center" }}>Постов нет</h1>}
    </div>
  );
}

export default App;
