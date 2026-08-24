/*
 * SSR smoke test against the *built* artifact in dist/, not the source.
 * SPA + SSR parity is a hard requirement for Brikke, so this asserts the
 * package renders to a string in Node with no DOM present.
 */
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { Button, Dialog, Field, Select } from '../dist/index.js';

const REGIONS = [
  { value: 'eu-north-1', label: 'Europe (Stockholm)' },
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
];

const cases = {
  Button: h(Button, { variant: 'danger', size: 'lg' }, 'Delete project'),

  Field: h(
    Field.Root,
    null,
    h(Field.Label, null, 'Project name'),
    h(Field.Control, { placeholder: 'acme-web' }),
    h(Field.Description, null, 'Lowercase letters, numbers, and hyphens.'),
  ),

  // A closed dialog must render nothing but its trigger — no portal on the server.
  Dialog: h(
    Dialog.Root,
    null,
    h(Dialog.Trigger, null, 'Open'),
    h(
      Dialog.Portal,
      null,
      h(Dialog.Backdrop, null),
      h(Dialog.Viewport, null, h(Dialog.Popup, null, h(Dialog.Title, null, 'Hi'))),
    ),
  ),

  Select: h(
    Select.Root,
    { items: REGIONS, defaultValue: 'eu-north-1' },
    h(Select.Trigger, null, h(Select.Value, null)),
    h(
      Select.Portal,
      null,
      h(
        Select.Positioner,
        null,
        h(
          Select.Popup,
          null,
          h(
            Select.List,
            null,
            REGIONS.map((r) =>
              h(Select.Item, { key: r.value, value: r.value }, h(Select.ItemText, null, r.label)),
            ),
          ),
        ),
      ),
    ),
  ),
};

let failures = 0;
for (const [name, element] of Object.entries(cases)) {
  try {
    const html = renderToString(element);
    assert.ok(html.length > 0, `${name} rendered an empty string`);
    console.log(`  ok   ${name.padEnd(7)} ${html.length} bytes`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL ${name}: ${error.message}`);
  }
}

// The selected item's label must be in the server HTML, or the closed-state
// Select would flash empty before hydration.
const selectHtml = renderToString(cases.Select);
if (!selectHtml.includes('Europe (Stockholm)')) {
  failures += 1;
  console.error('  FAIL Select: selected value missing from SSR output');
} else {
  console.log('  ok   Select renders its selected value on the server');
}

console.log(failures === 0 ? '\nSSR smoke: PASS' : `\nSSR smoke: ${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
