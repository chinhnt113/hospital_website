import React from 'react'
import { useParams } from 'react-router-dom';
import Footer from "../components/footer";
import Header from "../components/header";
import PostContent from "../components/content/PostContent"
import useFetch from '../hooks/useFetch';
import { Spin } from 'antd';

const PostDetail = () => {
  const { title } = useParams();
  const { data, loading, error } = useFetch(`/posts/find-post`, {url_title: title});

  return (
    <React.Fragment>
      <Header />
      <section style={{ marginTop: '160px' }}>
        <Spin spinning={loading} size="large" style={{ minHeight: '200px'}}>
          <PostContent post={data.post}/>
        </Spin>
      </section>
      <Footer />
    </React.Fragment>
  )
}

export default PostDetail