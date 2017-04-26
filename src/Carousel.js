import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactTransitionGroup from 'react-addons-transition-group';
import { mapToCssModules } from './utils';

class CarouselItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { animation: [] };
  }


  componentDidReceiveProps() {
    console.log('NEXT PROPS', this.props.direction, this.props.altText);
  }

  componentWillAppear(callBack) {
    this.setState({
      animation: ['active']
    });
    callBack();
  }

  componentWillEnter(callBack) {
    const { direction } = this.props;
    console.log('ENTER', direction);
    this.setState({
      animation: ['carousel-item-prev', 'carousel-item-right']
    });

    setTimeout(() => {
      callBack();
    }, 500);
  }

  componentDidEnter() {
    this.setState({
      animation: ['active']
    });
  }

  componentWillLeave(callBack) {
    const { direction } = this.props;
    console.log('LEAVE', direction);
    this.setState({
      animation: ['carousel-item-right', 'active']
    });

    setTimeout(() => {
      callBack();
    }, 500);
  }

  componentDidLeave() {
    this.setState({
      animation: []
    });
  }


  render() {
    const { src, altText, captionText, cssModule } = this.props;
    const classes = mapToCssModules(classNames(
        'd-block',
        'img-fluid'
    ), cssModule);



    const itemClasses = mapToCssModules(classNames('carousel-item', ...this.state.animation), cssModule);

    return (
      <div className={itemClasses}>
        <img className={classes} src={src} alt={altText} />
        {
              captionText ? (
                <CarouselCaption {...this.props} />
              ) :
              false
          }
      </div>
    );
  }
}

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  altText: PropTypes.string,
  captionHeader: PropTypes.string,
  cssModule: PropTypes.object.isRequired,
  captionText: PropTypes.string,
  direction: PropTypes.string
};

const CarouselCaption = (props) => {
  const { captionHeader, captionText, cssModule } = props;
  const classes = mapToCssModules(classNames(
        'carousel-caption',
        'd-none',
        'd-md-block'
    ), cssModule);

  return (
    <div className={classes}>
      <h3>{captionHeader}</h3>
      <p>{captionText}</p>
    </div>
  );
};

CarouselCaption.propTypes = {
  captionHeader: PropTypes.string,
  captionText: PropTypes.string.isRequired,
  cssModule: PropTypes.object.isRequired
};

const CarouselControl = (props) => {
  const { direction, onClickHandler, cssModule, directionText } = props;

  const anchorClasses = mapToCssModules(classNames(
     `carousel-control-${direction}`
    ), cssModule);

  const iconClasses = mapToCssModules(classNames(
        `carousel-control-${direction}-icon`
    ), cssModule);

  const screenReaderClasses = mapToCssModules(classNames(
        'sr-only'
    ), cssModule);


  return (
    <a
      className={anchorClasses} role="button" onClick={(e) => {
        e.preventDefault();
        onClickHandler();
      }}
    >
      <span className={iconClasses} aria-hidden="true" />
      <span className={screenReaderClasses}>{directionText || direction}</span>
    </a>
  );
};

CarouselControl.propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  cssModule: PropTypes.object.isRequired,
  directionText: PropTypes.string
};

const CarouselIndicators = (props) => {
  const { items, activeIndex, cssModule, onClickHandler } = props;

  const listClasses = mapToCssModules('carousel-indicators', cssModule);
  const indicators = items.map((item, idx) => {
    const indicatorClasses = mapToCssModules(classNames(
          { active: activeIndex === idx }
      ), cssModule);
    return (
      <li
        key={idx} onClick={(e) => {
          e.preventDefault();
          onClickHandler(idx);
        }} className={indicatorClasses}
      />);
  });

  return (
    <ol className={listClasses}>
      {indicators}
    </ol>
  );
};

CarouselIndicators.propTypes = {
  items: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  cssModule: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func.isRequired
};

class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.state = { direction: 'right', activeIndex: props.activeIndex || 0 };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.number = this.number.bind(this);
  }

  number(index) {
    this.setState({
      activeIndex: index,
      direction: 'left'
    });
  }

  previous() {
    const { activeIndex } = this.state;
    const size = this.props.items.length;

    if (activeIndex === 0) {
      this.setState({
        activeIndex: size - 1,
        direction: 'left'
      });
    } else {
      this.setState({
        activeIndex: activeIndex - 1,
        direction: 'left'
      });
    }
  }

  next() {
    const { activeIndex } = this.state;
    const size = this.props.items.length;

    if (activeIndex === size - 1) {
      this.setState({
        activeIndex: 0,
        direction: 'right'
      });
    } else {
      this.setState({
        activeIndex: activeIndex + 1,
        direction: 'right'
      });
    }
  }

  render() {
    const { items, cssModule } = this.props;
    const { activeIndex, direction } = this.state;

    const outerClasses = mapToCssModules(classNames(
          'carousel',
          'slide'
      ), cssModule);

    const innerClasses = mapToCssModules(classNames(
          'carousel-inner'
      ), cssModule);

    const carouselItems = items.map((item, idx) => {
      return <CarouselItem direction={direction} key={idx} {...item} cssModule={cssModule} />;
    });


    return (
      <div className={outerClasses}>
        <CarouselIndicators {...this.props} activeIndex={activeIndex} onClickHandler={this.number} />
        <ReactTransitionGroup component="div" role="listbox" className={innerClasses}>
          {carouselItems[activeIndex]}
        </ReactTransitionGroup>
        <CarouselControl direction="prev" cssModule={cssModule} directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" cssModule={cssModule} directionText="Next" onClickHandler={this.next} />
      </div>
    );
  }

}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  cssModule: PropTypes.object.isRequired,
  activeIndex: PropTypes.number
};

export default Carousel;
