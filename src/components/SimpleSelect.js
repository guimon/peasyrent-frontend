import React, {useRef, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const {value, setValue, children, label, id} = props;

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} >
        {label}
      </InputLabel>
      <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          labelWidth={labelWidth}
          id={id}
      >
        {children}
      </Select>
    </FormControl>
  );
}