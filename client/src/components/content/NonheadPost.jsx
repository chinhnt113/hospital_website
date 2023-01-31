import React from 'react'

const NonheadPost = (props) => {
  const {data} = props;
  return (
    <div className="non-head-post post">
      <div className="post-image">
        <img src={data.image} alt="post-preview-image" />
      </div>
      <div className="post-content">
        <div className="post-title title-1">{data.title}</div>
        <div className="post-snippet">{data.snippet}</div>
      </div>
    </div>
  )
}

export default NonheadPost