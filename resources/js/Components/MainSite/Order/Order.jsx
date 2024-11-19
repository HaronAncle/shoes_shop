import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import LoadingInfo from "@/Components/UIGlobal/LoadingInfo/LoadingInfo";
import { usePage } from "@inertiajs/react";
import ButtonSpecial4 from "@/Components/UIGlobal/ButtonSpecial4/ButtonSpecial4";
import "./Order.css";
import axios from "axios";

const Order = () => {
    const user = usePage().props.auth.user;
    let isSimpleUser = false;
    let isViewed = false;
    if (user.role_id === 1) isSimpleUser = true;
    if (!isSimpleUser) {
        if (!isViewed)
            alert("Нельзя использовать рабочий аккаунт для личных целей!!!");
        isViewed = true;
        window.location.href = "/";
        return null;
    }
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [totalSum, setTotalSum] = useState(0);
    const [totalSumWithDiscount, setTotalSumWithDiscount] = useState(0);
    const [formError, setFormError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const initialDateRef = useRef(new Date().toISOString());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const basketItems = Cookies.get("jovattyshopbusket") || [];
                if (basketItems.length === 0) {
                    window.location.href = "/busket";
                }

                const parsedBasketItems = JSON.parse(basketItems);
                const basketItemsString = JSON.stringify(parsedBasketItems);
                const response = await fetch(
                    `/api/busket/getall?busket=${basketItemsString}`
                );
                if (!response.ok) {
                    throw new Error("Ошибка сети");
                }
                const result = await response.json();
                const resultWithCount = result.map((item) => {
                    const matchedItem = parsedBasketItems.find(
                        (bi) => bi.id === item.id && bi.size === item.size
                    );
                    const count = matchedItem?.count || 0;
                    const totalQuantity =
                        item.total_quantity || item.total_quntity || 0;
                    const actualCount =
                        count > totalQuantity ? totalQuantity : count;
                    const totalPrice = (
                        actualCount * item.actual_price
                    ).toFixed(2);
                    return {
                        ...item,
                        count: actualCount,
                        addedDate:
                            matchedItem?.addedDate || new Date().toISOString(),
                        updatedDate:
                            matchedItem?.updatedDate ||
                            new Date().toISOString(),
                        total_price: totalPrice,
                    };
                });

                setData(
                    resultWithCount.sort(
                        (a, b) => new Date(a.addedDate) - new Date(b.addedDate)
                    )
                );

                const totalSum = resultWithCount
                    .reduce((sum, item) => sum + item.price * item.count, 0)
                    .toFixed(2);
                const totalSumWithDiscount = resultWithCount
                    .reduce(
                        (sum, item) => sum + item.actual_price * item.count,
                        0
                    )
                    .toFixed(2);

                setTotalSum(totalSum);
                setTotalSumWithDiscount(totalSumWithDiscount);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOrderSubmit = async (e) => {
        const validateAndFormatPhone = (value) => {
            const cleanedValue = value.replace(/\s+/g, "");
            const phonePattern = /^(80|\+375| \+374|\+7)\d{2}\d{3}\d{4}$/;
            if (phonePattern.test(cleanedValue)) {
                return cleanedValue;
            }
            return null;
        };

        function removeNonAlphabeticCharacters(input) {
            const regex =
                /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\u0400-\u04FF\u0370-\u03FF-]+/g;
            const result = input.match(regex)?.join("") || "";
            return result;
        }
        e.preventDefault();
        setFormError(null);
        setFieldErrors({});
        const paymentMethod = e.target.payment.value;
        const deliveryMethod = e.target.delivery.value;
        const name = removeNonAlphabeticCharacters(e.target.name.value.trim());
        const surname = removeNonAlphabeticCharacters(
            e.target.surname.value.trim()
        );
        const otchestvo = removeNonAlphabeticCharacters(
            e.target.otchestvo.value.trim()
        );
        const telephone = validateAndFormatPhone(
            e.target.telephone.value.trim()
        );

        const address = e.target.address.value.trim();
        const consentGiven = e.target.agriment.checked;

        const newFieldErrors = {};

        if (!paymentMethod) newFieldErrors.payment = "Способ оплаты обязателен";
        if (!deliveryMethod)
            newFieldErrors.delivery = "Способ доставки обязателен";
        if (!name || name == "") newFieldErrors.name = "Имя обязательно";
        if (!surname || surname == "")
            newFieldErrors.surname = "Фамилия обязательна";
        if (!telephone || telephone == "")
            newFieldErrors.telephone = "Телефон обязателен.";
        if (!address || address == "")
            newFieldErrors.address = "Адрес обязателен";
        if (!consentGiven) newFieldErrors.agriment = "Согласие обязательно";

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setFormError("Все поля обязательны для заполнения");
            return;
        }

        const basketItems = Cookies.get("jovattyshopbusket") || "[]";
        const parsedBasketItems = JSON.parse(basketItems);

        const isDateValid = parsedBasketItems.every(
            (item) =>
                new Date(item.addedDate) <= new Date(initialDateRef.current) &&
                new Date(item.updatedDate) <= new Date(initialDateRef.current)
        );

        if (!isDateValid) {
            setModalContent(
                "Упс... Данные корзины обновились за время пребывания на странице оформления заказа. Требуется обновить страницу."
            );
            setShowModal(true);
            return;
        }

        const isCountMatching = data.every((item) => {
            const matchedItem = parsedBasketItems.find(
                (bi) => bi.id === item.id && bi.size === item.size
            );
            return matchedItem && matchedItem.count === item.count;
        });

        if (!isCountMatching) {
            setModalContent(
                "Что-то пошло не так. Пожалуйста, попробуйте позже."
            );
            setShowModal(true);
            return;
        }

        try {
            setLoading(true);

            const orderData = {
                paymentMethod,
                deliveryMethod,
                personalInfo: {
                    user,
                    name,
                    surname,
                    otchestvo,
                    telephone,
                    address,
                },
                items: data.map((item) => ({
                    id: item.id,
                    size: item.size,
                    count: item.count,
                    price: item.price,
                    actual_price: item.actual_price,
                })),
                totalSum,
                totalSumWithDiscount,
            };

            const response = await axios.post(
                "/api/order/makeorder",
                orderData
            );
            console.log(orderData);
            if (response.status === 200) {
                Cookies.remove("jovattyshopbusket");
                window.location.href = "/dashboard";
            } else {
                throw new Error("Ошибка при оформлении заказа.");
            }
        } catch (error) {
            setModalContent(
                "Ошибка при оформлении заказа. Пожалуйста, попробуйте снова."
            );
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                className="loading-container"
                style={{ height: "400px", width: "100%" }}
            >
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="error-container"
                style={{ height: "400px", width: "100%", color: "red" }}
            >
                Ошибка: {error}
            </div>
        );
    }

    return (
        <div className="orderblock">
            <div className="container">
                <div className="orderblock__div">
                    <div className="orderblock__up">
                        <OrderTable
                            data={data}
                            totalSum={totalSum}
                            totalSumWithDiscount={totalSumWithDiscount}
                        />
                        <OrderForm
                            handleOrderSubmit={handleOrderSubmit}
                            fieldErrors={fieldErrors}
                            formError={formError}
                            initialDateRef={initialDateRef}
                            setFormError={setFormError}
                            setModalContent={setModalContent}
                            setShowModal={setShowModal}
                            data={data}
                            totalSum={totalSum}
                            totalSumWithDiscount={totalSumWithDiscount}
                            user={user}
                        />
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="lg"
                >
                    <div className="modal-block">
                        <div className="modal-header">
                            <h5 className="modal-title">Ошибка</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setShowModal(false)}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{modalContent}</p>
                        </div>
                        <div className="modal-footer">
                            <ButtonSpecial4
                                onClick={() => window.location.reload()}
                            >
                                Обновить страницу
                            </ButtonSpecial4>
                        </div>
                    </div>
                </Modal>
            )}
            {loading && <LoadingInfo />}
        </div>
    );
};

export default Order;
