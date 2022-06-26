export const MainHeader = () => {
    return (
    <div className="header-container">
        <div class="header">
            <div class="header-left">
                <div class="header-logo">
                    {/* <img src="../assets/img/logo.png" alt="logo"> */}
                </div>
                <div class="name-benhvien">
                    <div class="name-vn">Bệnh viện Đa khoa Bách khoa</div>
                    <div class="name-en">SCIENCE AND TECHNOLOGY MEDICAL HOSPITAL</div>
                    <div class="name-slogan">Hãy để chúng tôi chăm sóc bạn</div>
                </div>
            </div>
            <div class="header-right">
                <button class="trans-btn">LIÊN HỆ TƯ VẤN</button>
                <button class="trans-btn">ĐẶT LỊCH KHÁM</button>
                <button class="color-btn">ĐĂNG KÝ</button>
                <button class="trans-btn">ĐĂNG NHẬP</button>
            </div>
        </div>
    </div> 
    );
}