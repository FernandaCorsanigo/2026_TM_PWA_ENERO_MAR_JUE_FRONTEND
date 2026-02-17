import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import SideNav from '../../Components/SideNav/SideNav'
import HomeScreen from '../HomeScreen/HomeScreen'
import ChannelScreen from '../ChannelScreen/ChannelScreen'
import './GeneralScreen.css'
const GeneralScreen = () => {
    return (
        <div className='general-screen-container'>
            <div className='general-screen__search-bar'>
                <SearchBar/>
            </div>
            <div className='general-screen__home-screen'>
                <div>
                    <SideNav/>
                </div>
                <div>
                    <HomeScreen/>
                </div>
            </div>
            <div className='home-screen__messages-list-container'>
                <ChannelScreen/>
            </div>
        </div>
    )
}

export default GeneralScreen