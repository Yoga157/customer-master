import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './styles.scss';

export class ComponentToPrint extends React.PureComponent<{ content: any }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      valProjHeader,
      valDocInformation,
      valDocControl,
      valDistributionList,
      valProjScope,
      valDeliverables,
      valScopeWork,
      valOrganization,
      valTimeline,
      valAccCriteria,
      valExclusion,
      valConstrain,
      valAssumption,
      valRisk,
      valSignature,
    } = this.props.content;
    // console.log('this.props', this.props);
    return (
      <div className="relativeCSS" id="source-html">
        <style type="text/css" media="print">
          {'\
            @page { size: potrait; padding: 10px 16px; }\
          '}
        </style>
        <div className="flash" />
        {ReactHtmlParser(valProjHeader)}
        {ReactHtmlParser(valDocInformation)}
        {ReactHtmlParser(valDocControl)}
        {ReactHtmlParser(valDistributionList)}
        {ReactHtmlParser(valProjScope)}
        {ReactHtmlParser(valDeliverables)}
        {ReactHtmlParser(valScopeWork)}
        {ReactHtmlParser(valOrganization)}
        {ReactHtmlParser(valTimeline)}
        {ReactHtmlParser(valAccCriteria)}
        {ReactHtmlParser(valExclusion)}
        {ReactHtmlParser(valConstrain)}
        {ReactHtmlParser(valAssumption)}
        {ReactHtmlParser(valRisk)}
        {ReactHtmlParser(valSignature)}
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((content, ref) => {
  return <ComponentToPrint content={content} />;
});
