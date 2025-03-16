import React from 'react';
import { Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import useApi from 'src/hooks/useApi';
import useAccessToken from 'src/hooks/useAccessToken';
import { getApiUrl } from 'src/LocalStorage';

interface OAuthProps {
  showWebView: boolean;
  onClose: () => void;
  serviceId: string;
}

const Oauth: React.FC<OAuthProps> = ({ showWebView, onClose, serviceId }) => {
  const api = useApi();
  const accessToken = useAccessToken();
  const WebViewRef = React.useRef<WebView>(null);
  const [authUrl, setAuthUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (serviceId && api && accessToken) {
      (async () => {
        try {
          const url = await api.oauth.generate(serviceId, "http://10.74.252.167:8080/", accessToken);
          setAuthUrl(url);
        } catch (error) {
          onClose();
        }
      })();
    }
  }, [serviceId, api, accessToken]);

  return (
    <Modal visible={showWebView} animationType="slide" onRequestClose={onClose} testID="oauth-modal">
      {authUrl ? (
        <WebView
          ref={WebViewRef}
          userAgent="random"
          source={{ uri: authUrl }}
          onNavigationStateChange={(navState) => {
            if (navState.url.startsWith(`http://localhost:8080/api/auth/${serviceId}`)) {
                WebViewRef.current?.stopLoading();
                getApiUrl().then((apiUrl) => {
                    if (!apiUrl) {
                        return;
                    }
                    const { searchParams } = new URL(navState.url);
                    fetch(`${apiUrl}/auth/${serviceId}?${searchParams.toString()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "x-www-form-urlencoded",
                        },
                    })
                        .then((response) => response.json());
                    });
                onClose();
                }
          }}
          testID="oauth-webview"
        />
      ) : (
        <Button title="Loading..." disabled testID="loading-button" />
      )}
      <Button title="Close" onPress={onClose} testID="close-button" />
    </Modal>
  );
};

export default Oauth;
