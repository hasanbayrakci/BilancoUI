import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, IconButton, Typography, Box, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import apiUrl from './Config';



function GelirGider() {
    document.title = "Gelir Gider";
    const [gelirgider, setGelirGider] = useState([]);
    const [kalemTurleri, setKalemTurleri] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modalTitle, setModalTitle] = useState('');
    const [kalem, setKalem] = useState('');
    const [tutar, setTutar] = useState('');
    const [islemtarihi, setIslemTarihi] = useState(dayjs(new Date()));
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

    useEffect(() => {
        getGelirGider();
        getKalemTurleri();
    }, []);

    const getGelirGider = async () => {
        try {
            handleBackDropOpen();
            const response = await fetch(apiUrl + 'GelirGider');
            const data = await response.json();
            setGelirGider(data);
            handleBackDropClose();
        } catch (error) {
            console.error('Response Error:', error);
        }
    };

    const getKalemTurleri = async () => {
        try {
            handleBackDropOpen();
            const response = await fetch(apiUrl + 'Kalemler');
            const data = await response.json();
            setKalemTurleri(data);
            handleBackDropClose();
        } catch (error) {
            console.error('Response Error:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'kalem', headerName: 'Gider Kalemi', width: 250 },
        { field: 'tutar', headerName: 'Tutar', width: 250 },
        { field: 'islemTarihi', headerName: 'Gider Tarihi', width: 250 },
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

    const CreateClick = () => {
        setKalem('');
        setTutar('');
        setIslemTarihi(dayjs(new Date()));
        setModalTitle("Yeni Kayıt");
        handleOpen();
        setFormMethod("POST");
        setFormUrl(apiUrl + 'GelirGider');
    }

    const editClick = async (id) => {
        await detailGelirGider(id);
        setModalTitle("Kayıt Düzenle");
        handleOpen();
        setFormMethod("PUT");
        setFormUrl(apiUrl + 'GelirGider/' + id);
    };

    const deleteClick = (id) => {
        handleOpenAlert();
        setDetailId(id);
    }

    const alertDeleteClick = () => {
        deleteGelirGider(detailId);
    }

    const [openAlert, setOpenAlert] = useState(false);

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Gelir Gider
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

    const rows = gelirgider;

    const tableGelirGider = () => {
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

    const detailGelirGider = async (id) => {
        try {
            const response = await fetch(apiUrl + 'GelirGider/' + id);
            const data = await response.json();
            setKalem(data.kalemlerId);
            setTutar(data.tutar);
            setIslemTarihi(data.islemTarihi);
        } catch (error) {
            console.error('Response Error:', error);
        }
    };

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
                                    id="kalem"
                                    select
                                    label="Kalem"
                                    defaultValue={kalem}
                                    onChange={(e) => setKalem(e.target.value)}
                                >
                                    {kalemTurleri.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="tutar"
                                    label="Tutar"
                                    type='number'
                                    defaultValue={tutar}
                                    onChange={(e) => setTutar(e.target.value)}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                                    <DatePicker 
                                    label="Gider Tarihi" 
                                    format='DD.MM.YYYY' 
                                    defaultValue={dayjs(islemtarihi)}
                                    onChange={(e) => setIslemTarihi(e)}/>
                                </LocalizationProvider>
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
                body: JSON.stringify({ kalem, tutar, islemtarihi }),
            });

            if (response.ok) {
                console.log('Veri başarıyla gönderildi');
                getGelirGider();
                handleClose();
            } else {
                console.error('Veri gönderme hatası');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

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

    const deleteGelirGider = async (id) => {
        try {
            const response = await fetch(apiUrl + 'GelirGider/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('İşlem başarıyla silindi');
                getGelirGider();
                handleCloseAlert();
            } else {
                console.error('İşlem silinirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
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
            {tableGelirGider()}
            {ModalPage()}
            {BackDrop()}
            {AlertDialog()}
        </div>
    )
}


export default GelirGider