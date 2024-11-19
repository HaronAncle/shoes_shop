import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    console.log(user);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            surname: user.surname,
            otchestvo: user.otchestvo || "",
            email: user.email,
            phone: user.phone,
            city: user.city,
            street: user.street,
            house: user.house,
            apartment: user.apartment || "",
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Информация профиля
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Обновите информацию профиля вашей учетной записи и адрес
                    электронной почты.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Имя" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="surname" value="Фамилия" />
                    <TextInput
                        id="surname"
                        className="mt-1 block w-full"
                        value={data.surname}
                        onChange={(e) => setData("surname", e.target.value)}
                        required
                        autoComplete="surname"
                    />
                    <InputError className="mt-2" message={errors.surname} />
                </div>

                <div>
                    <InputLabel htmlFor="otchestvo" value="Отчество" />
                    <TextInput
                        id="otchestvo"
                        className="mt-1 block w-full"
                        value={data.otchestvo}
                        onChange={(e) => setData("otchestvo", e.target.value)}
                        autoComplete="otchestvo"
                    />
                    <InputError className="mt-2" message={errors.otchestvo} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Телефон" />
                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                        autoComplete="phone"
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="Город" />
                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData("city", e.target.value)}
                        required
                        autoComplete="address-level2"
                    />
                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div>
                    <InputLabel htmlFor="street" value="Улица" />
                    <TextInput
                        id="street"
                        className="mt-1 block w-full"
                        value={data.street}
                        onChange={(e) => setData("street", e.target.value)}
                        required
                        autoComplete="address-line1"
                    />
                    <InputError className="mt-2" message={errors.street} />
                </div>

                <div>
                    <InputLabel htmlFor="house" value="Дом" />
                    <TextInput
                        id="house"
                        className="mt-1 block w-full"
                        value={data.house}
                        onChange={(e) => setData("house", e.target.value)}
                        required
                        autoComplete="address-line2"
                    />
                    <InputError className="mt-2" message={errors.house} />
                </div>

                <div>
                    <InputLabel htmlFor="apartment" value="Квартира" />
                    <TextInput
                        id="apartment"
                        className="mt-1 block w-full"
                        value={data.apartment}
                        onChange={(e) => setData("apartment", e.target.value)}
                        autoComplete="address-line2"
                    />
                    <InputError className="mt-2" message={errors.apartment} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Ваш адрес электронной почты не подтвержден.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Нажмите здесь, чтобы повторно отправить письмо с
                                подтверждением.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                На ваш адрес электронной почты была отправлена
                                новая ссылка для подтверждения.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Сохранить
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Сохранено...</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
