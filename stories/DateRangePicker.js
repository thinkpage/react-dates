import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT } from '../constants';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
];

const TestInput = props => (
  <div style={{ marginTop: 16 }}>
    <input
      {...props}
      type="text"
      style={{
        height: 48,
        width: 284,
        fontSize: 18,
        fontWeight: 200,
        padding: '12px 16px',
      }}
    />
  </div>
);

const TestPrevIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Prev
  </span>
);

const TestNextIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Next
  </span>
);

class TestWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
    };
  }

  render() {
    const { showDatePicker } = this.state;
    const display = showDatePicker ? 'block' : 'none';
    return (
      <div>
        <button
          type="button"
          onClick={() => this.setState({ showDatePicker: !showDatePicker })}
        >
          Show me!
        </button>

        <div style={{ display }}>
          <DateRangePickerWrapper />
        </div>
      </div>
    );
  }
}

storiesOf('DateRangePicker', module)
  .addWithInfo('不能超过当日(展示两个月)', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        keepOpenOnDateSelect
        startDatePlaceholderText="起始时间"
        endDatePlaceholderText="结束时间"
        monthFormat="YYYY[年]MMMM"
        isOutsideRange={day =>
          isInclusivelyAfterDay(day, moment().add(1, 'days'))
        }
      />
    )
  })
  .addWithInfo('不能超过当日(展示一个月)', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        numberOfMonths={1}
        keepOpenOnDateSelect
        startDatePlaceholderText="起始时间"
        endDatePlaceholderText="结束时间"
        monthFormat="YYYY[年]MMMM"
        isOutsideRange={day =>
          isInclusivelyAfterDay(day, moment().add(1, 'days'))
        }
      />
    )
  })
  .addWithInfo('default (green)', () => (
    <DateRangePickerWrapper />
  ))
  .addWithInfo('default (orange)', () => (
    <DateRangePickerWrapper color="orange" />
  ))
  .addWithInfo('hidden with display: none', () => (
    <TestWrapper />
  ))
  .addWithInfo('as part of a form', () => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  ))
  .addWithInfo('single month', () => (
    <DateRangePickerWrapper numberOfMonths={1} />
  ))
  .addWithInfo('3 months', () => (
    <DateRangePickerWrapper numberOfMonths={3} />
  ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .addWithInfo('horizontal with portal', () => (
    <DateRangePickerWrapper
      withPortal
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <DateRangePickerWrapper withFullScreenPortal />
  ))
  .addWithInfo('with clear dates button', () => (
    <DateRangePickerWrapper
      showClearDates
    />
  ))
  .addWithInfo('reopens DayPicker on clear dates', () => (
    <DateRangePickerWrapper
      showClearDates
      reopenPickerOnClearDates
    />
  ))
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
    />
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        showClearDates
        startDatePlaceholderText="开始时间"
        endDatePlaceholderText="结束时间"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
          clearDates: '清除日期',
        }}
      />
    );
  })
  .addWithInfo('with custom display format', () => (
    <DateRangePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <DateRangePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
    />
  ))
  .addWithInfo('allows a single night', () => (
    <DateRangePickerWrapper
      minimumNights={0}
    />
  ))
  .addWithInfo('allows all days', () => (
    <DateRangePickerWrapper
      isOutsideRange={() => false}
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <DateRangePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <DateRangePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment('04 2017', 'MM YYYY')}
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ));
