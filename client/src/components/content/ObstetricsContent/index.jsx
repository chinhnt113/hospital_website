import React from 'react'
import useFetch from '../../../hooks/useFetch';
import HeadPost from '../HeadPost'
import NonheadPost from '../NonheadPost';
import "../content.scss";

const ObstetricsContent = () => {
  const { data, loading, error } = useFetch(`/posts`, {majority: "obstetrics"});

  return (
    <React.Fragment>
      <section>
        <div className="section-title">Sản phụ khoa và Hỗ trợ sinh sản</div>
        {!data.posts?.length > 0 
          ? null 
          : data.posts.map((post,index) => {
            if (index === 0) {
              return <HeadPost data={post} key={index}/>
            }
            return <NonheadPost data={post} key={index}/>
          })

        }
        
      </section>
    </React.Fragment>
  )
}

export default ObstetricsContent;