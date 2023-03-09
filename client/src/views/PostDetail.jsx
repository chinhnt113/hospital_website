import React from 'react'
import { useLocation } from 'react-router-dom';
import Footer from "../components/footer";
import Header from "../components/header";
import PostContent from "../components/content/PostContent"
import useFetch from '../hooks/useFetch';

const PostDetail = () => {
  const { pathname } = useLocation();
  const url_title = pathname.split("/").at(-1);
  const { data, loading, error } = useFetch(`/posts/find-post`, {url_title: url_title});
  console.log(data.post)

  return (
    <React.Fragment>
      <Header />
      <PostContent post={data.post}/>
      <Footer />
    </React.Fragment>
  )
}

export default PostDetail