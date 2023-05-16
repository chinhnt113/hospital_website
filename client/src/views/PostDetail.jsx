import React from 'react'
import { useParams } from 'react-router-dom';
import Footer from "../components/footer";
import Header from "../components/header";
import PostContent from "../components/content/PostContent"
import useFetch from '../hooks/useFetch';

const PostDetail = () => {
  const { title } = useParams();
  const { data, loading, error } = useFetch(`/posts/find-post`, {url_title: title});
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