import React from 'react';
import { Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import useApi from 'src/hooks/useApi';

interface GoogleAuthProps {
  showWebView: boolean;
  onClose: () => void;
  testID?: string;
  onNavigationStateChange?: (navState: any) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ showWebView, onClose, testID, onNavigationStateChange }) => {
  const api = useApi();
  const WebViewRef = React.useRef<WebView>(null);

  const params = new URLSearchParams({
    client_id: "733758596561-86kahmj0ljahhn0bkcc0t8fqrd6i6bod.apps.googleusercontent.com",
    redirect_uri: "http://localhost:8080/api/auth/google",
    scope: "openid profile email",
    response_type: "code",
  });
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return (
    <Modal visible={showWebView} animationType="slide" onRequestClose={onClose} testID={`${testID}-modal`}>
      {googleAuthUrl && (
        <WebView
          ref={WebViewRef}
          userAgent="random"
          source={{ uri: googleAuthUrl }}
          onNavigationStateChange={(navState) => {
            if (onNavigationStateChange) {
              onNavigationStateChange(navState);
            }
            const { url } = navState;
            if (url.startsWith("http://localhost:8080/api/auth/google")) {
              const { searchParams } = new URL(url);
              const code = searchParams.get("code");

              if (code) {
                WebViewRef.current?.stopLoading();
                api?.auth.loginWithGoogle(code).then(() => {
                });
                onClose();
              }
            }
          }}
          testID={`${testID}-webview`}
        />
      )}
      <Button title="Close" onPress={onClose} testID={`${testID}-close-button`} />
    </Modal>
  );
};

export default GoogleAuth;
