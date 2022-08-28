import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { CandidatoService } from "../service/CandidatoService";

const CrudCandidato = () => {
    let emptyProduct = {
        id: null,   
        votante: "",
        tipoCandidato: "",
        lista: "",
        procesoEleccion: "",
        imagen: "",
    };

    const [candidatos, setcandidatos] = useState(null);
    const [candidatosDialog, setCandidatosDialog] = useState(false);
    const [deleteCandidatoDialog, setDeleteCandidatoDialog] = useState(false);
    const [deleteCandidatosDialog, setDeleteCandidatosDialog] = useState(false);

    const [candidato, setCandidato] = useState(emptyProduct);  

    const [selectedCand, setSelectedCands] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const candService = new CandidatoService();
        candService.getCandidato().then((data) => setcandidatos(data));
    }, []);

    

    const openNew = () => {
        setCandidato(emptyProduct);
        setSubmitted(false);
        setCandidatosDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCandidatosDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteCandidatoDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteCandidatosDialog(false);
    };



    const saveProduct = () => {
        setSubmitted(true);

        if (candidato.nombre.trim()) {
            let _products = [...candidatos];
            let _product = { ...candidato };
            if (candidato.id) {
                const index = findIndexById(candidato.id);
                _products[index] = _product;
                const candservice = new CandidatoService();
                candservice.putCandidato(_product); 
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Updated",
                    life: 3000,
                });
            } else {

                const candService=new CandidatoService();
               candService.postCandidato(_product)
             /*   _product.id = createId();
                  _product.image = "product-placeholder.svg";
                _products.push(_product);*/
                
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Created",
                    life: 3000,
                });
            }

            setCandidato(_products);
            setCandidatosDialog(false);
            setCandidato(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setcandidatos({ ...product });
        setCandidatosDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setCandidato(product);
        setDeleteCandidatoDialog(true);
    };
   

    const deleteProduct = () => {
        let _products = candidatos.filter((val) => val.id !== candidatos.id);
        setCandidato(_products);
        setDeleteCandidatoDialog(false);
        setCandidato(emptyProduct);
        const  candService= new CandidatoService();
        candService.deleteVotante(candidatos.id);

        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const deleteSelectedProducts = () => {
        let _products = candidatos.filter((val) => !selectedCand.includes(val));
        setDeleteCandidatoDialog(_products);
        setDeleteCandidatoDialog(false);
        setSelectedCands(null);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Products Deleted",
            life: 3000,
        });
    };

    const onInputChange = (e, nombre) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...candidatos };
        _product[`${nombre}`] = val;

        setCandidato(_product);
    };

  

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    };

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.institucion.nombre}
            </>
        );
    };


    const votanteBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Votante</span>
                {rowData.votante.nombre}
            </>
        );
    };



    const tipoCandidatoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo Candidato</span>
                {rowData.tipoCandidato.nombre}
            </>
        );
    };


    const listaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Lista</span>
                {rowData.lista.nombre}
            </>
        );
    };

    const procesoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Proceso</span>
                {rowData.procesoEleccion.nombre}
            </>
        );
    };


    const imagenBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Imagen</span>
                {rowData.nombre}
            </>
        );
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

                                                                                                                                                                                                                                                                                                                                                                                                                        
 

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Candidato</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={candidatos}
                        selection={selectedCand}
                        onSelectionChange={(e) => setSelectedCands(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
                        <Column field="id" header="Id" body={codeBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="votante" header="Votante" body={votanteBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="tipoCandidato" header="Apellido" body={tipoCandidatoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="lista" header="Lista" body={listaBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="procesoEleccion" header="ProcesoEleccion" body={procesoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="imagen" header="Imagen" body={imagenBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
    
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 
                   
                    
                    <Dialog visible={candidatosDialog} style={{ width: "450px" }} header="Candidato" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>                   

          
                    <div className="field">
                            <label htmlFor="name">Votante </label>
                            <InputText
                                id="votante"
                                value={candidato.votante}
                                onChange={(e) => onInputChange(e, "nombre")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !candidatos.votante
                                })}
                            />
                            {submitted && !candidatos.votante && <small className="p-invalid">El votante es requerido.</small>}
                      
                                
    
                            <label htmlFor="name">lista </label>
                            <InputText
                                id="lista"
                                value={candidato.lista}
                                onChange={(e) => onInputChange(e, "lista")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !candidatos.lista
                                })}
                            />
                            {submitted && !candidatos.lista && <small className="p-invalid">La lista es requerido.</small>}
               
                       
                                      
                     
                            <label htmlFor="name">Proceso  </label>
                            <InputText
                                id="procesoEleccion"
                                value={candidato.cedula}
                                onChange={(e) => onInputChange(e, "procesoEleccion")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !candidatos.procesoEleccion
                                })}
                            />
                            {submitted && !candidatos.procesoEleccion && <small className="p-invalid">Es requerida.</small>}
                   
                                  
                 
                            <label htmlFor="name">Imagen </label>
                            <InputText
                                id="imagen"
                                value={candidato.imagen}
                                onChange={(e) => onInputChange(e, "imagen")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !candidatos.imagen
                                })}
                            />
                            {submitted && !candidatos.imagen && <small className="p-invalid">Es requerido.</small>}
                        
                       
                                
                      
                            <label htmlFor="name">Celular </label>
                            <InputText
                                id="celular"
                                value={candidato.celular}
                                onChange={(e) => onInputChange(e, "celular")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !candidatos.celular
                                })}
                            />
                            {submitted && !candidatos.celular && <small className="p-invalid">El celular es requerido.</small>}
                   

                
                        </div>

                       
                    </Dialog>
                

                    <Dialog visible={deleteCandidatoDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {candidatos && (
                                <span>
                                    Are you sure you want to delete <b>{candidatos.nombre}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCandidatosDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {candidatos && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(CrudCandidato, comparisonFn);
