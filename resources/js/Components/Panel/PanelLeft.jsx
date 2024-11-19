import React, { useEffect } from "react";
import "./PanelLeft.css";

const PanelLeft = ({ user, ...props }) => {
    let roleId = user?.role_id;
    roleId = 5;
    useEffect(() => {
        if (roleId === 1 || roleId == null) {
            window.location.href = "/dashboard";
        }
    }, [roleId]);

    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark panelleft"
            id="accordionSidebar"
        >
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href={
                    roleId === 5
                        ? "/workerpanel/admin"
                        : roleId === 4
                        ? "/workerpanel/moderator"
                        : "/workerpanel/worker"
                }
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    {roleId === 5 && <i className="fa-solid fa-computer"></i>}
                    {roleId === 4 && (
                        <i className="fa-solid fa-pen-to-square"></i>
                    )}
                    {roleId === 2 && <i className="fa-solid fa-store"></i>}
                </div>
                <div className="sidebar-brand-text mx-2">
                    {roleId === 5
                        ? "Админ"
                        : roleId === 4
                        ? "Модератор"
                        : "Работник"}
                </div>
            </a>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Главная</div>

            {roleId === 2 && (
                <>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/worker/orders"
                        >
                            <i className="fa-solid fa-clipboard"></i>
                            <span>Заказы</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/worker/items"
                        >
                            <i className="fa-solid fa-shoe-prints"></i>
                            <span>Продукты</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/worker/postavki"
                        >
                            <i className="fa-solid fa-warehouse"></i>
                            <span>Поступления</span>
                        </a>
                    </li>
                </>
            )}

            {roleId === 5 && (
                <>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/orders"
                        >
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span>Заказы</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/workerpanel/admin/items">
                            <i className="fa-solid fa-shoe-prints"></i>
                            <span>Продукты</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/postavki"
                        >
                            <i class="fa-solid fa-truck-fast"></i>
                            <span>Поступления</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/workerpanel/admin/news">
                            <i className="fas fa-image"></i>
                            <span>Статьи</span>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/discounts"
                        >
                            <i className="fa-solid fa-tag"></i>
                            <span>Акции</span>
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="/workerpanel/admin/users">
                            <i className="fas fa-users"></i>
                            <span>Пользователи</span>
                        </a>
                    </li>
                </>
            )}

            {roleId === 4 && (
                <>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/moderator/coments"
                        >
                            <i className="fas fa-comments"></i>
                            <span>Отзывы</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/moderator/items"
                        >
                            <i className="fa-solid fa-shoe-prints"></i>
                            <span>Карточки</span>
                        </a>
                    </li>
                </>
            )}

            <hr className="sidebar-divider" />

            {roleId === 5 && (
                <>
                    <div className="sidebar-heading">Прочее</div>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/category"
                        >
                            <i className="fas fa-sitemap"></i>
                            <span>Категории</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/brands"
                        >
                            <i className="fas fa-table"></i>
                            <span>Бренды</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/materials"
                        >
                            <i className="fas fa-cubes "></i>
                            <span>Материалы</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/setings"
                        >
                            <i className="fa-solid fa-warehouse"></i>
                            <span>Склады</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/worker/items"
                        >
                            <i className="fa-solid fa-shoe-prints"></i>
                            <span>Архив</span>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/workerpanel/admin/setings"
                        >
                            <i className="fas fa-cog"></i>
                            <span>Настройки</span>
                        </a>
                    </li> */}
                </>
            )}

            <div className="text-center d-none d-md-inline">
                <button
                    className="rounded-circle border-0"
                    id="sidebarToggle"
                ></button>
            </div>
        </ul>
    );
};

export default PanelLeft;
