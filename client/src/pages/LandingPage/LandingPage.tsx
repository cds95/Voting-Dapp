import React, { useEffect } from "react";
import useWeb3 from "../../hooks/web3";

interface ILandingPageProps {

}

export const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
    const { web3 } = useWeb3();
    useEffect(() => {
        
    }, [])
    return (
        <div className="landing-page">

        </div>
    )
}