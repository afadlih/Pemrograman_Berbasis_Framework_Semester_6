import Link from "next/link";
import style from "./register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setError("");
        setIsLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const fullname = formData.get("fullname") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        if (!email) {
            setIsLoading(false);
            setError("Email is required");
            return
        }
        if (password.length < 6) {
            setIsLoading(false);
            setError("Password must be at least 6 characters");
            return;
        }
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                fullname,
                password,
                role,
            }),
        });
        // const result = await response.json();
        // console.log(result);
        console.log("Response status:", response.status);
        if (response.status === 200) {
            form.reset();
            // event.currentTarget.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(
                response.status === 400 ? "Email already exist" : "An error occured",
            );
        }
    };
    return (
        <div className={style.register}>
            {error && <p className={style.register__error}>{error}</p>} {/* Pesan ERROR */}
            <h1 className={style.register__title}>Halaman Register</h1>
            <div className={style.register__form}>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="email"
                            className={style.register__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={style.register__form__item__input}
                        />
                    </div>
                    {/* Full Name */}
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="fullname"
                            className={style.register__form__item__label}
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Full Name"
                            className={style.register__form__item__input}
                        />
                    </div>
                    {/* Password */}
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="password"
                            className={style.register__form__item__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={style.register__form__item__input}
                        />
                    </div>
                    {/* Role */}
                    <div className={style.register__form__item}>
                        <label
                            htmlFor="role"
                            className={style.register__form__item__label}
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className={style.register__form__item__input}
                            defaultValue="user"
                        >
                            <option value="user">User</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>
                    {/* Button Register */}
                    <button
                        type="submit"
                        className={style.register__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
                <br />
                <p className={style.register__form__item__text}>
                    Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
                </p>
            </div>
        </div>
    );
};

export default TampilanRegister;