import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Badge } from 'primereact/badge';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const HistoriqueReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservations');
                const data = response['data']['hydra:member'];
                setReservations(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchReservations();
    }, []);

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </>
        );
    };

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    };

    const clientBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Client</span>
                {rowData.user.nom} 
            </>
        );
    };

    const prestationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prestation</span>
                {rowData.prestation.titre}
            </>
        );
    };

    const employeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Employé</span>
                {rowData.employe.nom}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Statut</span>
                <Badge value={rowData.status} severity={rowData.status === "Updated" ? "warning" : rowData.status === "Canceled" ? "danger" : "success"} />
            </>
        );
    };

    const creneauBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Créneau</span>
                {rowData.creneau}
            </>
        );
    };

    const dureeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Durée</span>
                {rowData.duree}
            </>
        );
    };

    const jourBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Jour</span>
                {rowData.jour}
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Historique réservations</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={reservations}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Afficher de {first} à {last} sur {totalRecords} reservations"
                        globalFilter={globalFilter}
                        emptyMessage="Aucunne reservation trouvée."
                        header={header}
                    >
                        <Column field="id" header="ID" sortable body={idBodyTemplate}></Column>
                        <Column field="client" header="Client" sortable body={clientBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="prestation" header="Prestation" sortable body={prestationBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="employe" header="Employé" sortable body={employeBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="status" header="Statut" sortable body={statusBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="crenau" header="Créneau" sortable body={creneauBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="duree" header="Durée" sortable body={dureeBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="jour" header="Jour" sortable body={jourBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default HistoriqueReservation;
