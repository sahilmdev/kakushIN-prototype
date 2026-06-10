import scamData from '../data/scam-keywords.json';

export function analyzeMessage(text) {
  // Strip spacing, punctuation, and zero-width characters
  const normalized = text.toLowerCase()
    .replace(/[\s\p{P}\u200B-\u200D\uFEFF]/gu, '');
  
  const findings = [];

  for (const pattern of scamData.patterns) {
    // Clean keyword targets to match normalized input
    const matched = pattern.keywords.find(kw => {
      const cleanKw = kw.toLowerCase().replace(/[\s\p{P}]/gu, '');
      return normalized.includes(cleanKw);
    });
    
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
