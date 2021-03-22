import {
  makeStyles,
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import {
  useForm,
  useFormContext,
  FormProvider,
  Controller,
} from 'react-hook-form';
import { useState } from 'react';
import countries from './countries';

const useStyles = makeStyles(theme => ({
  prevButton: {
    order: 2,
  },
  nextButton: {
    order: 1,
  },
  [theme.breakpoints.up('sm')]: {
    smallPrint: {
      marginRight: 0,
    },
    prevButton: {
      order: 1,
    },
    nextButton: {
      order: 2,
    },
  },
}));

export default function ShippingAddress({ address, handleSubmit, handleBack }) {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [country, setCountry] = useState(address.country);
  const methods = useForm();

  const onSubmit = (data) => {
    handleSubmit({ ...data, country });
  };

  return (
    <Box mt={2}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <TextInput
              name="firstName"
              label="First name"
              value={address.firstName}
              required
            />
            <TextInput
              name="lastName"
              label="Last name"
              value={address.lastName}
              required
            />
            <TextInput
              name="addressLine1"
              label="Street address"
              value={address.addressLine1}
              required
            />
            <TextInput
              name="addressLine2"
              label="Address line 2"
              value={address.addressLine2}
            />
            <TextInput
              name="city"
              label="City"
              value={address.city}
              required
            />
            <TextInput
              name="state"
              label="State / Province"
              value={address.state}
              required
            />
            <TextInput
              name="postcode"
              label="ZIP / Postal code"
              value={address.postcode}
              required
            />

            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                >
                  {countries.map(({ code, name }) =>(
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <TextInput
              name="phone"
              label="Phone number"
              value={address.phone}
              required
            />
            <TextInput
              name="email"
              label="E-mail"
              value={address.email}
              validate={validateEmail}
              required
            />
          </Grid>

          <Box mt={4}>
            <Grid container justify="space-between" spacing={2}>
              <Grid
                item
                xs={12} sm={6}
                className={classes.prevButton}
              >
                <Button
                  variant="outlined"
                  aria-label="Go back to order summary"
                  fullWidth={!isWideScreen}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid>

              <Grid
                item
                xs={12} sm={6}
                align="right"
                className={classes.nextButton}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  aria-label="Continue checkout process"
                  fullWidth={!isWideScreen}
                  type="submit"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

function TextInput({ name, label, value, required, validate }) {
  const { control, errors } = useFormContext();

  const rules = {
    required: {
      value: required,
      message: 'This field is required',
    },
    validate,
  };

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        as={TextField}
        name={name}
        label={label}
        defaultValue={value}
        required={required}
        rules={rules}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        fullWidth
      />
    </Grid>
  );
}

function validateEmail(email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) {
    return 'Please enter a valid email address';
  }
  return true;
}