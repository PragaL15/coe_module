import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import 'primeicons/primeicons.css';

const Sidebar = ({ children }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [userId] = useState(1); // destructuring the userId into usable form

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleNavigation = (route) => {
        navigate(route);
        setIsMenuVisible(false); 
    };

    const allItems = [
        { label: 'Home', icon: 'pi pi-home', route: '/FacHome', allowedUserIds: [1] },
        { label: 'Request', icon: 'pi pi-file', route: '/FacRequest', allowedUserIds: [1] },
        { label: 'Approval status', icon: 'pi pi-file', route: '/FacApproval', allowedUserIds: [1] },
        { label: 'Logout', icon: 'pi pi-sign-out', route: '/logout', allowedUserIds: [1] },
    ];

    const items = allItems.filter(item => item.allowedUserIds.includes(Number(userId)));

    useEffect(() => {
        const currentRoute = location.pathname;
        const active = items.find(item => item.route === currentRoute);
        setActiveItem(active ? active.label : null);
    }, [location.pathname, items]);

    return (
        <>
     
            {isMenuVisible && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}

    
            <div className="md:hidden">
                <Button
                    icon="pi pi-bars"
                    className="p-button-text absolute z-50 top-2 left-2"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                />
            </div>

        
            <div
                className={`fixed top-0 left-0 h-screen w-52 p-4 bg-side-bar z-50 transform transition-transform duration-300 ${
                    isMenuVisible ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
{/* 
                <h2 className="text-black text-2xl font-medium text-center pb-4">COE Module</h2> */}
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-4 p-3 text-black text-lg rounded-lg cursor-pointer transition-colors focus:outline-none focus:bg-gray-200 ${
                            activeItem === item
                                ? 'bg-white text-side-blue border border-gray-200'
                                : 'hover:bg-gray-50 active:bg-gray-50 hover:text-side-blue mt-2 mb-2'
                        }`}
                        
                        onClick={() => {
                            setActiveItem(item.label);
                            handleNavigation(item.route);
                        }}
                    >
                        <span className={item.icon} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Sidebar;