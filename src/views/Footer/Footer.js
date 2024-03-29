import React from "react"
import './Footer.scss'

const Footer = () => <footer className="page-footer footer font-small blue pt-4 mt-5 footer-tu-css">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase" style={{ fontSize: 20 }}>Shop bán cà phê pha phiên số 1 Việt Nam</h5>
                {/* <p>Here you can use rows and columns to organize your footer content.</p> */}
                <img src={require('../../assets/images/logo-coffe-footer.jpg')} height={200} width={200} />
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"> Tp. HỒ CHÍ MINH</h5>
                <ul className="list-unstyled">
                    <li><p>Q.9: Lê Văn Việt</p></li>
                    <li><p>Q.1: Đa Kao</p></li>
                    <li><p>Q.9: Võ Văn Ngân</p></li>
                    <li><p>Q.9: Man Thiện</p></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"> TÂY NAM BỘ</h5>
                <ul className="list-unstyled">
                    <li><p>Sóc Trăng: Tôn Đức Thắng</p></li>
                    <li><p>Cà Mau: Trần Hưng Đạo</p></li>
                    <li><p>Cần Thơ: đ. 3 Tháng 2</p></li>
                    <li><p>Tp. Rạch Giá: Nguyễn Trung Trực</p></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

export default Footer