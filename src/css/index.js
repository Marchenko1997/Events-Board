import { createGlobalStyle } from "styled-components";
import { device } from "./deviceSizes";

export const GlobalStyle = createGlobalStyle`


//ROOT
:root{
    --main-font-regular: "Work Sans", sans-serif;

    --font-size: 16px;
    --line-height: 1.25;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    --bg-clr:  #B2B1AF;
    --modal-bg-clr: #e0dfdf;
    --text-special-clr:#f3e61d;
    --text-grey-clr: #4D5055;
    --text-clr-black: #2F2E30;
    --text-clr-white: #fff;
    --text-clr-light-grey: #B2B1AF;
    --text-clr-second-light-grey: #A09F9D;
    --home-page-text-clr: #D9D8D7;

    --favorite-icon-red: #f85d52;

    --select-focus-within: #26282A;
    --btn-dark-hover-focus: #4D5055;
    --btn-yellow-hover-focus:#dacf1a;
    --hover-focus-trans: 250ms cubic-bezier(0.4, 0, 0.2, 1);

    --favorite-icon-clr:  #ff0000;
    --shadow:  rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

body{
    font-family: var(--main-font-regular);
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height);
    color: var(--text-clr-black);
    background-color: var(--bg-clr) ;
    
}

a, button, input {
  cursor: pointer;
}

.no-scroll {
  overflow: hidden;
}

.main-container {
  width: 100%;
  margin: 0 auto; 
  
  @media ${device.mobile} {
        max-width: 320px;
        }
  
  @media ${device.tablet} {
        max-width: 744px;
        
        }

    @media ${device.desktop} {        
        max-width: 1180px;       
      
      }
}
`;
