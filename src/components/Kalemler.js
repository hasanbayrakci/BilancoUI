import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Kalemler() {

    const [kalemler, setKalemler] = useState([]);

    useEffect(() => {
        getKalemler();
    }, []);

    const getKalemler = async () => {
        try {
            const response = await fetch('https://localhost:7068/Kalemler');
            const data = await response.json();
            setKalemler(data);
        } catch (error) {
            console.error('Response Error:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Adı', width: 200 },
        { field: 'description', headerName: 'Açıklama', width: 250 },
        { field: 'type', headerName: 'Tür', width: 90 },
        { field: 'tarih', headerName: 'Tarih', width: 120 }
    ];

    const rows = kalemler;

    const tableKalemler = () => {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        )
    }

    return (
        <div>
            {tableKalemler()}
        </div>
    )
}

export default Kalemler