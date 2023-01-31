import { Link } from "react-router-dom"

export const MainNavbar = () => {
    return (
        <div className="nav-container">
        <div className="navbar">
            <ul>
                <li className="nav-item">
                    Chuyên khoa <i className="fa-solid fa-chevron-right"></i>
                    <ul className="dropdown-menu">
                        <li className="menu-item">Sức khỏe tổng quát</li>
                        <li className="menu-item">Tim mạch</li>
                        <li className="menu-item">Ung bướu</li>
                        <li className="menu-item"><Link to="/san-phu-khoa-va-ho-tro-sinh-san">Sản phụ khoa và hỗ trợ sinh sản</Link></li>
                        <li className="menu-item">Nhi</li>
                        <li className="menu-item">Tiêu hóa - Gan mật</li>
                        <li className="menu-item">Cơ xương khớp</li>
                        <li className="menu-item">Y học cổ truyền</li>
                    </ul>
                </li>
                <li className="nav-item">
                    Đội ngũ bác sĩ
                </li>
                <li className="nav-item">
                    Gói dịch vụ <i className="fa-solid fa-chevron-right"></i>
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
                        <li className="menu-item">Quyền và nghĩa vụ của người bệnh, thân nhân</li>
                        <li className="menu-item">Quy trình khám chữa bệnh</li>
                        <li className="menu-item">Hướng dãn cho khách hàng nội trú</li>
                        <li className="menu-item">Quy định về giờ thăm bệnh nhân nội trú</li>
                        <li className="menu-item">Bảo hiểm</li>
                    </ul>
                </li>
                <li className="nav-item">
                    Khác <i className="fa-solid fa-chevron-right"></i>
                    <ul className="dropdown-menu">
                        <li className="menu-item">Giới thiệu</li>
                        <li className="menu-item">Tin tức</li>
                        <li className="menu-item">Tra cứu</li>
                        <li className="menu-item">Thông tin Dược</li>
                        <li className="menu-item">Tuyển dụng</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    )
}