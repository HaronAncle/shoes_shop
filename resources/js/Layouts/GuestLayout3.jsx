import ApplicationLogo from "@/Components/UIGlobal/ApplicationLogo/ApplicationLogo";
import "./AuthLayouts.css";

export default function GuestLayout({ children }) {
    return (
        <div className="login">
            <div className="container">
                <div className="login__div">
                    <div className="login__block">
                        <ApplicationLogo />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
