import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { userRegister } from "../features/user/asyncAction"
import { useState } from "react"
import ButtonElement from "../components/elements/ButtonElement"
import { Link } from "react-router-dom"

export default function RegisterPages() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        district: '',
        department: '',
        site: ''
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(userRegister(form))
            setForm({
                username: '',
                email: '',
                password: '',
                district: '',
                department: '',
                site: ''
            })
            setError('')
            navigate('/login')
        } catch (error) {
            setError(error)
        }
    };


    return (
        <>
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Join Us, Register!</h1>
                        <p className="mt-4 text-gray-500">
                            Create your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                        {error && <p className="text-red-500 text-sm">*{error}</p>}
                        <div>
                            <label className="sr-only">Username</label>

                            <div className="relative">
                                <input
                                    type="username"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">District</label>

                            <div className="relative">
                                <input
                                    type="district"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter district"
                                    name="district"
                                    value={form.district}
                                    onChange={handleChange}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <label className="sr-only">Department</label>
                        <div className="relative">
                            <select
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                            >
                                <option value="">Select department</option>
                                <option value="PLANT">PLANT</option>
                                <option value="SM">SM</option>
                                <option value="ENG">Eng</option>
                                <option value="PROD">Prod</option>
                                <option value="HCGS">HCGS</option>
                                <option value="FAT">FAT</option>
                                <option value="ICT">ICT</option>
                                <option value="SHE">SHE</option>
                            </select>
                        </div>


                        <label className="sr-only">Site</label>
                        <div className="relative">
                            <select
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                name="site"
                                value={form.site}
                                onChange={handleChange}
                            >
                                <option value="">Select Site</option>
                                <option value="TMRB">TMRB</option>
                                <option value="INDE">INDE</option>
                                <option value="RANT">RANT</option>
                                <option value="AGMR">AGMR</option>
                                <option value="SJRP">SJRP</option>
                                <option value="SPRL">SPRL</option>
                                <option value="BDMA">BDMA</option>
                                <option value="SPUT">SPUT</option>
                                <option value="MASS">MASS</option>
                                <option value="PELH">PELH</option>
                                <option value="AOC">AOC</option>
                            </select>
                        </div>


                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Have an account?
                                <Link to={'/login'} className="underline"> Sign In</Link>
                            </p>

                            <ButtonElement
                                type="submit"
                                classname="w-20 h-8 rounded-lg bg-[#164427] text-white hover:bg-green-700"
                            >
                                Register
                            </ButtonElement>
                        </div>
                    </form>
                </div>

                <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                    <img
                        alt=""
                        src="https://www.kppmining.com/assets/images/kpp-home-banner.png"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="bg-full h-full bg-black opacity-45"></div>
                </div>
            </section>
        </>
    )
}