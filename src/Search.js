/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

// source for search bar styling; https://codepen.io/huange/pen/rbqsD

export default function Search(props) {
    var [query, setQuery] = useState("");

    const styles = css`
        .searchContainer{
            display: flex;
            justify-content: center;
            margin-top: 2%;
        }

        .search {
            width: 40%;
            margin-left: 2%;
        }
        
        .searchTerm {
            width: 75%;
            border: 3px solid #023047;
            border-right: none;
            padding: 5px;
            height: 20px;
            border-radius: 5px 0 0 5px;
            outline: none;
            color: #023047;
            font-size: 20px;
        }
        
        .searchTerm:focus{
            color: #023047;
        }
        
        .searchButton {
            width: 20%;
            border: 1px solid #023047;
            background: #023047;
            text-align: center;
            color: #fff;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
            font-size: 25px;
            padding-bottom: 4px;
        }
    `;

    return (
        <div css={styles}>
            <div className="searchContainer">
                <div className="search">
                    <input placeholder="Search for a city" className="searchTerm" value={query} onChange={e => setQuery(e.target.value)}></input>
                    <button type="submit" className="searchButton" onClick={() => props.searchCity(query)}>Search</button>
                </div>
            </div>
            
        </div>
    );
}