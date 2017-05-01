import React from 'react';
import { mount } from 'enzyme';
import { Carousel } from '../';

describe('Carousel', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  const items = [
      { src: '', altText: 'a', caption: 'caption 1' },
      { src: '', altText: 'b', caption: 'caption 2' },
      { src: '', altText: 'c', caption: 'caption 3' }
  ];

  describe('rendering', () => {
    it('should show the carousel indicators', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.find('CarouselIndicators').length).toEqual(1);
    });

    it('should show a single slide', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.find('CarouselItem').length).toEqual(1);
    });

    it('should show two controls', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.find('CarouselControl').length).toEqual(2);
    });
  });

  describe('carouseling', () => {
    it('should default to zero as the active index', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.state('activeIndex')).toEqual(0);
      wrapper.unmount();
    });

    it('should accept an active index', () => {
      const wrapper = mount(<Carousel items={items} activeIndex={1} />);
      expect(wrapper.state('activeIndex')).toEqual(1);
      wrapper.unmount();
    });

    it('should change the active index on next', () => {
      const wrapper = mount(<Carousel items={items} />);
      wrapper.instance().next();
      expect(wrapper.state('activeIndex')).toEqual(1);
      wrapper.unmount();
    });

    it('should change the active index on prev', () => {
      const wrapper = mount(<Carousel items={items} activeIndex={1} />);
      wrapper.instance().previous();
      expect(wrapper.state('activeIndex')).toEqual(0);
      wrapper.unmount();
    });
  });

  describe('interval', () => {
    it('should accept a number', () => {
      const wrapper = mount(<Carousel items={items} interval={1000} />);
      expect(wrapper.state('interval')).toEqual(1000);
      wrapper.unmount();
    });

    it('should accept a boolean', () => {
      const wrapper = mount(<Carousel items={items} interval={false} />);
      expect(wrapper.state('interval')).toEqual(false);
      wrapper.unmount();
    });

    it('should default to 5000', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.state('interval')).toEqual(5000);
      wrapper.unmount();
    });

    it('should change the active index after the interval when cycle is present', () => {
      const wrapper = mount(<Carousel items={items} cycle />);
      expect(wrapper.state('activeIndex')).toEqual(0);
      jasmine.clock().tick(5000);
      expect(wrapper.state('activeIndex')).toEqual(1);
    });
  });

  describe('hover', () => {
    it('should pause cycling when hover is passed in', () => {
      const wrapper = mount(<Carousel items={items} hover="hover" cycle />);
      expect(wrapper.state('hover')).toEqual('hover');
      expect(wrapper.state('cycle')).toEqual(true);
      wrapper.instance().pause();
      expect(wrapper.state('cycle')).toEqual(false);
    });

    it('should not pause cycling without hover', () => {
      const wrapper = mount(<Carousel items={items} cycle />);
      expect(wrapper.state('cycle')).toEqual(true);
      wrapper.instance().pause();
      expect(wrapper.state('cycle')).toEqual(true);
    });

    it('should default hover to false', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.state('hover')).toEqual(false);
    });
  });

  describe('wrap', () => {
    it('should default to true', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.state('wrap')).toEqual(true);
    });

    it('should show the carousel controls when wrap is true', () => {
      const wrapper = mount(<Carousel items={items} />);
      expect(wrapper.find('CarouselControl').length).toEqual(2);
    });

    it('should show one carousel controls when active index is zero and wrap is false', () => {
      const wrapper = mount(<Carousel items={items} wrap={false} />);
      expect(wrapper.find('CarouselControl').length).toEqual(1);
    });

    it('should show one carousel controls when active index is the last item and wrap is false', () => {
      const wrapper = mount(<Carousel items={items} activeIndex={2} wrap={false} />);
      expect(wrapper.find('CarouselControl').length).toEqual(1);
    });

    it('should not show the carousel controls when active is ', () => {
      const wrapper = mount(<Carousel items={items} activeIndex={1} wrap={false} />);
      expect(wrapper.find('CarouselControl').length).toEqual(2);
    });
  });
});
