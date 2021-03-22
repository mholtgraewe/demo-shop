const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
});

export default function toCurrency(valueInCents) {
  return formatter.format(valueInCents/100);
}