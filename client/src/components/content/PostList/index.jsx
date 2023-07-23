import React, { useEffect, useState } from 'react';
import HeadPost from '../HeadPost';
import NonheadPost from '../NonheadPost';
import "../content.scss";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Spin, Input, Button } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import { API_URL } from '../../../contexts/constants';
import { majorityList } from '../../../assets/common/commonConstants';

const PostList = () => {
  const { majority } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [responseData, setResponseData] = useState({ posts: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState(new URLSearchParams(location.search).get('keyword') || '');
  const [searchKeyword, setSearchKeyword] = useState(new URLSearchParams(location.search).get('keyword') || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (location.pathname === '/search') {
          response = await axios.get(`${API_URL}/posts/search`, {
            params: { keyword: keyword },
          });
        } else {
          response = await axios.get(`${API_URL}/posts`, {
            params: { majority: majority, page: currentPage },
          });
        }
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (keyword.trim() !== '') {
      setLoading(true);
      fetchData();
      setLoading(false);
    }
  }, [majority, currentPage, keyword]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    if (keyword.trim() !== '') {
      setLoading(true);
      setSearchKeyword(keyword);
      navigate(`/search?keyword=${keyword}`);
      try {
        const response = await axios.get(`${API_URL}/posts/search`, {
          params: { keyword: keyword },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section style={{ marginTop: '160px'}}>
        <Spin spinning={loading} size="large" style={{ minHeight: '200px'}}>
          <div className="section-title">{searchKeyword? `Kết quả tìm kiếm cho "${searchKeyword}"` : majorityList.find((item) => item.majorityCode === majority)?.majorityFull || '---'}</div>
          <div className="list-search-bar">
            <Input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Tìm kiếm bài viết" />
            <Button onClick={handleSearch} type="primary">Tìm kiếm</Button>
          </div>
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
