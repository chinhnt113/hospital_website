import React from 'react'
import parse from 'html-react-parser'
import './content.scss'

const PostContent = (props) => {
  const { post } = props;
  const processedPost = post?.content
    .replace(/v-lazy=["'](.*?)['"]/g, (match, url) => `src="${url}`)
    .replace(/\.jpg'"/g, '.jpg"');
  if (post) return (
    <React.Fragment>
      <div className="section-title">{post.title?.replace('Share:', '')}</div>
      <div className="post-content">
        {parse(processedPost)}
      </div>
    </React.Fragment>
  )
  return null;
}

export default PostContent