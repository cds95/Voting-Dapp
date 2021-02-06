import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ElectionList } from "../../components/ElectionList";
import useWeb3 from "../../hooks/web3";
import { IReduxState } from "../../redux/types";
import { ElectionApi } from "../../services/election";

interface ILandingPageProps {}

interface ILandingPageReduxStateProps {
  networkId: number | null;
  currentUserAddress: string;
}

type TLandingPageProps = ILandingPageProps & ILandingPageReduxStateProps;

export const LandingPageComp: React.FunctionComponent<TLandingPageProps> = ({
  networkId,
  currentUserAddress,
}) => {
  const { web3 } = useWeb3();
  const hostNewElection = () => {
    if (networkId) {
      ElectionApi.hostElection(
        networkId,
        currentUserAddress,
        "election one",
        1644186711
      );
    }
  };
  return (
    <div className="landing-page">
      <Button onClick={hostNewElection}>Host</Button>
      <ElectionList />
    </div>
  );
};

const mapStateToProps = (state: IReduxState): ILandingPageReduxStateProps => {
  return {
    networkId: state.web3.networkId,
    currentUserAddress: state.web3.accounts[0],
  };
};

export const LandingPage = connect(mapStateToProps)(LandingPageComp);
