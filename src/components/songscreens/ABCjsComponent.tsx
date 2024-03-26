import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';

// define props
interface ABCjsComponentProps {
  abcNotation: string;
}

export interface ABCjsComponentRef {
  playABC: () => void;
  pauseABC: () => void;
}

const ABCjsComponent = forwardRef<ABCjsComponentRef, ABCjsComponentProps>(
  ({abcNotation}, ref) => {
    const theme = useThemeSelection();
    const webViewRef = useRef<WebView>(null);
    const [webviewHeight, setWebviewHeight] = useState<number>(100);

    console.log('abcNotation', abcNotation);
    // remove title from abcNotation
    const titleIndex = abcNotation.indexOf('T:');
    if (titleIndex > -1) {
      const nextLineIndex = abcNotation.indexOf('\n', titleIndex);
      if (nextLineIndex > -1) {
        abcNotation =
          abcNotation.slice(0, titleIndex) + abcNotation.slice(nextLineIndex);
      }
    }

    console.log('abcNotation', abcNotation);

    // check if tempo is defined in abcNotation
    const tempoIndex = abcNotation.indexOf('Q:');
    let bpm = null;
    if (tempoIndex > -1) {
      const nextLineIndex = abcNotation.indexOf('\n', tempoIndex);
      if (nextLineIndex > -1) {
        const tempoString = abcNotation.slice(tempoIndex + 2, nextLineIndex);
        bpm = parseInt(tempoString.split('=')[1]);
      }
    }
    console.log('bpm', bpm);

    const transposeStep = 0;
    let millisecondsPerMeasure = null;
    if (bpm !== null) {
      millisecondsPerMeasure = (60 / bpm) * 1000 * 4;
    }
    console.log('millisecondsPerMeasure', millisecondsPerMeasure);
    const zoom = 620;

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

    const measureContentScript = `
    setTimeout(function() {
      const height = document.documentElement.scrollHeight || document.body.scrollHeight;
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'SET_HEIGHT', height: height}));
    }, 100); // Adjust timeout as needed
    true;
  `;

    useEffect(() => {
      // Reset webview height when abcNotation changes to recalculate the content height
      setWebviewHeight(100); // Reset to default or minimum height before content is loaded
    }, [abcNotation]);

    const htmlContent = `
      <html lang="html">
        <head>
<!--          <meta content="initial-scale=0.8, maximum-scale=0.81" name="viewport"></meta>-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/abcjs@6.2.3/abcjs-audio.css">
<!--          <script src="https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.3.0/abcjs-basic-min.js"></script>-->
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
            .paper-wrapper {
                margin: 0 auto;
            }
            #abc {
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
            .highlight-note {
              fill: red; /* Example: changes the note color to red */
              stroke: red; /* Example: changes the note outline to red */
            }
          </style>
        </head>
        <body id="body">
          <div class="paper-wrapper">
            <div id="abc"></div>
            <div id="audio"></div>
          </div>
          <div id="output" style="font-size: 30px; position: fixed; top: 0; right: 0; color: ${theme.colors.primary}"></div>
        </body>
      </html>
    `;

    const loadABCJSScript = `
      fetch('https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.3.0/abcjs-basic-min.min.js')
        .then(response => response.text())
        .then(scriptContent => {
          const script = document.createElement('script');
          script.textContent = scriptContent; // Inject the script content directly
          document.body.appendChild(script);
    
          if (window.ABCJS) {
            document.getElementById('output').innerHTML = 'abcjs loaded successfully';
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
              document.getElementById('output').innerHTML = 'beatCallback: ' + beatNumber + '/' + totalBeats + ' - ' + totalTime + ' - ' + position;
            }
            const timingOptions = {
              beatCallback: beatCallback,
              qpm: 60,
            };
            
            var visualObj = window.ABCJS.renderAbc("abc", "${abcNotation}", renderOptions);
            var myContext = new AudioContext();
            
            window.synth = new window.ABCJS.synth.CreateSynth();
            document.getElementById('output').innerHTML = '2';
            
            window.synth.init({
                audioContext: myContext,
                visualObj: visualObj[0],
                millisecondsPerMeasure: ${millisecondsPerMeasure},
                options: {
                    soundFontUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
                    pan: [ -0.3, 0.3 ],
                    midiTranspose: ${transposeStep},
                }
            }).then(function (results) {
                window.synth.prime().then((response) => {
                  document.getElementById('output').innerHTML = 'P';
                  var timingCallbacks = new window.ABCJS.TimingCallbacks(visualObj, timingOptions);
                });
            }).catch(function (reason) {
                document.getElementById('output').innerHTML = error
            });
          } else {
            document.getElementById('output').innerHTML = scriptContent;
          }
        })
        .catch(error => {
          document.getElementById('output').innerHTML = error
        });
      true;
    `;

    const handleWebViewMessage = (event: any) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        console.log('Received message from webview:', message);
        if (message.type === 'SET_HEIGHT') {
          setWebviewHeight(message.height); // Adjust webview height based on content height
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
          injectedJavaScript={measureContentScript + loadABCJSScript}
          style={{flex: 1, backgroundColor: theme.colors.surface}}
        />
      </View>
    );
  },
);

export default ABCjsComponent;
