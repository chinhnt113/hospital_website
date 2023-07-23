import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from 'antd';
import { majorityList } from "../../assets/common/commonConstants";
import React, { useState } from 'react';

export const MainNavbar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <div className="nav-container">
      <div className="navbar">
        <ul>
          <li className="nav-item">
            Chuyên khoa <i className="fa-solid fa-chevron-right"></i>
            <ul className="dropdown-menu">
							{majorityList.map((major, index) => {
								return (
									<li className="menu-item" key={index}>
										<Link to={`/majority/${major.majorityCode}`}>{major.majorityFull}</Link>
									</li>
								)
							})}
            </ul>
          </li>
          <li className="nav-item">
            <Link to={`/doctors`}>
              Đội ngũ bác sĩ
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/majority/service`}>
              Gói dịch vụ <i className="fa-solid fa-chevron-right"></i>
            </Link>
            <ul className="dropdown-menu">
              <li className="menu-item">Khám sức khỏe tổng quát</li>
              <li className="menu-item">Rà soát ung thư</li>
              <li className="menu-item">Xét nghiệm bệnh truyền nhiễm</li>
              <li className="menu-item">Xét nghiệm máu</li>
              <li className="menu-item">Chăm sóc sức khỏe sinh sản</li>
              <li className="menu-item">Tâm lý học</li>
            </ul>
          </li>
          <li className="nav-item">
            Hướng dẫn khách hàng <i className="fa-solid fa-chevron-right"></i>
            <ul className="dropdown-menu">
              <li className="menu-item">Giờ làm việc</li>
              <li className="menu-item">Bảng giá dịch vụ chung</li>
              <li className="menu-item">
                Quyền và nghĩa vụ của người bệnh, thân nhân
              </li>
              <li className="menu-item">Quy trình khám chữa bệnh</li>
              <li className="menu-item">Hướng dãn cho khách hàng nội trú</li>
              <li className="menu-item">
                Quy định về giờ thăm bệnh nhân nội trú
              </li>
              <li className="menu-item">Bảo hiểm</li>
            </ul>
          </li>
          <li className="nav-item">
            <Input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} bordered={false} placeholder="Tìm kiếm bài viết" />
            <Button type="text" onClick={handleSearch}>
              <i className="fa-solid fa-search navbar-search-icon"></i>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
