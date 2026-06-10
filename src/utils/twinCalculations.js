export function calculateProjections(monthlyAmount, riskLevel) {
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rates = {
    conservative: { pessimistic: 0.04, median: 0.055, optimistic: 0.07 },
    balanced: { pessimistic: 0.05, median: 0.075, optimistic: 0.10 },
    growth: { pessimistic: 0.06, median: 0.10, optimistic: 0.14 },
  };
  const r = rates[riskLevel];

  // Monthly compounding formula: A = P * (((1 + r/12)^(12*y) - 1) / (r/12)) * (1 + r/12)
  const calcMonthlyCompounding = (annualRate, yearsCount) => {
    const monthlyRate = annualRate / 12;
    const totalMonths = yearsCount * 12;
    return Math.round(
      monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
    );
  };

  const chartData = years.map((y) => {
    const pessimistic = calcMonthlyCompounding(r.pessimistic, y);
    const median = calcMonthlyCompounding(r.median, y);
    const optimistic = calcMonthlyCompounding(r.optimistic, y);
    const savings = calcMonthlyCompounding(0.035, y); // Savings account at 3.5% annual
    
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
