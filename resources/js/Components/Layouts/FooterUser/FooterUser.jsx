import React from "react";
import "./FooterUser.css";

const FooterUser = ({}) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__div">
                    <div className="footer__columsblock">
                        <div className="footer__maininfo">
                            <div
                                className="footer__columtitlemain"
                                id="shop-oficial-logo"
                            >
                                Jovatty
                            </div>
                            <div className="footer__columninfo">
                                <div className="footer__logo">&copy;</div>
                                <div
                                    className="footer__columninfoname"
                                    id="shop-oficial-name"
                                >
                                    ООО "Интернет-магазин", 2023-2024
                                </div>
                            </div>
                            <div className="footer__columninfo">
                                <div className="footer__logo">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" />
                                    </svg>
                                </div>
                                <div
                                    className="footer__columninfoname"
                                    id="shop-oficial-telephone"
                                >
                                    +375445556666
                                </div>
                            </div>
                            <div className="footer__columninfo">
                                <div className="footer__logo">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 12 10"
                                    >
                                        <path
                                            d="M367,142h-7a2,2,0,0,1-2-2v-5a2,2,0,0,1,2-2h7a2,2,0,0,1,2,2v5A2,2,0,0,1,367,142Zm0-2v-3.039L364,139h-1l-3-2.036V140h7Zm-6.634-5,3.145,2.079L366.634,135h-6.268Z"
                                            transform="translate(-358 -133)"
                                        ></path>
                                    </svg>
                                </div>
                                <div
                                    className="footer__columninfoname"
                                    id="shop-oficial-email"
                                >
                                    jovatty@mail.ru
                                </div>
                            </div>
                            <div className="footer__columninfo">
                                <div className="footer__logo">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 13 17"
                                    >
                                        <path
                                            d="M959.135,82.315l0.015,0.028L955.5,87l-3.679-4.717,0.008-.013a4.658,4.658,0,0,1-.83-2.655,4.5,4.5,0,1,1,9,0A4.658,4.658,0,0,1,959.135,82.315ZM955.5,77a2.5,2.5,0,0,0-2.5,2.5,2.467,2.467,0,0,0,.326,1.212l-0.014.022,2.181,3.336,2.034-3.117c0.033-.046.063-0.094,0.093-0.142l0.066-.1-0.007-.009a2.468,2.468,0,0,0,.32-1.2A2.5,2.5,0,0,0,955.5,77Z"
                                            transform="translate(-951 -75)"
                                        ></path>
                                    </svg>
                                </div>
                                <div
                                    className="footer__columninfoname"
                                    id="shop-oficial-adress"
                                >
                                    Республика Беларусь, г.Минск, ул. Притыцкого
                                    105-1
                                </div>
                            </div>
                            <div className="footer__columninfo">
                                <a className="footer__medialogo">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="38 318 612 612"
                                    >
                                        <path d="M507.7 625.8c0 90.7-73.5 164.2-164.2 164.2s-164.2-73.5-164.2-164.2c0-33.5 10.1-64.6 27.3-90.7H38v254.2C38 867 101 930 178.7 930h330.4c77.7 0 140.7-63 140.7-140.7V535.1H480.2C497.5 561 507.7 592.3 507.7 625.8zM344 743.1c64.8 0 117.3-52.5 117.3-117.3S408.8 508.5 344 508.5 226.7 561 226.7 625.8C226.7 690.6 279.2 743.1 344 743.1zM279.9 561.5c17.2-17 40-26.6 64.1-26.6 24.3 0 47.1 9.4 64.3 26.6 17.2 17.2 26.6 40 26.6 64.3s-9.4 47.1-26.6 64.3c-17.2 17.2-40 26.6-64.3 26.6 -24.3 0-47.1-9.4-64.1-26.6 -17.2-17.2-26.6-40-26.6-64.3C253.3 601.5 262.7 578.7 279.9 561.5zM509.3 318H178.7c-7.4 0-14.8 0.5-22.1 1.6h22.6v142h-26.6V320.4c-9.2 1.6-18.1 4.3-26.4 7.8v133.6H99.7V342.3C62.4 367.6 38 410.3 38 458.7v49.8h190.5c29.7-29 70.1-46.9 115-46.9 44.7 0 85.3 17.9 115 46.9H650v-49.8C650 381 587 318 509.3 318zM577 461.6h-69.3v-69.3H577V461.6z"></path>
                                    </svg>
                                </a>
                                <a className="footer__medialogo">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="38 318 612 612"
                                    >
                                        <path d="M507.7 625.8c0 90.7-73.5 164.2-164.2 164.2s-164.2-73.5-164.2-164.2c0-33.5 10.1-64.6 27.3-90.7H38v254.2C38 867 101 930 178.7 930h330.4c77.7 0 140.7-63 140.7-140.7V535.1H480.2C497.5 561 507.7 592.3 507.7 625.8zM344 743.1c64.8 0 117.3-52.5 117.3-117.3S408.8 508.5 344 508.5 226.7 561 226.7 625.8C226.7 690.6 279.2 743.1 344 743.1zM279.9 561.5c17.2-17 40-26.6 64.1-26.6 24.3 0 47.1 9.4 64.3 26.6 17.2 17.2 26.6 40 26.6 64.3s-9.4 47.1-26.6 64.3c-17.2 17.2-40 26.6-64.3 26.6 -24.3 0-47.1-9.4-64.1-26.6 -17.2-17.2-26.6-40-26.6-64.3C253.3 601.5 262.7 578.7 279.9 561.5zM509.3 318H178.7c-7.4 0-14.8 0.5-22.1 1.6h22.6v142h-26.6V320.4c-9.2 1.6-18.1 4.3-26.4 7.8v133.6H99.7V342.3C62.4 367.6 38 410.3 38 458.7v49.8h190.5c29.7-29 70.1-46.9 115-46.9 44.7 0 85.3 17.9 115 46.9H650v-49.8C650 381 587 318 509.3 318zM577 461.6h-69.3v-69.3H577V461.6z"></path>
                                    </svg>
                                </a>
                                <a className="footer__medialogo">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="38 318 612 612"
                                    >
                                        <path d="M507.7 625.8c0 90.7-73.5 164.2-164.2 164.2s-164.2-73.5-164.2-164.2c0-33.5 10.1-64.6 27.3-90.7H38v254.2C38 867 101 930 178.7 930h330.4c77.7 0 140.7-63 140.7-140.7V535.1H480.2C497.5 561 507.7 592.3 507.7 625.8zM344 743.1c64.8 0 117.3-52.5 117.3-117.3S408.8 508.5 344 508.5 226.7 561 226.7 625.8C226.7 690.6 279.2 743.1 344 743.1zM279.9 561.5c17.2-17 40-26.6 64.1-26.6 24.3 0 47.1 9.4 64.3 26.6 17.2 17.2 26.6 40 26.6 64.3s-9.4 47.1-26.6 64.3c-17.2 17.2-40 26.6-64.3 26.6 -24.3 0-47.1-9.4-64.1-26.6 -17.2-17.2-26.6-40-26.6-64.3C253.3 601.5 262.7 578.7 279.9 561.5zM509.3 318H178.7c-7.4 0-14.8 0.5-22.1 1.6h22.6v142h-26.6V320.4c-9.2 1.6-18.1 4.3-26.4 7.8v133.6H99.7V342.3C62.4 367.6 38 410.3 38 458.7v49.8h190.5c29.7-29 70.1-46.9 115-46.9 44.7 0 85.3 17.9 115 46.9H650v-49.8C650 381 587 318 509.3 318zM577 461.6h-69.3v-69.3H577V461.6z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="footer__columscolumns">
                            <div className="footer__column">
                                <div className="footer__columtitle">
                                    Каталог
                                </div>
                                <a className="footer__columnul">Женщинам</a>
                                <a className="footer__columnul">Мужчинам</a>
                                <a className="footer__columnul">Девочкам</a>
                                <a className="footer__columnul">Мальчикам</a>
                                <a className="footer__columnul">
                                    Все для обуви
                                </a>
                            </div>
                            <div className="footer__column">
                                <div className="footer__columtitle">
                                    Компания
                                </div>
                                <a className="footer__columnul">О нас</a>
                                <a className="footer__columnul">Вакансии</a>
                                <a className="footer__columnul">Контакты</a>
                                <a className="footer__columnul">
                                    Сотрудничество
                                </a>
                            </div>
                            <div className="footer__column">
                                <div className="footer__columtitle">
                                    Покупателям
                                </div>
                                <a className="footer__columnul">
                                    Обработка персональных данных
                                </a>
                                <a className="footer__columnul">
                                    Обработка файлов cookie
                                </a>
                                <a className="footer__columnul">Сертификаты</a>
                                <a className="footer__columnul">
                                    Уход за обувью
                                </a>
                            </div>
                            <div className="footer__column">
                                <div className="footer__columtitle">
                                    Специальные предложения
                                </div>
                                <a className="footer__columnul">Акции</a>
                                <a className="footer__columnul">Новости</a>
                                <a className="footer__columnul">
                                    Правила использования акций
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterUser;
