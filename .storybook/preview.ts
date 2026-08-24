import type { Preview } from '@storybook/react-vite';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
  globalTypes: {
    theme: {
      description: 'Brikke color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      // Tokens key off `[data-theme]`, and portalled popups mount on <body>,
      // so the attribute has to live on the document rather than a wrapper div.
      document.documentElement.dataset.theme = context.globals.theme as string;
      return Story();
    },
  ],
};

export default preview;
