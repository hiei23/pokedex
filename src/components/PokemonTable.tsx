import React, { MouseEvent, useState, ChangeEvent, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import usePokemons from '../hooks/usePokemons'
import { PaginatedPokemonListItem } from '../types';
import PokemonCard from './PokemonCard';

const useHeaderStyles = makeStyles({
  header: {
    fontWeight: 'bold'
  },
});


interface TableHeaderProps {
  columns: string[]
}

const TableHeader: FunctionComponent<TableHeaderProps> = ({ columns }) => {
  const classes = useHeaderStyles()

  return (
    <TableRow id="pokeTableHeader">
      <TableCell />
      {
        columns.map((column, index) => (
          <TableCell
            key={`${column}`}
            className={classes.header}
            align={index === 0 ? "left" : "right"}
          >
            {column}
          </TableCell>
        ))
      }
    </TableRow>
  )
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface RowProps {
  row: PaginatedPokemonListItem
}

const Row: FunctionComponent<RowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow id={`${row.name}-row`} className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">
          {row.id}
        </TableCell>
        <TableCell
          align="right"
          style={{
            textTransform: 'capitalize'
          }}
        >
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={6} onClick={() => console.log('hi')}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <PokemonCard url={row.url} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const usePaginationActionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onChangePage
}: TablePaginationActionsProps) {
  const classes = usePaginationActionStyles();
  const theme = useTheme();

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const isTextRightToLeft = theme.direction === 'rtl'
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {isTextRightToLeft ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {isTextRightToLeft ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {isTextRightToLeft ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {isTextRightToLeft ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const CollapsibleTable: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { paginatedList } = usePokemons({ limit: rowsPerPage, offset: rowsPerPage * page })

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" id="pokemonTable">
        <TableHead>
          <TableHeader columns={['ID', 'Name']} />
        </TableHead>
        <TableBody id="pokeTableBody">
          {paginatedList.results.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 30, 50]}
              colSpan={3}
              count={paginatedList.count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable
