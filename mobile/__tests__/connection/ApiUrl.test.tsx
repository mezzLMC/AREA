/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ApiUrl from "../../src/connection/ApiUrl";
import * as LocalStorage from '../../src/LocalStorage';

jest.mock('src/LocalStorage', () => ({
    storeApiUrl: jest.fn(),
    getApiUrl: jest.fn(),
  }));

  describe('ApiUrl', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (LocalStorage.getApiUrl as jest.Mock).mockResolvedValue(null);
    });

    it('should open modal when settings icon is pressed', () => {
        const { getByTestId, queryByTestId } = render(<ApiUrl />);
        expect(queryByTestId('modal-container')).toBeNull();
        fireEvent.press(getByTestId('settings-icon'));
        expect(getByTestId('modal-container')).toBeTruthy();
      });

    it('should display the correct initial API URL in the input', async () => {
      (LocalStorage.getApiUrl as jest.Mock).mockResolvedValue('http://example.com/api');
      const { getByTestId } = render(<ApiUrl />);
      fireEvent.press(getByTestId('settings-icon'));
      await waitFor(() => {
        expect(getByTestId('api-url-input').props.value).toBe('http://example.com/api');
      });
    });

    it('should save the new API URL when save button is pressed', async () => {
      const { getByTestId } = render(<ApiUrl />);
      fireEvent.press(getByTestId('settings-icon'));
      fireEvent.changeText(getByTestId('api-url-input'), 'http://new-url.com/api');
      fireEvent.press(getByTestId('save-button'));
      await waitFor(() => {
        expect(LocalStorage.storeApiUrl).toHaveBeenCalledWith('http://new-url.com/api');
      });
    });

    it('should close the modal when background is pressed', async () => {
      const { getByTestId, queryByTestId } = render(<ApiUrl />);
      fireEvent.press(getByTestId('settings-icon'));
      expect(getByTestId('modal-container')).toBeTruthy();
      fireEvent.press(getByTestId('modal-background'));
      await waitFor(() => {
        expect(queryByTestId('modal-container')).toBeNull();
      });
    });
  });