import React, { PropTypes } from 'react';
import cx from 'classnames';

import DateInput from './DateInput';
import Calendar from '../svg/calendar.svg';
import CloseButton from '../svg/close.svg';

import { START_DATE, END_DATE } from '../../constants';

const propTypes = {
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,

  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,

  onStartDateFocus: PropTypes.func,
  onEndDateFocus: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onStartDateShiftTab: PropTypes.func,
  onEndDateTab: PropTypes.func,
  onClearDates: PropTypes.func,

  startDate: PropTypes.string,
  endDate: PropTypes.string,

  isStartDateFocused: PropTypes.bool,
  isEndDateFocused: PropTypes.bool,
  showClearDates: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  showCaret: PropTypes.bool,

  // i18n
  phrases: PropTypes.shape({
    clearDates: PropTypes.node,
  }),
  color: PropTypes.string,
};

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  onStartDateFocus() {},
  onEndDateFocus() {},
  onStartDateChange() {},
  onEndDateChange() {},
  onStartDateShiftTab() {},
  onEndDateTab() {},
  onClearDates() {},

  startDate: '',
  endDate: '',

  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  showCaret: false,

  // i18n
  phrases: {
    clearDates: 'Clear Dates',
  },
  color: 'green',
};

export default class DateRangePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearDatesHovered: false,
    };

    this.onClearDatesMouseEnter = this.onClearDatesMouseEnter.bind(this);
    this.onClearDatesMouseLeave = this.onClearDatesMouseLeave.bind(this);
  }

  onClearDatesMouseEnter() {
    this.setState({
      isClearDatesHovered: true,
    });
  }

  onClearDatesMouseLeave() {
    this.setState({
      isClearDatesHovered: false,
    });
  }

  render() {
    const { startDateString, endDateString, isClearDatesHovered } = this.state;
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      isStartDateFocused,
      onStartDateChange,
      onStartDateFocus,
      onStartDateShiftTab,
      endDate,
      endDateId,
      endDatePlaceholderText,
      isEndDateFocused,
      onEndDateChange,
      onEndDateFocus,
      onEndDateTab,
      onClearDates,
      showClearDates,
      disabled,
      required,
      showCaret,
      phrases,
      color,
    } = this.props;

    const startDateValue = startDate || startDateString;
    const endDateValue = endDate || endDateString;

    return (
      <div
        className={cx('DateRangePickerInput', {
          'DateRangePickerInput--disabled': disabled,
        })}
      >
        <Calendar />
        <DateInput
          id={startDateId}
          placeholder={startDatePlaceholderText}
          dateValue={startDateValue}
          focused={isStartDateFocused}
          disabled={disabled}
          required={required}
          showCaret={showCaret}

          onChange={onStartDateChange}
          onFocus={onStartDateFocus}
          onKeyDownShiftTab={onStartDateShiftTab}
          color={color}
        />

        <div className="DateRangePickerInput__arrow">
          —
        </div>

        <DateInput
          id={endDateId}
          placeholder={endDatePlaceholderText}
          dateValue={endDateValue}
          focused={isEndDateFocused}
          disabled={disabled}
          required={required}
          showCaret={showCaret}

          onChange={onEndDateChange}
          onFocus={onEndDateFocus}
          onKeyDownTab={onEndDateTab}
          color={color}
        />

        {showClearDates && (startDateValue || endDateValue) &&
          <button
            type="button"
            className={cx('DateRangePickerInput__clear-dates', {
              // 'DateRangePickerInput__clear-dates--hide': !(startDateValue || endDateValue),
              'DateRangePickerInput__clear-dates--hover': isClearDatesHovered,
            })}
            onMouseEnter={this.onClearDatesMouseEnter}
            onMouseLeave={this.onClearDatesMouseLeave}
            onClick={onClearDates}
          >
            <span className="screen-reader-only">
              {phrases.clearDates}
            </span>
            <CloseButton />
          </button>
        }
      </div>
    );
  }
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;
