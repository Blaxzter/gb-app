import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import {useSelector} from 'react-redux';

import {RootState} from '../../store/store.ts';
import RNFS from 'react-native-fs';
import {makeSelectIndividualSongSetting} from '../../hooks/useSettings.ts';

// define props
interface ABCjsComponentProps {
  songId: string;
  abcNotation: string;
  qpm?: number;
  zoom?: number;
  transposeStep?: number;
}

export interface ABCjsComponentRef {
  toggleABC: () => void;
}

const ABCjsComponent = forwardRef<ABCjsComponentRef, ABCjsComponentProps>(
  ({songId, abcNotation, qpm, zoom, transposeStep}, ref) => {
    const theme = useThemeSelection();
    const webViewRef = useRef<WebView>(null);
    const [webviewHeight, setWebviewHeight] = useState<number>(100);

    const selectIndividualSongSetting = makeSelectIndividualSongSetting();
    const individualSongSetting = useSelector((state: RootState) =>
      selectIndividualSongSetting(state.settings, songId),
    );

    // check if tempo is defined in abcNotation
    transposeStep = transposeStep || 0;
    // if (abcNotation.includes('Q:') && !millisecondsPerMeasure) {
    //   millisecondsPerMeasure = 1000;
    // }
    zoom = zoom || 620;

    useImperativeHandle(ref, () => ({
      toggleABC() {
        webViewRef.current?.injectJavaScript(`
          window.startAll();
          true; // Note: ending with 'true' to avoid warning messages
        `);
      },
    }));

    useEffect(() => {
      // Reset webview height when abcNotation changes to recalculate the content height
      setWebviewHeight(100); // Reset to default or minimum height before content is loaded
    }, [abcNotation]);

    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
      // TODO IOS Adjust the path according to where you've stored your HTML file
      const filePath = 'abcjs_webview.html';

      // Read the content of the HTML file
      RNFS.readFileAssets(filePath, 'utf8')
        .then((content: React.SetStateAction<string>) => {
          const replacements: Record<string, any> = {
            '{{abc-js-file}}': 'file:///android_asset/abcjs-min.js', // TODO IOS Adjust for iOS
            '{{abc-css-file}}': 'file:///android_asset/abcjs-audio.css', // TODO IOS Adjust for iOS
            '--background-color: #ffffff;': `--background-color: ${theme.colors.surface};`,
            '--on-surface-color: #000000;': `--on-surface-color: ${theme.colors.surface};`,
            '--stroke-color: #000000;': `--stroke-color: ${theme.colors.onSurface};`,
            '--highlight-color: #ff0000;': `--highlight-color: ${theme.colors.primary};`,
            '"{{abc}}"': `'${abcNotation}'`,
            '"{{zoom}}"': `${zoom}`,
            '"{{qpm}}"': `${qpm || 120}`,
            '"{{program}}"': `${individualSongSetting.musicInstrumentId}`,
            '"{{visualTranspose}}"': `${transposeStep}`,
            '"{{midiTranspose}}"': `${transposeStep}`,
            '{{foregroundColor}}': `${theme.colors.onSurface}`,
          };

          let html = content.toString();
          Object.keys(replacements).forEach(key => {
            html = html.replace(new RegExp(key, 'g'), replacements[key]);
          });

          // Set the content to the state variable
          setHtmlContent(html);
        })
        .catch((err: any) => {
          console.error('Error reading HTML file:', err);
        });
    }, [
      abcNotation,
      qpm,
      individualSongSetting.musicInstrumentId,
      theme.colors.onSurface,
      theme.colors.primary,
      theme.colors.surface,
      transposeStep,
      zoom,
    ]);

    const handleWebViewMessage = (event: any) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'SET_HEIGHT') {
          setWebviewHeight(message.height); // Adjust webview height based on content height
        }
        if (message.type === 'LOG') {
          // console.log('Message from webview:', message.data);
        }
      } catch (error) {
        console.log('Failed to parse message from webview:', error);
      }
    };

    return (
      <View
        style={{height: webviewHeight, backgroundColor: theme.colors.surface}}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{html: htmlContent || '<p>Loading...</p>'}}
          javaScriptEnabled={true}
          onMessage={handleWebViewMessage}
          style={{...styles.container}}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ABCjsComponent;
