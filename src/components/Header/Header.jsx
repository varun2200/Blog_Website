import React from "react";
import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";

function Header(){
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const naItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus }
    ];

    return (
        <header className="py-3 shadow bg-gradient-to-r from-blue-400 to-blue-600">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto space-x-4">
                        {naItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-6 py-2 duration-200 bg-red-500 text-white rounded-full hover:bg-yellow-300 hover:text-gray-800 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
