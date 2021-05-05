import {TableRow, withStyles} from "@material-ui/core";

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.alternate.main,
    },
  },
}))(TableRow);

export default StyledTableRow;
