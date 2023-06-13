import React from 'react'
import parse from 'html-react-parser'

const PostContent = (props) => {
  const { post } = props;
  if (post) return (
    <React.Fragment>
      <div className="section-title">{post.title?.replace('Share:', '')}</div>
      <div>{parse(post.content)}</div>
    </React.Fragment>
  )
  return null;
}

export default PostContent