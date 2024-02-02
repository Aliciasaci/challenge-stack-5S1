import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CrudEtablissement = () => {
    let emptyEtablissement = {
        id: null,
        prestataire_id: null,
        nom: '',
        adresse: '',
        kbis: '',
        validation: false,
        jours_ouverture: '',
        horraires_ouverture: '',
    };

    const [etablissements, setEtablissements] = useState([]);
    const [deleteEtablissementDialog, setDeleteEtablissementDialog] = useState(false);
    const [etablissement, setEtablissement] = useState(emptyEtablissement);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const fetchEtablissements = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/etablissements');
                const data = response['data']['hydra:member'];
                setEtablissements(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchEtablissements();
    }, []);

    const hideDeleteEtablissementDialog = () => {
        setDeleteEtablissementDialog(false);
    };


    const confirmDeleteEtablissement = (etablissement) => {
        setEtablissement(etablissement);
        setDeleteEtablissementDialog(true);
    };

    const deleteEtablissement = async (etablissement) => {
        const response = axios.delete(`http://localhost:8000/api/etablissements/${etablissement.id}`);
        let _etablissements = etablissements.filter((val) => val.id !== etablissement.id);
        setEtablissements(_etablissements);
        setDeleteEtablissementDialog(false);
        setEtablissement(emptyEtablissement);
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Etablissement supprimé', life: 3000 });
    };

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

    const idPrestataireBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Prestataire</span>
                {rowData.prestataire_id}
            </>
        );
    };


    const nomBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nom</span>
                {rowData.nom}
            </>
        );
    };

    const adresseBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Adresse</span>
                {rowData.adresse}
            </>
        );
    };

    const validationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Validation</span>
                {rowData.validation}
            </>
        );
    };

    const joursBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Jours ouverture</span>
                {rowData.jours_ouverture}
            </>
        );
    };

    const horrairesBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Horraires</span>
                {rowData.horraires_ouverture}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteEtablissement(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion etablissements</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );

    const deleteEtablissementDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteEtablissementDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={() => deleteEtablissement(etablissement)} />
        </>
    );
    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={etablissements}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Afficher de {first} à {last} sur {totalRecords} utilisateurs"
                        globalFilter={globalFilter}
                        emptyMessage="Aucun etablissement trouvé."
                        header={header}
                    >
                        <Column field="id" header="ID" sortable body={idBodyTemplate}></Column>
                        <Column field="prestataire_id" header="Prestataire" sortable body={idPrestataireBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="nom" header="Nom" sortable body={nomBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="adresse" header="Adresse" sortable body={adresseBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="validation" header="Validation" sortable body={validationBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="jours_ouverture" header="Jours ouverture" sortable body={joursBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="horraires_ouverture" header="Horraires ouverture" sortable body={horrairesBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={deleteEtablissementDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEtablissementDialogFooter} onHide={hideDeleteEtablissementDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {etablissement && (
                                <span>
                                    Etes vous sûr de vouloir supprimer <b>{etablissement.nom}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CrudEtablissement;
