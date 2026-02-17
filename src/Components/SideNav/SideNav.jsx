import React, { useEffect, useRef, useState } from 'react'
import './SideNav.css'
import ICONS from '../Constants/icons'
import { Link } from 'react-router'

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const btnRef = useRef(null)


    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen && 
                menuRef.current 
                && !menuRef.current.contains(event.target)
                &&
                btnRef.current &&
                !btnRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },
        [isOpen])

    return (
        <div className='nav-container'>
            <button className='btn-menu'
                ref={btnRef}
                onClick={toggleMenu}>
                <ICONS.Home/>
            </button>
            <nav className='nav-compressed'>
                <div className='nav-compressed_top'>
                    <Link to="">
                        <ICONS.Chat />
                    </Link>
                    <Link to="">
                        <ICONS.Bell />
                    </Link>
                    <Link to="">
                        <ICONS.Files />
                    </Link>
                    <Link to="">
                        <ICONS.Dots />
                    </Link>
                    <Link>
                        <ICONS.Settings/>
                    </Link>
                </div>
                <div className='nav-compressed_bottom'>

                    <Link to="">
                        <ICONS.Person />
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default SideNav