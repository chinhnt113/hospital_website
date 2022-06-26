export const MainSlider = () => {
    return (
        <div className="slider">
        <button className="slider-btn btn-left">
            <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="slider-container">
            <ul className="slider-container-tracker">
                <li className="slider-item">
                    <img src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/>
                </li>
                <li className="slider-item">
                    <img src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/>
                </li>
                <li className="slider-item">
                    <img src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/>
                </li>
                <li className="slider-item">
                    <img src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/>
                </li>
                <li className="slider-item">
                    <img src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/>
                </li>
            </ul>
        </div>
        <button className="slider-btn btn-right">
            <i className="fa-solid fa-chevron-right"></i>
        </button>
        <div className="slider-nav">
            <button className="slider-position current-position">
                <i className="fa-solid fa-circle"></i>
            </button>
            <button className="slider-position">
                <i className="fa-solid fa-circle"></i>
            </button>
            <button className="slider-position">
                <i className="fa-solid fa-circle"></i>
            </button>
            <button className="slider-position">
                <i className="fa-solid fa-circle"></i>
            </button>
            <button className="slider-position">
                <i className="fa-solid fa-circle"></i>
            </button>
        </div>
    </div>
    )
}