import React, { useEffect, useState } from 'react'
import HeadPost from '../HeadPost'
import NonheadPost from '../NonheadPost';
import "../content.scss";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import { API_URL } from '../../../contexts/constants';

const PostList = () => {
  const { majority } = useParams();
  const [responseData, setResponseData] = useState({ posts: [] });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`, {
          params: { majority: majority, page: currentPage },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [majority, currentPage]);

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <section>
        <Pagination
          current={currentPage}
          total={0}
          onChange={handlePageChange}
          locale={viVN}
        />
        <div className="section-title">Sản phụ khoa và Hỗ trợ sinh sản</div>
        {!responseData.posts?.length > 0
          ? null
          : responseData.posts.map((post, index) => {
              if (index === 0) {
                return <HeadPost data={post} key={index} />;
              }
              return <NonheadPost data={post} key={index} />;
            })}
        <Pagination
          current={currentPage}
          total={responseData.totalPages * 10}
          onChange={handlePageChange}
          locale={viVN}
        />
      </section>
    </React.Fragment>
  );
};

export default PostList;
