import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonElement from "../elements/ButtonElement";
import ModalAddAsset from "../../pages/ModalAddAsset";
import { useEffect } from "react";
import { getUserMe, userLogout } from "../../features/user/asyncAction";
import { getAllAsset } from "../../features/asset/asyncAction";

export default function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userMe = useSelector((state) => state.user.userMe)

    useEffect(() => {
        const getData = () => {
            try {
                dispatch(getUserMe())
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [dispatch])

    const onHandleOpenModal = () => {
        document.getElementById('addAsset').showModal()
    }

    const onHandleLogout = () => {
        localStorage.getItem('access_token') && localStorage.removeItem('access_token')
        dispatch(userLogout())
        navigate('/login')
    }

    const handleOnFilter = (department) => {
        const params = {
            filter: department
        }
        dispatch(getAllAsset(params))
    }


    return (
        <div
            id="Main"
            className="bg-[#164427] w-full h-full flex justify-start items-start flex-col shadow-lg rounded-sm"
        >
            <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
                <p className="text-2xl leading-6 text-white">KPP Mining</p>
            </div>
            <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-white border-b space-y-3 pb-5 ">
                <Link to={'/'} className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-green-300  text-white rounded ">
                    <svg
                        className="fill-stroke "
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="text-base leading-4 ">Dashboard</p>
                </Link>

                {
                    userMe.role === "user" && (
                        <Link to={'/your-asset'} className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-green-300   rounded ">
                            <svg
                                className="fill-stroke"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <p className="text-base leading-4 ">Your Asset</p>
                        </Link>
                    )}

                {
                    userMe.role === "head" && (
                        <Link to={`/filter=${userMe.department}`} onClick={() => handleOnFilter(userMe.department)} className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-green-300 rounded ">
                            <svg
                                className="fill-stroke"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <p className="text-base leading-4 ">Your Department</p>
                        </Link>
                    )
                }




            </div>
            <div className="flex flex-col justify-start items-start px-6 border-gray-600 w-full  ">
                <button
                    onclick="showMenu1(true)"
                    className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  "
                >
                    <p className="text-sm leading-5  uppercase">User Actions</p>
                </button>
                <div
                    id="menu1"
                    className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 "
                >
                    {userMe?.role === 'user' && (
                        <ButtonElement handleClick={onHandleOpenModal} classname="flex justify-start items-center space-x-6 text-white focus:text-green-300  rounded px-3 py-2  w-full md:w-52">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-base leading-4  ">Add Asset</p>
                        </ButtonElement>
                    )}

                    <Link to={'https://drive.google.com/file/d/1GV3-7JIeVjCmHsYLA__bi7NK5ZO5z891/view?usp=sharing'} className="flex justify-start items-center space-x-6 text-white focus:text-green-300  rounded px-3 py-2  w-full md:w-52">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 4.5C4 5.88071 5.11929 7 6.5 7H20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 4.5V19.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 19.5C4 18.1193 5.11929 17 6.5 17H13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13 7H6.5C5.11929 7 4 5.88071 4 4.5V19.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="text-base leading-4">Panduan</p>
                    </Link>


                    <ButtonElement handleClick={onHandleLogout} classname="flex justify-start items-center space-x-6 text-white focus:text-green-300 rounded px-3 py-2  w-full md:w-52">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 21H12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 21V3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 4L19 8L10 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="text-base leading-4  ">Logout</p>
                    </ButtonElement>
                </div>
            </div>
            <ModalAddAsset />
        </div>
    )
}