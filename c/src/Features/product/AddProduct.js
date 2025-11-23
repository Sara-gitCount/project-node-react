import { useAddProductMutation } from "./productApiSlice"
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';


const AddPrpduct = () => {

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const navigate = useNavigate()
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [addProduct, { isSuccess }] = useAddProductMutation()

    const handleSave = (e) => {    
        e.preventDefault();
        addProduct({ name: value1, price: value2, company: value3 ,image: value4})
        navigate("/Mproducts")
    }

    const handleCancele = () => {
        navigate("/Mproducts")
    }

    return (
        <>
            <h1>Add product</h1>
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputText id="name" value={value1} onChange={(e) => setValue1(e.target.value)} />
                    <label htmlFor="name">Name</label>
                </FloatLabel>
            </div>
            <br></br>
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputText id="price" value={value2} onChange={(e) => setValue2(e.target.value)} />
                    <label htmlFor="price">Price</label>
                </FloatLabel>
            </div>
            <br></br>
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputText id="company" value={value3} onChange={(e) => setValue3(e.target.value)} />
                    <label htmlFor="company">Company</label>
                </FloatLabel>
            </div>
            <br></br>
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputText id="image" value={value4} onChange={(e) => setValue4(e.target.value)} />
                    <label htmlFor="image">Image</label>
                </FloatLabel>
            </div>
            <br></br>
            <div>
                <Toast ref={toast}></Toast>

                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
            </div>
            <br></br>
            <div className="card flex justify-content-center">
                <ButtonGroup>
                    <Button onClick={(e) => handleSave(e)} label="Save" icon="pi pi-check" />
                    <Button onClick={() => handleCancele()} label="Cancel" icon="pi pi-times" />
                </ButtonGroup>
            </div>
        </>
    )
}

export default AddPrpduct