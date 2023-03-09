import React from 'react'
import parse from 'html-react-parser'

const PostContent = (props) => {
  const { post } = props;
  console.log(post);
  if (post) return (
    <section>
      <div className="section-title">{post.title}</div>
      <div>{parse(post.content)}</div>
    </section>
  )
  return null;
}

export default PostContent