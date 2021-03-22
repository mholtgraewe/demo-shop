import Layout from '../components/Layout';
import {
  useTheme,
  useMediaQuery,
  Container,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import OrderSummary from '../components/checkout/OrderSummary';
import ShippingAddress from '../components/checkout/ShippingAddress';
import PaymentDetails from '../components/checkout/PaymentDetails';
import { NextSeo } from 'next-seo';

const steps = ['Order Summary', 'Shipping Address', 'Payment Details'];

const defaultAddress = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'DE',
  postcode: '',
  phone: '',
  email: '',
};

const scrollToTop = () => window.scrollTo(0, 0);

export default function Checkout() {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState(defaultAddress);


  const goToNextStep = () => {
    const nextStep = Math.min(activeStep + 1, steps.length - 1);
    setActiveStep(nextStep);
    scrollToTop();
  };

  const goToPrevStep = () => {
    const prevStep = Math.max(activeStep - 1, 0);
    setActiveStep(prevStep);
    scrollToTop();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <OrderSummary
            handleSubmit={goToNextStep}
          />
        );
      case 1:
        return (
          <ShippingAddress
            address={address}
            handleBack={goToPrevStep}
            handleSubmit={address => {
              setAddress(address);
              goToNextStep();
            }}
          />
        );
      case 2:
        return (
          <PaymentDetails
            address={address}
            handleBack={goToPrevStep}
          />
        );
    }
  };

  return (
    <Layout>
      <NextSeo title={`${process.env.NEXT_PUBLIC_APP_NAME} - Checkout`} />

      <Container maxWidth="sm" disableGutters={!isWideScreen}>
        <Box mt={isWideScreen ? 3 : 0}>
          <Paper>
            <Box py={3}>

              <Typography variant="h5" align="center" gutterBottom>
                Checkout
              </Typography>

              <Stepper
                activeStep={activeStep}
                orientation={isWideScreen ? 'horizontal' : 'vertical'}
                alternativeLabel={isWideScreen}
              >
                {steps.map(step => (
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box mx={isWideScreen ? 3 : 2}>
                {getStepContent(activeStep)}
              </Box>

            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}
