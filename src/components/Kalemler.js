import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, IconButton, Typography, Box, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import apiUrl from './Config';


function Kalemler() {

    const [kalemler, setKalemler] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modalTitle, setModalTitle] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [giderType, setGiderType] = useState(0);
    const [formMethod, setFormMethod] = useState('POST');
    const [formUrl, setFormUrl] = useState('');
    const [detailId, setDetailId] = useState('');

    const [openBackDrop, setOpenBackDrop] = useState(false);
    const handleBackDropClose = () => {
        setOpenBackDrop(false);
    };
    const handleBackDropOpen = () => {
        setOpenBackDrop(true);
    };

    const [openAlert, setOpenAlert] = useState(false);

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const CreateClick = () => {
        setName('');
        setDescription('');
        setType('');
        setGiderType(0);
        setModalTitle("Yeni Kayıt");
        handleOpen();
        setFormMethod("POST");
        setFormUrl(apiUrl + 'Kalemler');
    }

    const editClick = async(id) => {
        await detailKalemler(id);
        setModalTitle("Kayıt Düzenle");
        handleOpen();
        setFormMethod("PUT");
        setFormUrl(apiUrl + 'Kalemler/' + id);
    };

    const detailKalemler = async (id) => {
        try {
            const response = await fetch(apiUrl + 'Kalemler/' + id);
            const data = await response.json();
            setName(data.name);
            setDescription(data.description);
            setType(data.type);
            setGiderType(data.giderType);
        } catch (error) {
            console.error('Response Error:', error);
        }
    };

    const deleteClick = (id) => {
        handleOpenAlert();
        setDetailId(id);
    }

    const alertDeleteClick = () => {
        deleteKalemler(detailId);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        getKalemler();
    }, []);

    const getKalemler = async () => {
        try {
            handleBackDropOpen();
            const response = await fetch(apiUrl + 'Kalemler');
            const data = await response.json();
            setKalemler(data);
            handleBackDropClose();
        } catch (error) {
            console.error('Response Error:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Adı', width: 200 },
        { field: 'description', headerName: 'Açıklama', width: 250 },
        { field: 'type', headerName: 'Tür', width: 90 },
        { field: 'giderType', headerName: 'Gider Türü', width: 90 },
        { field: 'tarih', headerName: 'Tarih', width: 120 },
        {
            field: 'actions',
            headerName: 'İşlemler',
            width: 180,
            renderCell: (params) => (
                <div>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="primary" size="small" onClick={() => editClick(params.row.id)}>
                            Düzenle
                        </Button>
                        <Button variant="outlined" color="primary" size="small" onClick={() => deleteClick(params.row.id)}>
                            Sil
                        </Button>
                    </Stack>
                </div>
            )
        }
    ];

    const rows = kalemler;

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Kalemler
                </Typography>
                <Button variant="contained" color="primary" size='small' onClick={CreateClick}>
                    Ekle
                </Button>
                <IconButton aria-label="export">
                    <GridToolbarExport />
                </IconButton>
            </GridToolbarContainer>
        );
    };

    const tableKalemler = () => {
        return (
            <div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        )
    }

    const ModalPage = () => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="name"
                                    label="Adı"
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    id="description"
                                    label="Açıklama"
                                    defaultValue={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <TextField
                                    id="type"
                                    select
                                    label="Türü"
                                    defaultValue={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <MenuItem key={0} value={0}>
                                        Gider
                                    </MenuItem>
                                    <MenuItem key={1} value={1}>
                                        Gelir
                                    </MenuItem>
                                </TextField>
                                <TextField
                                    id="giderType"
                                    select
                                    label="Gider Türü"
                                    defaultValue={giderType}
                                    onChange={(e) => setGiderType(e.target.value)}
                                >
                                    <MenuItem key={0} value={0}>
                                        Fatura
                                    </MenuItem>
                                    <MenuItem key={1} value={1}>
                                        Kredi Kartı
                                    </MenuItem>
                                    <MenuItem key={2} value={2}>
                                        Diğer
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" size="small" color="secondary" onClick={handleClose}>İptal</Button>
                                    <Button variant="contained" size="small" onClick={handleSubmit}>Kaydet</Button>
                                </Stack>
                            </div>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        )
    }

    const handleSubmit = async () => {
        console.log(useState);
        try {
            const response = await fetch(formUrl, {
                method: formMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, type, giderType, description }),
            });

            if (response.ok) {
                console.log('Veri başarıyla gönderildi');
                getKalemler();
                handleClose();
            } else {
                console.error('Veri gönderme hatası');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    const deleteKalemler = async (id) => {
        try {
            const response = await fetch(apiUrl + 'Kalemler/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Kalem başarıyla silindi');
                getKalemler();
                handleCloseAlert();
            } else {
                console.error('Kalem silinirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    }

    const BackDrop = () => {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
                onClick={handleBackDropClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    const AlertDialog = () => {
        return (
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Silme Onayı"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        İlgili kaydı silmek istediğinize emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert}>İptal</Button>
                    <Button onClick={alertDeleteClick} autoFocus>
                        Sil
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div>
            {tableKalemler()}
            {ModalPage()}
            {BackDrop()}
            {AlertDialog()}
        </div>
    )

}


export default Kalemler