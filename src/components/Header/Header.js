import { useContext, useState } from "react";
import { Navbar, Nav, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';


import './Header.css'
import { connectMetamask } from "../../utils/connectMetamask";
function Header() {

    const [address, setAddress] = useState("")

    async function handleConnect(){
        
        const connection = await connectMetamask();

        if(connection){
            setAddress(connection.address);
        }


    }

    function betterAdress(addressStr){
        return addressStr.substr(0, 6) + "..." + addressStr.substr(addressStr.length - 4, addressStr.length);
    }

    return (
        <Navbar collapseOnSelect bg="light" variant="light">
            <div className="container">
                <Navbar.Brand>
                    <NavLink className="navbar-brand" to="/">social swap</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">                    
                    <Nav>
                        <NavLink className="nav-item" id="addButton" to="/add-product">
                            <OverlayTrigger key="bottom" placement="bottom"
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}>
                                        <strong>Add</strong>  a sell.
                                    </Tooltip>
                                }
                            > 
                                <BsFillPlusCircleFill />
                            </OverlayTrigger>
                        </NavLink>
                    </Nav>
                    <Button variant="light" id="wallet" onClick={handleConnect}>
                        {address == "" ? "Conecte sua carteira": betterAdress(address)}
                    </Button>
                    {/* {userData ?
                        (<Nav>
                            <NavLink className="nav-item" id="addButton" to="/add-product">
                                <OverlayTrigger key="bottom" placement="bottom"
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Add</strong>  a sell.
                                        </Tooltip>
                                    }
                                > 
                                    <BsFillPlusCircleFill />
                                </OverlayTrigger>
                            </NavLink>

                            <NavDropdown title={<img id="navImg" src={userData.avatar} alt="user-avatar"/>} drop="left" id="collasible-nav-dropdown">
                                <NavLink className="dropdown-item" to={`/profile/${userData._id}`}>
                                    <BsFillPersonFill />Profile
                                </NavLink>

                                {/* <NavDropdown.Divider /> 

                                <NavLink className="dropdown-item" to="/your-sells">
                                    <BsFillGridFill />Sells
                            </NavLink>
                                <NavLink className="dropdown-item" to="/messages">
                                    <BsFillEnvelopeFill />Messages
                            </NavLink>
                                {/* <NavLink className="dropdown-item" to="/wishlist">
                                    <BsFillHeartFill />Wishlist
                            </NavLink> 

                                <NavDropdown.Divider />

                                <NavLink className="dropdown-item" to="/auth/logout" onClick={() => {
                                    setUserData(null)
                                }}>
                                    <IoLogOut />Log out
                                </NavLink>
                            </NavDropdown>
                        </Nav>)
                        :
                        (<Nav>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink> 
                        </Nav>) 
                    } */}
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;