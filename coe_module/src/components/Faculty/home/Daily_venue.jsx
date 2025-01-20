import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function DailyVenue() {
    const [visible, setVisible] = useState(false);
    const [session, setSession] = useState('Forenoon'); 
    const [venue, setVenue] = useState('WW201'); 

    return (
        <div className="card flex justify-content-center">
          <div className="mt-10 bg-slate-400 text-white p-4 border-r-2">
            <Button label="Venue" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Venue details" visible={visible} style={{ width: '20vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-col text-center gap-y-3 w-24">
                    <p className="flex">
                        <strong>Session:</strong> {session}
                    </p>
                    <p className="flex ">
                        <strong>Venue:</strong> {venue}
                    </p>
                </div>
            </Dialog>
        </div>
    );
}
