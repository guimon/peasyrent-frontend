import React, {useContext} from 'react';
import {
  Button,
  Grid,
  TableContainer,
  Paper,
  Box,
  makeStyles, Link,
} from '@material-ui/core';
import {SingleLeaseContext} from "../../../../stores/SingleLeaseStore";
import {openSnackbar} from "../../../../components/Notifier";
import Uploader from "../../../../components/Uploader";
import StyledTableCell from "../../../../components/StyledTableCell";
import StyledTableRow from "../../../../components/StyledTableRow";
import StyledTableBody from '../../../../components/StyledTableBody'
import StyledTableHead from "../../../../components/StyledTableHead";
import StyledTable from "../../../../components/StyledTable";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: 16
  }
}));

const LeaseFiles = props => {
  const { lease, saveFile, deleteFile } = useContext(SingleLeaseContext);
  const classes = useStyles();
  const persistFile = (filename, initialFilename, setLoading) => {
    saveFile(lease.id, filename, initialFilename, openSnackbar, () => setLoading(false));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper} className={classes.marginTop}>
          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCell>File</StyledTableCell>
                <StyledTableCell/>
              </StyledTableRow>
            </StyledTableHead>
            <StyledTableBody>
            {lease && lease.files.map((file, i) => (
              <StyledTableRow key={`lease-file-${file.id}`}>
                <StyledTableCell>
                  <Link href={file.url} target={"_blank"}>
                    {file.description}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <Button
                      variant="outlined"
                      type="submit"
                      color="secondary"
                      size="small"
                      name={`delete-renter-${file.id}`}
                      onClick={() => deleteFile(lease.id, file.id, openSnackbar)}
                    >
                      delete file
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
              ))}
              <StyledTableRow key={`new-lease-file`}>
                <StyledTableCell>
                  <Uploader displayStyle={"button"} label={"Upload file"} mimeType={"application/pdf"} callback={persistFile} />
                </StyledTableCell>
                <StyledTableCell>
                </StyledTableCell>
              </StyledTableRow>
            </StyledTableBody>
          </StyledTable>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

LeaseFiles.propTypes = {

};

export default LeaseFiles;
