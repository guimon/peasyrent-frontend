import React, {useContext} from 'react';

import {useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";

import {Select, MenuItem, useMediaQuery, FormControl} from "@material-ui/core";
import {LeasesContext} from "../../../stores/LeasesStore";
import FieldLabel from "../../../components/FieldLabel";
import moment from "moment";

function LeasePicker(props){
  const { lease, setLease } = props;
  const { leases } = useContext(LeasesContext);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const formatLeaseLabel = (l) => {
    let reason = l.requires_attention ? " ------ "+ l.requires_attention_reason  : "";
    let dates = ' (from ' + moment(l.start_date).format("MM/DD/YYYY") + ' to ' + moment(l.end_date).format("MM/DD/YYYY") + ') ';
    return l.property.name + dates + reason;
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        {leases.length > 1 &&
        <>
          <FieldLabel label={"Please select a lease"}/>
          <FormControl variant="outlined" fullWidth size="small">
            <Select
              name="lease"
              value={(lease && lease.id) || ''}
              onChange={(e) => setLease(leases.find((l) => l.id === e.target.value))}
            >
              {leases.map((l) => (
                <MenuItem value={l.id} key={`key-${l.id}`}>{formatLeaseLabel(l)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
        }
      </Grid>
    </Grid>
  )
}

export default LeasePicker;
