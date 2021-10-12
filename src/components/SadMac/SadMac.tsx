import React, {useEffect} from 'react';
import {StyledBall, StyledEye, StyledEyes, StyledHappyMac, StyledSadMac} from "./SadMacStyles";

const SadMac = ({sad=true}) => {
    useEffect(() => {
        let balls = document.getElementsByClassName("ball");
        document.onmousemove = function (event) {
            const x = event.clientX * 100 / window.innerWidth + "%";
            const y = event.clientY * 100 / window.innerHeight + "%";

            for (let i = 0; i < 2; i++) {
                balls[i].style.left = x;
                balls[i].style.top = y;
                balls[i].style.transform = "translate(-" + x + ",-" + y + ")";
            }
        }
        return () => {
            document.onmousemove = () => {};
        }
    },[])

    const children = <StyledEyes>
                        <StyledEye>
                            <StyledBall className={'ball'}/>
                        </StyledEye>
                        <StyledEye>
                            <StyledBall className={'ball'}/>
                        </StyledEye>
                    </StyledEyes>
    return (
        sad ?
            <StyledSadMac>
                {children}
            </StyledSadMac>
            :
            <StyledHappyMac>
                {children}
            </StyledHappyMac>
    );
};

export default SadMac;