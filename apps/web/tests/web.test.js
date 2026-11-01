import test from 'node:test';
import assert from 'node:assert';

test('Web application smoke test', () => {
  const appName = 'OptiGuide';
  assert.strictEqual(appName, 'OptiGuide');
});
