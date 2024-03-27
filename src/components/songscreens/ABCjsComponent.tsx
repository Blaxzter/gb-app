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

// define props
interface ABCjsComponentProps {
  abcNotation: string;
  millisecondsPerMeasure?: number;
  zoom?: number;
  transposeStep?: number;
}

export interface ABCjsComponentRef {
  playABC: () => void;
  pauseABC: () => void;
}

const ABCjsComponent = forwardRef<ABCjsComponentRef, ABCjsComponentProps>(
  ({abcNotation, millisecondsPerMeasure, zoom, transposeStep}, ref) => {
    const theme = useThemeSelection();
    const webViewRef = useRef<WebView>(null);
    const [webviewHeight, setWebviewHeight] = useState<number>(100);

    // check if tempo is defined in abcNotation
    transposeStep = transposeStep || 0;
    if (abcNotation.includes('Q:') && !millisecondsPerMeasure) {
      millisecondsPerMeasure = 2000;
    }
    millisecondsPerMeasure = 2000;
    zoom = zoom || 420;

    useImperativeHandle(ref, () => ({
      playABC() {
        webViewRef.current?.injectJavaScript(`
          window.synth.start();
          true; // Note: ending with 'true' to avoid warning messages
        `);
      },
      pauseABC() {
        webViewRef.current?.injectJavaScript(`
          window.synth.pause();
          true; // Note: ending with 'true' to avoid warning messages
        `);
      },
    }));

    useEffect(() => {
      // Reset webview height when abcNotation changes to recalculate the content height
      setWebviewHeight(100); // Reset to default or minimum height before content is loaded
    }, [abcNotation]);

    const htmlContent = `
      <html lang="html">
        <head> 
          <title id="title">ABCjs</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="file:///android_asset/abcjs-audio.css">
          <script src="file:///android_asset/abcjs-min.js"></script>
          <style>
            * {
                box-sizing: border-box;
            }
            body, html {
              display: block;
              position: absolute;
              margin: 0;
              padding: 0;
              width: 100%;
              overflow-x: hidden; /* Prevent horizontal scrolling */
            }
            #abc {
              margin-top: -40px;
              width: 100%; /* Use 100% of the container's width */
              box-sizing: border-box; /* Include padding and border in the element's width */
              /*border: 5px solid red;*/
              background-color: ${theme.colors.surface};
              color: ${theme.colors.onSurface};
              display: inline-block;
              position: relative;
              padding-bottom: 59.6378%;
              vertical-align: middle;
              overflow: hidden;
            }
            .abcjs-title {
               display: none; 
               height: 0;
            }
            .abcjs-cursor {
              stroke: ${theme.colors.onSurface}d
            }
            path {
              transition: opacity 1s;
            }
            .abcjs-note.hidden, .abcjs-beam-elem.hidden {
              opacity: 0;
            }
            .color {
              stroke: red;
              fill: red;
            }
          </style>
        </head>
        <body id="body">
            <div id="abc"></div>
            <div id="audio"></div>
          <div id="output" style="font-size: 30px; position: fixed; top: 0; right: 0; color: ${theme.colors.primary}"></div>
          <script type="text/javascript">
            console.log = (msg) => {
              window.ReactNativeWebView.postMessage(JSON.stringify({type: 'LOG', data: msg}));
            };
                      
            if (window.ABCJS) {
              console.log('abcjs loaded successfully');
              var renderOptions = {
                wrap: { minSpacing: 1, maxSpacing: 4, preferredMeasuresPerLine: 4 },
                staffwidth : ${zoom},
                responsive: "resize",
                germanAlphabet: true,
                textboxpadding: 0,
                foregroundColor: "${theme.colors.onSurface}",
                visualTranspose: ${transposeStep},
                add_classes: true,
                // tablature: [{
                //   instrument: "guitar",
                //   tuning: ["E,", "A,", "D", "G", "B", "e"],
                // }],
                // format: {
                //     tablabelfont: "Helvetica 16 box",
                //     tabnumberfont: "Times 12"
                // }
              }
              
              function beatCallback(beatNumber, totalBeats, totalTime, position, debugInfo) {
                console.log('beatCallback: ' + beatNumber + '/' + totalBeats + ' - ' + totalTime + ' - ' + position)
              }
              const timingOptions = {
                beatCallback: beatCallback,
                qpm: 60,
              };
              
              var visualObj = window.ABCJS.renderAbc("abc", "${abcNotation}", renderOptions);
              setTimeout(() => {
                const height = document.documentElement.scrollHeight || document.body.scrollHeight;
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'SET_HEIGHT', height: height}));
              })
              
              var myContext = new AudioContext();
              
              window.synth = new window.ABCJS.synth.CreateSynth();
              console.log('Synth created');
              
              window.synth.init({
                  audioContext: myContext,
                  visualObj: visualObj[0],
                  millisecondsPerMeasure: ${millisecondsPerMeasure},
                  options: {
                      soundFontUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
                      program: 56,
                      pan: [ -0.3, 0.3 ],
                      midiTranspose: ${transposeStep},
                  }
              }).then(function (results) {
                  window.synth.prime().then((response) => {
                    console.log('Synth primed');
                  });
              }).catch(function (reason) {
                  console.log('Synth failed:', reason);
              });
            } else {
              console.log('abcjs not loaded');
            }
        </script>
        </body>
      </html>
    `;

    const handleWebViewMessage = (event: any) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        console.log('Received message from webview:', message);
        if (message.type === 'SET_HEIGHT') {
          setWebviewHeight(message.height); // Adjust webview height based on content height
        }
        if (message.type === 'LOG') {
          console.log('Message from webview:', message.data);
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
          source={{html: htmlContent}}
          javaScriptEnabled={true}
          onMessage={handleWebViewMessage}
          style={{...styles.container, backgroundColor: theme.colors.surface}}
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
