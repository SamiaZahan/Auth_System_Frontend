import React from "react";

function Header() {
    return (
        <>
            <div className="container-fluid" style={{background: "#14567d"}}>
                <div className="row row-cols-3 fw-bold text-white p-2" style={{'font-size': "16px", 'font-weight': 700}}>
                    <div className="col text-start">
                        FREE Home Delivery
                    </div>
                    <div className="col text-center">
                        Order & Get your items from USA & UK in 30 Days
                    </div>
                    <div className="col text-end">
                        Call us - 01841247008
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;

