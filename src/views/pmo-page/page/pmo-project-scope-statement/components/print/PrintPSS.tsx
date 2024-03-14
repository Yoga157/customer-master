import * as React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import ReactToPrint from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';
import ToolTips from 'views/components/UI/Tooltip/ToolTip';

const PrintPSS = ({ content }) => {
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('old boring text');

  const handleAfterPrint = React.useCallback(() => {
    console.log('`onAfterPrint` called');
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log('`onBeforePrint` called');
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log('`onBeforeGetContent` called');
    setLoading(true);
    setText('Loading new text...');

    return new Promise((resolve, reject) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText('New, Updated Text!');
        // resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  React.useEffect(() => {
    if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const exportHTMLToDoc = () => {
    var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export Project Scope Statement</title>      </head><body> ";
    var footer = '</body></html>';
    var sourceHTML = header + document.getElementById('source-html').innerHTML + footer;
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'project scope statement.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Grid>
        <Grid.Column width="16" className="pv-1r">
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle=""
            onAfterPrint={handleAfterPrint}
            onBeforeGetContent={handleOnBeforeGetContent}
            onBeforePrint={handleBeforePrint}
            removeAfterPrint
            trigger={() => (
              <ToolTips
                content="Print"
                trigger={<Button circular color="blue" icon="print" floated="right" loading={loading} disabled={loading} />}
              />
            )}
          />
          {/* {loading && <p className="indicator">Loading...</p>} */}
          <ToolTips
            content="Export To Doc"
            trigger={
              <Button
                circular
                className="mr-1"
                color="blue"
                icon="file word outline"
                floated="right"
                disabled={loading}
                onClick={() => exportHTMLToDoc()}
              />
            }
          />
        </Grid.Column>
      </Grid>

      <ComponentToPrint content={content} ref={componentRef} />
    </div>
  );
};

export default PrintPSS;
