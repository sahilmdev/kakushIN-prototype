import scamData from '../data/scam-keywords.json';

export function analyzeMessage(text) {
  const lower = text.toLowerCase();
  const findings = [];

  for (const pattern of scamData.patterns) {
    const matched = pattern.keywords.find((kw) => lower.includes(kw));
    if (matched) {
      findings.push({ ...pattern, matchedKeyword: matched });
    }
  }

  const severity = findings.some((f) => f.severity === 'high')
    ? 'danger'
    : findings.length > 0
      ? 'warning'
      : 'safe';

  return findings;
}
