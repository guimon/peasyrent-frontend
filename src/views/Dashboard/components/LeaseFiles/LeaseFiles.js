import React, {useContext} from 'react';
import {
  Button, ListItem, Typography, List, Link,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {SingleLeaseContext} from "../../../../stores/SingleLeaseStore";
import {openSnackbar} from "../../../../components/Notifier";
import Uploader from "../../../../components/Uploader";

const LeaseFiles = props => {
  const { lease, saveFile, deleteFile } = useContext(SingleLeaseContext);
  const persistFile = (filename, initialFilename, setLoading) => {
    saveFile(lease.id, filename, initialFilename, openSnackbar, () => setLoading(false));
  };

  return (
    <List>
      {lease && lease.files.map((file, i) => (
          <ListItem key={`lease-file-${file.id}`}>
            <Typography
              variant="body2"
              color="primary"
            >
              <Link href={file.url} target="_blank" rel="noreferrer">
                {file.description}
              </Link>
            </Typography>
            <Button
              color={"secondary"}
              size="small"
              aria-label="delete"
              onClick={() => deleteFile(lease.id, file.id, openSnackbar)}
              title={"Delete file"}>
              <DeleteIcon fontSize="small" />
            </Button>
          </ListItem>
        ))}
      <Uploader displayStyle={"button"} label={"Upload file"} mimeType={"application/pdf"} callback={persistFile} />
    </List>
  );
};

LeaseFiles.propTypes = {

};

export default LeaseFiles;
