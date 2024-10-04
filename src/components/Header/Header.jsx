import React , {act} from "react";
import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import Button from "../Button";

function Header(){
    //const authStatus = useSelector((state)=>state.auth.status)
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const naItems = [
        {
            name: 'Home',
            slug:"/",
            active: true
        },
        {
            name: "Login",
            slug:"/login",
            active: !authStatus,
        },
        {
            name:"Signup",
            slug:"/signup",
            active: !authStatus,
        },
        {
            name:"Logout",
            slug:"/logout",
            active: !authStatus,
        },
        {
            name :"All Posts",
            slug:"/all-posts",
            active: authStatus,
        },
        {
            name :"Add Post",
            slug:"/add-post",
            active: authStatus
        }
    ]
    return(
        <header className = 'py-3 shadow bg-blue-100'>
            <Container>
                <nav>
                    <div className="mr-4">
                        <Link to = '/'>
                        <Logo width = '70px'/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {naItems.map((item)=> item.active?(
                            <li key= {item.name}>
                              <button
                               onClick={()=>navigate(item.slug)}
                               className="inline-block px-6 py-2 duration-200 hover:bg-yellow-300 rounded-full text-red-500">
                                {item.name}
                              </button>  
                            </li>
                        ):null)}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}


export default Header;