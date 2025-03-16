/**
 * @jest-environment node
 */
 /* eslint-disable */

import '@testing-library/jest-native/extend-expect';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}
