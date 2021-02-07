import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { IReduxState } from "../../redux/types";
import "./HostNewElectionModal.scss";
import { ElectionApi } from "../../services/election";

interface IHostNewElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IHostNewElectionReduxStateProps {
  networkId: number | null;
  currentUserAddress: string;
}

type THostNewElectionModalProps = IHostNewElectionModalProps &
  IHostNewElectionReduxStateProps;

export const HostNewElectionModalComp: React.FunctionComponent<THostNewElectionModalProps> = ({
  isOpen,
  onClose,
  networkId,
  currentUserAddress,
}) => {
  const [electionName, setElectionName] = useState("");
  const [electionEndTimeInEpochS, setElectionEndTimeInEpochS] = useState(0);
  const hostNewElection = () => {
    if (networkId) {
      ElectionApi.hostElection(
        networkId,
        currentUserAddress,
        electionName,
        electionEndTimeInEpochS
      );
      setElectionName("");
      setElectionEndTimeInEpochS(0);
      onClose();
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setElectionName(e.target.value);
  const handleOnCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const browser = date.getTime() / 1000;
    setElectionEndTimeInEpochS(browser);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="host-new-election-modal"
    >
      <DialogTitle>
        <Typography variant="h4">Host New Election</Typography>
      </DialogTitle>
      <DialogContent>
        <form className="host-new-election-modal__form">
          <TextField
            value={electionName}
            required={true}
            onChange={handleOnChange}
            label="Election Name"
            fullWidth={true}
            className="host-new-election-modal__field"
          />
          <TextField
            id="datetime-local"
            label="End Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            className="host-new-election-modal__field"
            onChange={handleOnCalendarChange}
            fullWidth={true}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={hostNewElection} variant="contained" color="primary">
          Host Election
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (
  state: IReduxState
): IHostNewElectionReduxStateProps => {
  return {
    networkId: state.web3.networkId,
    currentUserAddress: state.web3.accounts[0],
  };
};

export const HostNewElectionModal = connect(mapStateToProps)(
  HostNewElectionModalComp
);
