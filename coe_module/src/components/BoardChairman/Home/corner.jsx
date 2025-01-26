import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function TopBottomCorner() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div className="card">
      <div className="flex flex-wrap">
        <Button
          label="Top contributors"
          icon="pi pi-arrow-down-left"
          onClick={() => show("top-left")}
          className="p-button-warning p-10 mt-10 bg-slate-600"
          style={{ minWidth: "10rem" }}
        />
        <Button
          label="No.pending papers"
          icon="pi pi-arrow-up-left"
          onClick={() => show("bottom-left")}
          className="p-button-success p-10 mt-8 bg-slate-600"
          style={{ minWidth: "10rem" }}
        />
      </div>

      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "20vw", height: "20vh" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">
          <h1>faculty:</h1>
        </p>
      </Dialog>
    </div>
  );
}
