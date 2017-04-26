import React, {PropTypes} from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { mapToCssModules } from './utils';

const CarouselItem = (props) => {
    const { src, altText, captionText, cssModule, isActive } = props;
    const classes = mapToCssModules(classNames(
        'd-block',
        'img-fluid'
    ), cssModule);


    // TODO: for some reason running this through CSS modules creates a probelm
    const itemClasses = mapToCssModules(classNames('carousel-item', { 'active': isActive }), cssModule);

    return (
        <div className={itemClasses}>
            <img className={classes} src={src} alt={altText} />
            {
                captionText ? (
                    <CarouselCaption {...props} />
                ) :
                false
            }
        </div>
    );
}

CarouselItem.propTypes = {
    src: PropTypes.string.isRequired,
    altText: PropTypes.string,
    captionHeader: PropTypes.string,
    cssModule: PropTypes.object.isRequired
}

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
}

CarouselCaption.propTypes = {
    captionHeader: PropTypes.string,
    captionText: PropTypes.string.isRequired,
    cssModule: PropTypes.object.isRequired
}

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

    // TODO: fix icon here
    const icon = direction === 'prev' ? 'chevron_left' : 'chevron_right';


    return (
        <a className={anchorClasses} role="button" onClick={(e) => {
            e.preventDefault();
            onClickHandler();
        }}>
            <span className={iconClasses} aria-hidden="true"></span>
            <span className={screenReaderClasses}>{directionText ? directionText : direction}</span>
        </a>
    );
}

CarouselControl.propTypes = {
    direction: PropTypes.oneOf(['prev', 'next']).isRequired,
    onClickHandler: PropTypes.func.isRequired,
    cssModule: PropTypes.object.isRequired,
    directionText: PropTypes.string
}

const CarouselIndicators = (props) => {
    const { items, activeIndex, cssModule, onClickHandler } = props;

    const listClasses = mapToCssModules('carousel-indicators', cssModule);
    const indicators = items.map((item, idx) => {
        const indicatorClasses = mapToCssModules(classNames(
            {'active': activeIndex === idx}
        ), cssModule);
        return <li key={idx} onClick={(e) => {
            e.preventDefault();
            onClickHandler(idx);
        }} className={indicatorClasses}></li>
    });

    return (
        <ol className={listClasses}>
            {indicators}
        </ol>
    )
}

CarouselIndicators.propTypes = {
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    cssModule: PropTypes.object.isRequired,
    onClickHandler: PropTypes.func.isRequired
}

class Carousel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {activeIndex: props.activeIndex || 0}
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

        if(activeIndex === 0) {
            this.setState({
                activeIndex: size-1,
                direction: 'left'
            })
        } else {
            this.setState({
                activeIndex: activeIndex-1,
                direction: 'left'
            })
        }
    }

    next() {
        const { activeIndex } = this.state;
        const size = this.props.items.length;

        if(activeIndex === size-1) {
            this.setState({
                activeIndex: 0,
                direction: 'right'
            })
        } else {
            this.setState({
                activeIndex: activeIndex+1,
                direction: 'right'
            })
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
            return <CarouselItem isActive={activeIndex === idx} key={idx} {...item} cssModule={cssModule} />
        });

        const transitionClasses = direction === 'right' ?
            {
                enter: 'carousel-item-left',
                //enterActive: 'carousel-item-next',
                appear: 'active',
                leave: 'carousel-item-right',
                //leaveActive: 'carousel-item-right'
            } :
            {
                enter: 'carousel-item-next',
                enterActive: 'carousel-item-right',
                appear: 'active',
                leave: 'carousel-item-prev',
                leaveActive: 'carousel-item-left'
            }


        return (
            <div className={outerClasses}>
                <CarouselIndicators {...this.props} activeIndex={activeIndex} onClickHandler={this.number} />
                <ReactCSSTransitionGroup component="div"  role="listbox" className={innerClasses}
                    transitionEnterTimeout={20}
                    transitionLeaveTimeout={20}
                    transitionName={transitionClasses} >
                    {carouselItems[activeIndex]}
                </ReactCSSTransitionGroup>
                <CarouselControl direction="prev" cssModule={cssModule} directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" cssModule={cssModule} directionText="Next" onClickHandler={this.next} />
            </div>
        )
    }

}

Carousel.propTypes = {
    items: PropTypes.array.isRequired,
    cssModule: PropTypes.object.isRequired,
    activeIndex: PropTypes.number
}

export default Carousel;