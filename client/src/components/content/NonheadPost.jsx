import React from 'react'
import { Link } from 'react-router-dom';

const NonheadPost = (props) => {
  const {data} = props;

  return (
    <div className="non-head-post post">
      <div className="post-image">
        <img src={data.image} alt="post-preview-image" />
      </div>
      <div className="post-content">
        <div className="post-title title-1">
          <Link to={`/post/${data.majority}/${data.url_title || ''}`}>
            {data.title}
          </Link>
        </div>
        <div className="post-snippet">{data.snippet}</div>
      </div>
    </div>
  )
}

export default NonheadPost