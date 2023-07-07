import React, { useEffect, useState } from 'react'
import HeadPost from '../HeadPost'
import NonheadPost from '../NonheadPost';
import "../content.scss";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Spin } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import { API_URL } from '../../../contexts/constants';
import { majorityList } from '../../../assets/common/commonConstants';

const PostList = () => {
  const { majority } = useParams();
  const [responseData, setResponseData] = useState({ posts: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [majority, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <section style={{ marginTop: '160px'}}>
        <Spin spinning={loading} size="large" style={{ minHeight: '200px'}}>
          <div className="section-title">{majorityList.find((item) => item.majorityCode === majority)?.majorityFull || 'Lỗi'}</div>
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
            total={(responseData.totalPages || 0) * 10}
            onChange={handlePageChange}
            locale={viVN}
            showSizeChanger={false}
            pageSize={10}
          />
        </Spin>
      </section>
    </React.Fragment>
  );
};

export default PostList;
