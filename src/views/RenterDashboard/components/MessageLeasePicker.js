import React, {useContext, useState} from 'react';

import {useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";

import {Select, MenuItem, Typography, useMediaQuery, FormControl} from "@material-ui/core";
import WidthFixer from "../../../components/WidthFixer";
import {LeasesContext} from "../../../stores/LeasesStore";
import MessageContainer from "./MessageContainer";
import MessagesStore from "../../../stores/MessagesStore";
import FieldLabel from "../../../components/FieldLabel";

function MessageLeasePicker(props){
  const { leases } = useContext(LeasesContext);
  const [leaseId, setLeaseId] = useState('');

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const formatLeaseLabel = (lease) => {
    if (lease.is_renter) {
      return lease.property.name;
    } else {
      let reason = lease.requires_attention ? " ------ "+ lease.requires_attention_reason  : "";
      return lease.renters.map((renter) => renter.user.name).join(' / ') + " / " + lease.property.name + reason;
    }
  };

  return (
    <Grid container spacing={isMd ? 4 : 2}>
      <Grid item xs={12}>
        <Typography variant="h5" color="textPrimary">
          Tenant messages <WidthFixer/>
        </Typography>
      </Grid>
      {leases &&
        <Grid item xs={12}>
          {leases.length === 1 &&
            <MessagesStore lease_id={leases[0].id}>
              <MessageContainer propertyName={leases[0].property.name}/>
            </MessagesStore>
          }
          {leases.length > 1 &&
            <>
              <FieldLabel label={"Lease"}/>
              <FormControl variant="outlined" fullWidth>
                <Select
                  name="lease"
                  value={leaseId}
                  onChange={(e) => setLeaseId(e.target.value)}
                >
                  {leases.map((lease) => (
                    <MenuItem value={lease.id} key={`key-${lease.id}`}>{formatLeaseLabel(lease)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

             {leaseId &&
               <MessagesStore lease_id={leaseId}>
                 <MessageContainer/>
               </MessagesStore>
             }
            </>
          }
        </Grid>
      }
    </Grid>
  )
}

export default MessageLeasePicker;
