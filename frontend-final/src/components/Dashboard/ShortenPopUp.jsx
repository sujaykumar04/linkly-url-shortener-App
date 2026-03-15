import React from "react";
import { Modal } from "@mui/material";
import CreateNewShorten from "./CreateNewShorten";

const ShortenPopUp = ({ open, setOpen, refetch }) => (
  <Modal open={open} onClose={() => setOpen(false)}>
    <div className="flex items-center justify-center h-full w-full px-4">
      <div className="w-full max-w-md animate-slide-up">
        <CreateNewShorten setOpen={setOpen} refetch={refetch} />
      </div>
    </div>
  </Modal>
);

export default ShortenPopUp;
