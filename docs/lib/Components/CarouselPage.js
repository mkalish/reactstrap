/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';
import CarouselExample from '../examples/Carousel';
const CarouslExampleSource = require('!!raw!../examples/Carousel');

export default class CarouselPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Carousel" />

        <h3>Collapse</h3>
        <div className="docs-example">
          <CarouselExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">
            {CarouslExampleSource}
          </PrismCode>
        </pre>

        <h3>Properties</h3>
        <pre>
          <PrismCode className="language-jsx">
{`Collapse.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.node,
  navbar: PropTypes.bool,
  delay: PropTypes.oneOfType([
    PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }),
    PropTypes.number
  ]), // optionally override show/hide delays - default { show: 350, hide: 350 }
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
}`}
          </PrismCode>
        </pre>
      </div>
    );
  }
}
