import React, { useEffect, useRef, useState } from "react";
import MySelect from "../components/UI/select/MySelect";
import { useObserver } from "../hook/useObserver";
import PostService from "./../API/PostService";
import PostFilter from "./../components/PostFilter";
import PostForm from "./../components/PostForm";
import PostList from "./../components/PostList";
import MyButton from "./../components/UI/button/MyButton";
import Loader from "./../components/UI/Loader/Loader";
import MyModal from "./../components/UI/MyModal/MyModal";
import Paginator from "./../components/UI/paginator/Paginator";
import useFetching from "./../hook/useFetching";
import { usePosts } from "./../hook/usePosts";
import "./../Style/App.css"
import { getPageCount } from "./../utils/pages";



function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)
  const [totalPage, setTotalPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading,] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers["x-total-count"]
    setTotalPage(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPage, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => { setModal(true) }}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во эл-ов"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "all" },
        ]} />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов Javascript" />
      <div ref={lastElement} style={{ height: 20, background: "red" }} />
      {isPostsLoading &&
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}><Loader /></div>
      }

      <Paginator totalPage={totalPage} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
