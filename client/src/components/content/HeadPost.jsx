import React from 'react'
import { useNavigate } from 'react-router-dom';

const HeadPost = (props) => {
  const {data} = props;
  const navigate = useNavigate();

  const handleOpenPost = () => {
    navigate(`/san-phu-khoa-va-ho-tro-sinh-san/${data.url_title || ''}`);
  }

  return (
    <div className="head-post post">
      <div className="post-image">
        <img src={data.image} alt="post-preview-image" />
      </div>
      <div className="post-content">
        <div className="post-title title-1" onClick={handleOpenPost}>{data.title}</div>
        <div className="post-snippet">{data.snippet}</div>
      </div>
    </div>
  )
}

export default HeadPost