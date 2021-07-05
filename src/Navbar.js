/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Navbar(props) {
    const styles = css`
        .navbar{
            display: flex;
            justify-content: center;
        }
    `;

    return (
        <div css={styles}>
            <div className="navbar">
                <h1>What's the Weather?</h1>
            </div>
        </div>
        
    );
}