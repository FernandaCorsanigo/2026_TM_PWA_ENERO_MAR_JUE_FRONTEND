import { useContext, useState } from "react";
import React from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import ICONS from "../Constants/icons";
import './SearchBar.css'

const SearchBar = () => {
    const { searchTerm, handleSearchTerm } = useContext(WorkspaceContext);

    return (
        <div className='search-bar-section'>
            <div className="search-bar-container">
                <ICONS.Search className='search-icon' />
                <input
                    type="text"
                    placeholder="Search [Workspace Name]"
                    className='search-bar'
                    value={searchTerm}
                    onChange={handleSearchTerm}
                />
            </div>
        </div>
    );
};

export default SearchBar