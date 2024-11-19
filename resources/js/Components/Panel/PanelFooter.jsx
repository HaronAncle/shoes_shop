import React, { useEffect } from "react";

const PanelFooter = () => {
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; </span>
                    {/* {{date('Y')}} */}
                </div>
            </div>
        </footer>
    );
};

export default PanelFooter;
