import {
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Typography,
} from '@material-ui/core';

export default function PaymentDetails({ /*address,*/ handleBack }) {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Box
        minHeight="20vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mb={6}
      >
        <Typography variant="h5" color="primary" align="center">
          This is a demo shop.<br />Payment is not implemented.
        </Typography>
      </Box>

      <Button
        variant="outlined"
        aria-label="Go back to shipping address"
        fullWidth={!isWideScreen}
        onClick={handleBack}
      >
        Back
      </Button>
    </>
  );
}