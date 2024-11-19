import React, { useState, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Cookies from "js-cookie";
import "./HeaderUp.css";

const HeaderUp = ({}) => {
    const [itemCount, setItemCount] = useState(0);

    const updateItemCount = () => {
        const basketItems = Cookies.get("jovattyshopbusket") || "[]";
        const parsedBasketItems = JSON.parse(basketItems);
        setItemCount(parsedBasketItems.length);
    };

    useEffect(() => {
        updateItemCount();
        const intervalId = setInterval(updateItemCount, 3000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="header__up">
            <div className="header__telephoneblock">
                <div className="header__telephonelogo smalllogo">
                    <svg
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" />
                    </svg>
                </div>
                <div className="header__telephonenumber">+375446661304</div>
            </div>
            <button
                className="header__menuhide"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNav"
                aria-controls="offcanvasNav"
            >
                <div className="header__menuhideicon smalllogo">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3,9H29a2,2,0,0,0,0-4H3A2,2,0,0,0,3,9Z" />
                        <path d="M29,14H3a2,2,0,0,0,0,4H29a2,2,0,0,0,0-4Z" />
                        <path d="M29,23H3a2,2,0,0,0,0,4H29a2,2,0,0,0,0-4Z" />
                    </svg>
                </div>
                <div className="header__menuhidetitle">Меню</div>
            </button>
            <InertiaLink href="/" className="header__logoblock">
                Jovatty
            </InertiaLink>
            <div className="header__accbusketblock">
                <InertiaLink
                    href="/search"
                    className="header__search smalllogo"
                >
                    <svg
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27.7778 24.4444H26L25.3333 23.7778C27.5556 21.3333 28.8889 18 28.8889 14.4444C28.8889 6.44444 22.4444 0 14.4444 0C6.44444 0 0 6.44444 0 14.4444C0 22.4444 6.44444 28.8889 14.4444 28.8889C18 28.8889 21.3333 27.5556 23.7778 25.3333L24.4444 26V27.7778L35.5556 38.8889L38.8889 35.5556L27.7778 24.4444ZM14.4444 24.4444C8.88889 24.4444 4.44444 20 4.44444 14.4444C4.44444 8.88889 8.88889 4.44444 14.4444 4.44444C20 4.44444 24.4444 8.88889 24.4444 14.4444C24.4444 20 20 24.4444 14.4444 24.4444Z"
                        />
                    </svg>
                </InertiaLink>
                <InertiaLink
                    href="/dashboard"
                    className="header__account smalllogo__withcount"
                >
                    <svg
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M21.5001 25.0833C26.4476 25.0833 30.4584 20.2703 30.4584 14.3333C30.4584 8.39619 26.4476 3.58325 21.5001 3.58325C16.5525 3.58325 12.5417 8.39619 12.5417 14.3333C12.5417 20.2703 16.5525 25.0833 21.5001 25.0833Z" />
                        <path d="M39.0583 34.2208C37.4458 30.9958 34.4 28.3083 30.4583 26.6958C29.3833 26.3374 28.1292 26.3374 27.2333 26.8749C25.4417 27.9499 23.65 28.4874 21.5 28.4874C19.35 28.4874 17.5583 27.9499 15.7667 26.8749C14.8708 26.5166 13.6167 26.3374 12.5417 26.8749C8.59998 28.4874 5.55415 31.1749 3.94165 34.3999C2.68748 36.7291 4.65831 39.4166 7.34582 39.4166H35.6542C38.3417 39.4166 40.3125 36.7291 39.0583 34.2208Z" />
                    </svg>
                </InertiaLink>
                <InertiaLink
                    href="/busket"
                    className="header__busket smalllogo__withcount"
                >
                    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M23.734,28.125c1.104,0,2-0.896,2-2v-7.8c0-3.487,2.837-6.325,6.324-6.325c3.487,0,6.325,2.838,6.325,6.325v7.8   c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-7.8C42.384,12.632,37.752,8,32.058,8c-5.692,0-10.324,4.632-10.324,10.325v7.8   C21.734,27.229,22.63,28.125,23.734,28.125z" />
                            <path d="M55,23.631H44.384v2.494c0,2.206-1.794,4-4,4s-4-1.794-4-4v-2.494h-8.649v2.494c0,2.206-1.794,4-4,4s-4-1.794-4-4v-2.494H9   c-0.552,0-0.893,0.435-0.762,0.971l6.998,28.497C15.658,54.701,17.344,56,19,56h26c1.658,0,3.342-1.299,3.766-2.901l6.996-28.497   C55.893,24.065,55.553,23.631,55,23.631z" />
                        </g>
                    </svg>
                    <div className="header__accountbascount">{itemCount}</div>
                </InertiaLink>
            </div>
        </div>
    );
};

export default HeaderUp;
