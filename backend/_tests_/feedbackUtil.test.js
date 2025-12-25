const { getFeedback } = require('../utils/feedbackUtil');

test('returns excellent for >= 8', () => {
  expect(getFeedback(8)).toBe('Excellent performance with strong control.');
  expect(getFeedback(9)).toBe('Excellent performance with strong control.');
});

test('returns good for 6-7.9', () => {
  expect(getFeedback(6)).toBe('Good performance with minor inaccuracies.');
  expect(getFeedback(7.5)).toBe('Good performance with minor inaccuracies.');
});

test('returns needs improvement for <6', () => {
  expect(getFeedback(5.9)).toBe('Needs improvement.');
});
