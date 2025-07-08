const mockRates = {
  USD: { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150.55, 'AUD': 1.52, 'CAD': 1.36 },
  EUR: { 'USD': 1.08, 'GBP': 0.85, 'JPY': 163.21, 'AUD': 1.65, 'CAD': 1.47 },
  GBP: { 'USD': 1.26, 'EUR': 1.17, 'JPY': 191.01, 'AUD': 1.93, 'CAD': 1.72 },
};


export const fetchMockConversion = async (fromCurrency, toCurrency) => {
  console.log(`MOCK API: Fetching rate for ${fromCurrency} to ${toCurrency}`);

  return new Promise(resolve => {
    setTimeout(() => {
      const rate = mockRates[fromCurrency]?.[toCurrency];
      if (rate) {
        resolve({
          success: true,
          rate: rate,
        });
      } else {
        resolve({
          success: false,
          error: 'Currency pair not found in mock data.'
        });
      }
    }, 500);
  });
};