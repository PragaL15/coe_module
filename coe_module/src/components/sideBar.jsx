import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import 'primeicons/primeicons.css';

const Sidebar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [userId] = useState(1); // Simulating the userId state.

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleNavigation = (route, label) => {
        navigate(route);
        setActiveItem(label); // Set the clicked item as active.
        setIsMenuVisible(false); 
    };

    const allItems = [
        { label: 'Home', icon: 'pi pi-home', route: '/FacHome', allowedUserIds: [1] },
        { label: 'Paper Allocation', icon: 'pi pi-folder', route: '/DisplayAllocation', allowedUserIds: [1] },
        { label: 'Daily Updates', icon: 'pi pi-file-edit', route: '/DailyUpdates', allowedUserIds: [1] },
        { label: 'Request', icon: 'pi pi-chart-line', route: '/FacRequest', allowedUserIds: [1] },
        { label: 'Approval status', icon: 'pi pi-file-check', route: '/FacRequestStatus', allowedUserIds: [1] },
        { label: 'Logout', icon: 'pi pi-sign-out', route: '/logout', allowedUserIds: [1] },
    ];
    const items = allItems.filter(item => item.allowedUserIds.includes(Number(userId)));

    useEffect(() => {
        const currentRoute = location.pathname;
        const active = items.find(item => item.route === currentRoute);
        if (active) {
            setActiveItem(active.label); 
        }
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
                className={`fixed top-0 left-0 h-screen w-52 text-white py-3 bg-side-bar text-xxs z-50 transform transition-transform duration-300 ${
                    isMenuVisible ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                {/* Sidebar Heading */}
                <div className="text-center text-2xl font-bold text-white mb-6">
                    COE Module
                </div>

                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-3 p-3 text-lg rounded-lg cursor-pointer transition-colors focus:outline-none ${
                            activeItem === item.label
                                ? 'bg-white text-black border'
                                : 'hover:bg-transparent hover:text-side-blue mt-2 mb-2 text-white'
                        }`}
                        onClick={() => handleNavigation(item.route, item.label)}
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
