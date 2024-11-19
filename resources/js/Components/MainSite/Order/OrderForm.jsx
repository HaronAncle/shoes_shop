import React, { useState } from "react";
import Radio from "@/Components/UIGlobal/Radio/Radio";
import Checkbox from "@/Components/UIGlobal/Checkbox/Checkbox";
import ButtonSpecial4 from "@/Components/UIGlobal/ButtonSpecial4/ButtonSpecial4";

const OrderForm = ({
    handleOrderSubmit,
    fieldErrors,
    formError,
    initialDateRef,
    setFormError,
    setModalContent,
    setShowModal,
    data,
    totalSum,
    totalSumWithDiscount,
    user,
}) => {
    const initialAddress =
        (user.city ? "город " + user.city : "") +
        (user.street ? " ул. " + user.street : "") +
        (user.house ? " дом " + user.house : "") +
        (user.apartment ? " кв. " + user.apartment : "").trim();

    const [isSelfPickup, setIsSelfPickup] = useState(false);
    const [address, setAddress] = useState(initialAddress);
    const [tempAddress, setTempAddress] = useState(initialAddress);

    const handleDeliveryChange = (event) => {
        const deliveryType = event.target.value;
        if (deliveryType === "selfdelivery") {
            setTempAddress(address);
            setAddress("Самовывоз с Притыцкого 10");
            setIsSelfPickup(true);
        } else {
            if (isSelfPickup) {
                setAddress(tempAddress);
            }
            setIsSelfPickup(false);
        }
    };

    return (
        <form className="orderblock__oreder-info" onSubmit={handleOrderSubmit}>
            <div className="orderblock__block">
                <div className="orderblock__subtitle">Способ оплаты:</div>
                <div className="orderblock__subblock">
                    <div className="orderblock__subblock-line-gor">
                        <Radio id="r1" name="payment" value="card" />
                        <label htmlFor="r1">Оплата картой при получении</label>
                    </div>
                    <div className="orderblock__subblock-line-gor">
                        <Radio id="r2" name="payment" value="cash" />
                        <label htmlFor="r2">
                            Оплата наличными при получении
                        </label>
                    </div>
                    {fieldErrors.payment && (
                        <div className="field-error">{fieldErrors.payment}</div>
                    )}
                </div>
            </div>
            <div className="orderblock__block">
                <div className="orderblock__subtitle">Личные данные:</div>
                <div className="orderblock__subblock">
                    <div className="orderblock__subblock-line-ver">
                        <label htmlFor="name">
                            <span className="atension">*</span>Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={user.name}
                        />
                        {fieldErrors.name && (
                            <div className="field-error">
                                {fieldErrors.name}
                            </div>
                        )}
                    </div>
                    <div className="orderblock__subblock-line-ver">
                        <label htmlFor="surname">
                            <span className="atension">*</span>Фамилия
                        </label>
                        <input
                            id="surname"
                            name="surname"
                            type="text"
                            defaultValue={user.surname}
                        />
                        {fieldErrors.surname && (
                            <div className="field-error">
                                {fieldErrors.surname}
                            </div>
                        )}
                    </div>
                    <div className="orderblock__subblock-line-ver">
                        <label htmlFor="otchestvo">Отчество</label>
                        <input
                            id="otchestvo"
                            name="otchestvo"
                            type="text"
                            defaultValue={user.otchestvo}
                        />
                        {fieldErrors.otchestvo && (
                            <div className="field-error">
                                {fieldErrors.otchestvo}
                            </div>
                        )}
                    </div>
                    <div className="orderblock__subblock-line-ver">
                        <label htmlFor="telephone">
                            <span className="atension">*</span>Телефон
                        </label>
                        <input
                            id="telephone"
                            name="telephone"
                            type="text"
                            defaultValue={user.phone}
                        />
                        {fieldErrors.telephone && (
                            <div className="field-error">
                                *{fieldErrors.telephone}
                            </div>
                        )}
                    </div>
                    <div
                        className={`orderblock__subblock-line-ver ${
                            isSelfPickup ? "hidden" : ""
                        }`}
                    >
                        <label htmlFor="address">
                            <span className="atension">*</span>Адрес
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly={isSelfPickup}
                        />
                        {fieldErrors.address && (
                            <div className="field-error">
                                *{fieldErrors.address}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="orderblock__block">
                <div className="orderblock__subtitle">Способ доставки:</div>
                <div className="orderblock__subblock">
                    <div className="orderblock__subblock-line-gor">
                        <Radio
                            id="rdelivery_11"
                            name="delivery"
                            value="ourdelivery"
                            onChange={handleDeliveryChange}
                        />
                        <label htmlFor="rdelivery_11">
                            Доставка курьером в пределах МКАД
                        </label>
                    </div>
                    <div className="orderblock__subblock-line-gor">
                        <Radio
                            id="rdelivery_12"
                            name="delivery"
                            value="selfdelivery"
                            onChange={handleDeliveryChange}
                        />
                        <label htmlFor="rdelivery_12">
                            Самовывоз с Притыцкого 10
                        </label>
                    </div>
                    <div className="orderblock__subblock-line-gor">
                        <Radio
                            id="rdelivery_13"
                            name="delivery"
                            value="postdelivery"
                            onChange={handleDeliveryChange}
                        />
                        <label htmlFor="rdelivery_13">
                            Почтовое отправление
                        </label>
                    </div>
                    {fieldErrors.delivery && (
                        <div className="field-error">
                            *{fieldErrors.delivery}
                        </div>
                    )}
                </div>
            </div>
            <div className="orderblock__block">
                <div className="orderblock__subblock">
                    <div className="orderblock__subblock-line-gor">
                        <Checkbox id="i55" name="agriment" value="true" />
                        <label htmlFor="i55">
                            Даю согласие на обработку персональных данных
                        </label>
                    </div>
                    {fieldErrors.agriment && (
                        <div className="field-error">
                            *{fieldErrors.agriment}
                        </div>
                    )}
                </div>
            </div>
            {formError && <div className="form-error">*{formError}</div>}
            <div className="orderblock__block">
                <ButtonSpecial4 type="submit">Оформить заказ</ButtonSpecial4>
            </div>
        </form>
    );
};

export default OrderForm;
