import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { usePage } from "@inertiajs/react";
import ButtonSpecial2 from "@/Components/UIGlobal/ButtonSpecial2/ButtonSpecial2";
import "./DashboardMyInfo.css";

export default function DashboardMyInfo({ className = "" }) {
    const user = usePage().props.auth.user;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Информация профиля
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Просмотр информации профиля вашей учетной записи.
                </p>
            </header>

            <div className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Имя" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={user.name}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="surname" value="Фамилия" />
                    <TextInput
                        id="surname"
                        className="mt-1 block w-full"
                        value={user.surname}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="otchestvo" value="Отчество" />
                    <TextInput
                        id="otchestvo"
                        className="mt-1 block w-full"
                        value={user.otchestvo || ""}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={user.email}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Телефон" />
                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={user.phone}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="Город" />
                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={user.city}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="street" value="Улица" />
                    <TextInput
                        id="street"
                        className="mt-1 block w-full"
                        value={user.street}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="house" value="Дом" />
                    <TextInput
                        id="house"
                        className="mt-1 block w-full"
                        value={user.house}
                        readOnly
                    />
                </div>

                <div>
                    <InputLabel htmlFor="apartment" value="Квартира" />
                    <TextInput
                        id="apartment"
                        className="mt-1 block w-full"
                        value={user.apartment || ""}
                        readOnly
                    />
                </div>
                <div className="profile__buttonblock">
                    <ButtonSpecial2 href="/profile">
                        Изменить информацию
                    </ButtonSpecial2>
                </div>
            </div>
        </section>
    );
}
