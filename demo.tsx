import React, { useState, useCallback } from 'react';
import './index.css';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';
const yearFormat = 'YYYY';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const customFormat: DatePickerProps['format'] = (value) =>
  `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

const App: React.FC = () => {
  const [date, setDate] = useState('2023');

  const handleDateChange = useCallback(
    (value) => {
      console.log(dayjs('2023'));
      console.log(value);
      const aaa = dayjs(value);
      console.log(aaa);
      setDate(value);
    },
    [setDate]
  );

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        defaultValue={dayjs('2015/01/01', dateFormat)}
        format={dateFormat}
      />
      <DatePicker
        defaultValue={dayjs('01/01/2015', dateFormatList[0])}
        format={dateFormatList}
      />
      <DatePicker
        defaultValue={dayjs('2015/01', monthFormat)}
        format={monthFormat}
        picker="month"
      />
      测试年份：
      <DatePicker
        value={date ? dayjs(date, yearFormat) : null}
        format={yearFormat}
        picker="year"
        onChange={handleDateChange}
      />
      <DatePicker
        defaultValue={dayjs()}
        format={customWeekStartEndFormat}
        picker="week"
      />
      <RangePicker
        defaultValue={[
          dayjs('2015/01/01', dateFormat),
          dayjs('2015/01/01', dateFormat),
        ]}
        format={dateFormat}
      />
      <DatePicker
        defaultValue={dayjs('2015/01/01', dateFormat)}
        format={customFormat}
      />
    </Space>
  );
};

export default App;
