import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { ElectionList } from "../../components/ElectionList";
import { HostNewElectionModal } from "../../components/HostNewElectionModal";
import "./LandingPage.scss";

export const LandingPage: React.FunctionComponent<{}> = () => {
  const [isHostNewElectionModalOpen, setIsHostNewElectionModalOpen] = useState(
    false
  );
  const closeModal = () => setIsHostNewElectionModalOpen(false);
  const openModal = () => setIsHostNewElectionModalOpen(true);
  return (
    <div className="landing-page">
      <HostNewElectionModal
        isOpen={isHostNewElectionModalOpen}
        onClose={closeModal}
      />
      <div className="landing-page__header">
        <Typography variant="h2">Current Elections</Typography>
        <div className="landing-page__header-right">
          <Button onClick={openModal} variant="contained" color="primary">
            Host
          </Button>
        </div>
      </div>
      <ElectionList />
    </div>
  );
};
