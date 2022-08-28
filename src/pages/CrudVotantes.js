import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { VotanteService } from "../service/VotanteService";



const CrudVotante = () => {
    let emptyProduct = {
        id: null,   
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        celular: "",     
        institucion: "",
        grupo: "",
        isActive: "",
        sexo: "",
        codigo:"",
    };

    const [votantes, setvotantes] = useState(null);
    const [votantesDialog, setVotantesDialog] = useState(false);
    const [deleteVotanteDialog, setDeleteVotanteDialog] = useState(false);
    const [deleteVotantesDialog, setDeleteVotantesDialog] = useState(false);

    const [votante, setVotante] = useState(emptyProduct);  

    const [selectedCand, setSelectedCands] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const votanteService = new VotanteService();
        votanteService.getVotante().then((data) => setvotantes(data));
    }, []);

    

    const openNew = () => {
        setVotante(emptyProduct);
        setSubmitted(false);
        setVotantesDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setVotantesDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteVotanteDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteVotantesDialog(false);
    };



    const saveProduct = () => {
        setSubmitted(true);

        if (votante.nombre.trim()) {
            let _products = [...votantes];
            let _product = { ...votante };
            if (votante.id) {
                const index = findIndexById(votante.id);
                _products[index] = _product;
                const votanservice = new VotanteService();
                votanservice.putVotante(_product); 
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Updated",
                    life: 3000,
                });
            } else {

                const votantService=new VotanteService();
               votantService.postVotante(_product)
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

            setVotante(_products);
            setVotantesDialog(false);
            setVotante(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setvotantes({ ...product });
        setVotantesDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setVotante(product);
        setDeleteVotanteDialog(true);
    };
   

    const deleteProduct = () => {
        let _products = votantes.filter((val) => val.id !== votantes.id);
        setVotante(_products);
        setDeleteVotanteDialog(false);
        setVotante(emptyProduct);
        const  voService= new VotanteService();
        voService.deleteVotante(votantes.id);

        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < votantes.length; i++) {
            if (votantes[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const deleteSelectedProducts = () => {
        let _products = votantes.filter((val) => !selectedCand.includes(val));
        setDeleteVotanteDialog(_products);
        setDeleteVotanteDialog(false);
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
        let _product = { ...votantes };
        _product[`${nombre}`] = val;

        setVotante(_product);
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

    const idInstitucionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.institucion.nombre}
            </>
        );
    };


    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.nombre}
            </>
        );
    };



    const apellidoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">lastname</span>
                {rowData.apellido}
            </>
        );
    };


    const cedulaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">cedula</span>
                {rowData.cedula}
            </>
        );
    };

    const correoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">email</span>
                {rowData.correo}
            </>
        );
    };
    const celularBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">celular</span>
                {rowData.celular}
            </>
        );
    };

    const idGrupoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">group</span>
                {rowData.grupo.nombre}
            </>
        );
    };


    const idSexoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sex</span>
                {rowData.sexo.nombre}
            </>
        );
    };
    const codigoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Codigo</span>
                {rowData.codigo}
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
            <h5 className="m-0">Votante</h5>
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
                        value={votantes}
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
                        <Column field="nombre" header="Nombre" body={nombreBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="apellido" header="Apellido" body={apellidoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="cedula" header="Cedula" body={cedulaBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="correo" header="Correo" body={correoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="celular" header="Celular" body={celularBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="idGrupo" header="Grupo" body={idGrupoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="idInstitucion" header="Institucion" body={idInstitucionBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
               
                        <Column field="idSexo" header="Sexo" body={idSexoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="codigo" header="Codigo" body={codigoBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 
                   
                    
                    <Dialog visible={votantesDialog} style={{ width: "450px" }} header="Votante" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>                   

          
                    <div className="field">
                            <label htmlFor="name">Nombre </label>
                            <InputText
                                id="nombre"
                                value={votante.nombre}
                                onChange={(e) => onInputChange(e, "nombre")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.nombre
                                })}
                            />
                            {submitted && !votantes.nombre && <small className="p-invalid">El nombre es requerido.</small>}
                      
                                
    
                            <label htmlFor="name">Apellido </label>
                            <InputText
                                id="apellido"
                                value={votante.apellido}
                                onChange={(e) => onInputChange(e, "apellido")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.apellido
                                })}
                            />
                            {submitted && !votantes.apellido && <small className="p-invalid">El apellido es requerido.</small>}
               
                       
                                      
                     
                            <label htmlFor="name">cedula </label>
                            <InputText
                                id="cedula"
                                value={votante.cedula}
                                onChange={(e) => onInputChange(e, "cedula")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.cedula
                                })}
                            />
                            {submitted && !votantes.cedula && <small className="p-invalid">La cedula es requerida.</small>}
                   
                                  
                 
                            <label htmlFor="name">Correo </label>
                            <InputText
                                id="correo"
                                value={votante.correo}
                                onChange={(e) => onInputChange(e, "correo")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.correo
                                })}
                            />
                            {submitted && !votantes.correo && <small className="p-invalid">El correo es requerido.</small>}
                        
                       
                                
                      
                            <label htmlFor="name">Celular </label>
                            <InputText
                                id="celular"
                                value={votante.celular}
                                onChange={(e) => onInputChange(e, "celular")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.celular
                                })}
                            />
                            {submitted && !votantes.celular && <small className="p-invalid">El celular es requerido.</small>}
                   

             
                            <label htmlFor="name">Instituto </label>
                            <InputText
                                id="institucion"
                                value={votante.institucion}
                                onChange={(e) => onInputChange(e, "institucion")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.institucion
                                })}
                            />
                            {submitted && !votantes.institucion && <small className="p-invalid"></small>}
                  
                    
                            <label htmlFor="name">Grupo </label>
                            <InputText
                                id="grupo"
                                value={votante.grupo}
                                onChange={(e) => onInputChange(e, "grupo")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.grupo
                                })}
                            />
                            {submitted && !votantes.grupo && <small className="p-invalid"></small>}
                       
                       
                     
                            <label htmlFor="name">CODIGO </label>
                            <InputText
                                id="codigo"
                                value={votante.codigo}
                                onChange={(e) => onInputChange(e, "codigo")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.codigo
                                })}
                            />
                            {submitted && !votantes.codigo && <small className="p-invalid">El codigo es requerido.</small>}
                    

                   
                            <label htmlFor="name">Activo</label>
                            <InputText
                                id="isActive"
                                value={votante.isActive}
                                onChange={(e) => onInputChange(e, "isActive")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !votantes.isActive
                                })}
                            />
                            {submitted && !votantes.isActive && <small className="p-invalid">.....</small>}
                        </div>

                       
                    </Dialog>
                

                    <Dialog visible={deleteVotanteDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {votantes && (
                                <span>
                                    Are you sure you want to delete <b>{votantes.nombre}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteVotantesDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {votantes && <span>Are you sure you want to delete the selected products?</span>}
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

export default React.memo(CrudVotante, comparisonFn);
