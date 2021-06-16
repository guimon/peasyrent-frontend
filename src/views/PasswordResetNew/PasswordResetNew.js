import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from './components';
import { SectionHeader } from '../../components/molecules';
import { Section } from '../../components/organisms';

const useStyles = makeStyles(theme => ({
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const PasswordResetNew = () => {
  const classes = useStyles();

  return (
    <div>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Set your new password"
            subtitle="Enter your new password."
            titleProps={{
              variant: 'h3',
            }}
          />
          <Form />
        </div>
      </Section>
    </div>
  );
};

export default PasswordResetNew;
