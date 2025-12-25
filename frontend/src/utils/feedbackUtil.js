export function getFeedback(score){
  if(score >= 8) return 'Excellent performance with strong control.';
  if(score >= 6) return 'Good performance with minor inaccuracies.';
  return 'Needs improvement.';
}
