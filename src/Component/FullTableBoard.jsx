import React from 'react';
import {Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TablePagination} from "@mui/material";

const tabelHeader = [
    {
        id: '1',
        label: 'End Year',
        minWidth: 170,
        value:'endYear'
    },
    {
        id: '2',
        label: 'City Latitude',
        minWidth: 170,
        value:'cityLat'
    },
    {
        id: '3',
        label: 'City Longitude',
        minWidth: 170,
        value:'cityLang'
    }
    ,{
        id: '4',
        label: 'Intensity',
        minWidth: 170,
        value:'intensity'
    }
    ,{
        id: '5',
        label: 'Start Year',
        minWidth: 170,
        value:'startyear'
    }
    ,{
        id: '6',
        label: 'Impact',
        minWidth: 170,
        value: 'impact'
    }
    ,{
        id: '7',
        label: 'Relevance',
        minWidth: 170,
        value: 'relevance'
    }
    ,{
        id: '8',
        label: 'Likelihood',
        minWidth: 170,
        value: 'likelihood'
    }
    ,{
        id: '9',
        label: 'Sector',
        minWidth: 170,
        value:'sector'
    }
    ,{
        id: '10',
        label: 'Topic',
        minWidth: 170,
        value:'topic'
    }
    ,{
        id: '11',
        label: 'Insight',
        minWidth: 170,
        value:'insight'
    }
    ,{
        id: '12',
        label: 'Swot',
        minWidth: 170,
        value:'swot'
    }
    ,{
        id: '13',
        label: 'URL',
        minWidth: 170,
        value: 'url'
    }
    ,{
        id: '14',
        label: 'Region',
        minWidth: 170,
        value:'region'
    }
    ,{
        id: '15',
        label: 'Added',
        minWidth: 170,
        value:'added'
    }
    ,{
        id: '16',
        label: 'Published',
        minWidth: 170,
        value:'published'
    }
    ,{
        id: '17',
        label: 'City',
        minWidth: 170,
        value:'city'
    }
    ,{
        id: '18',
        label: 'Country',
        minWidth: 170,
        value:'country'
    }
    ,{
        id: '19',
        label: 'Pestle',
        minWidth: 170,
        value: 'peslt'
    }
    ,{
        id: '20',
        label: 'Source',
        minWidth: 170,
        value:'source'
    }
    ,{
        id: '21',
        label: 'Title',
        minWidth: 170,
        value: 'title'
    }
]
function FullTableBoard({datacharts}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleChangePage(event,newPage){
        setPage(newPage);
    };

    function handleChangeRowsPerPage(event){
        setRowsPerPage(+event.target.value);
        setPage(0)
    };
    return (
        <div>
            <Paper sx={{width:'100%'}}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tabelHeader.map((item)=>(
                                    <TableCell key={item.id} style={{minWidth:item.minWidth}}>
                                        {item.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (rowsPerPage > 0
                                        ? datacharts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : datacharts
                                )
                                .map((datachart)=>{
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={datachart.id}>
                                            {
                                                tabelHeader.map((item)=>{
                                                    const value=item.value
                                                    return (
                                                        <TableCell style={{minWidth:item.minWidth}} key={item.id}>
                                                            {datachart[value==null?'added':value]}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={datacharts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default FullTableBoard;