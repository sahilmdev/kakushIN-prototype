export function calculateProjections(monthlyAmount, riskLevel) {
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rates = {
    conservative: { pessimistic: 0.04, median: 0.055, optimistic: 0.07 },
    balanced: { pessimistic: 0.05, median: 0.075, optimistic: 0.10 },
    growth: { pessimistic: 0.06, median: 0.10, optimistic: 0.14 },
  };
  const r = rates[riskLevel];

  const calc = (rate) =>
    years.map((y) => ({
      year: y,
      value: Math.round(
        monthlyAmount * 12 * ((Math.pow(1 + rate, y) - 1) / rate) * (1 + rate)
      ),
    }));

  const chartData = years.map((y) => {
    const pessimistic = Math.round(monthlyAmount * 12 * ((Math.pow(1 + r.pessimistic, y) - 1) / r.pessimistic) * (1 + r.pessimistic));
    const median = Math.round(monthlyAmount * 12 * ((Math.pow(1 + r.median, y) - 1) / r.median) * (1 + r.median));
    const optimistic = Math.round(monthlyAmount * 12 * ((Math.pow(1 + r.optimistic, y) - 1) / r.optimistic) * (1 + r.optimistic));
    const savings = Math.round(monthlyAmount * 12 * y * 1.035);
    
    return {
      year: y,
      pessimistic,
      median,
      optimistic,
      savings
    };
  });

  const lastYear = chartData[chartData.length - 1];

  return {
    chartData,
    tenYearSavings: lastYear.savings,
    tenYearMedian: lastYear.median,
    difference: lastYear.median - lastYear.savings,
    probability: Math.round(
      45 + (riskLevel === 'growth' ? 20 : riskLevel === 'balanced' ? 28 : 35)
    ),
  };
}

export function formatINR(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatLakhs(value) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return formatINR(value);
}
