import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import SortableTable from './SortableTable';
import useSortableTable from './useSortable';

const meta = {
  title: 'data display/useSortableTable',
  component: SortableTable,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SortableTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: 스토리북 테스트를 위한 공용 파일로 분리
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const objectDummy: {name: string; like: number; period: {start: number, end: number}}[] = [
    {name: "banana", like: 10, period: {start: new Date(2024, 1, 1, 11).setMilliseconds(1000), end: new Date(2024, 1, 1, 12).setMilliseconds(1000)} },
    {name: "apple", like: 100, period: {start: new Date(2024, 1, 2).setMilliseconds(1000), end: new Date(2024, 1, 4).setMilliseconds(1000)} },
    {name: "pineapple", like: 50, period: {start: new Date(2024, 1, 3).setMilliseconds(1000), end: new Date(2024, 1, 10).setMilliseconds(1000)} },
    {name: "cherry", like: 30, period: {start: new Date(2024, 1, 1).setMilliseconds(1000), end: new Date(2024, 1, 20).setMilliseconds(1000)} },
    {name: "orange", like: 1, period: {start: new Date(2024, 1, 1, 0).setMilliseconds(1000), end: new Date(2024, 1, 1, 10).setMilliseconds(1000)} },
];

const DefaultTemplete = ({...args}) => {
    const keys = ["name", "like", "period"];

    const {sort, sortableData, initializeSort } = useSortableTable({keys, data: objectDummy});

    const [selected, setSelected] = useState<string[]>([]);

    const sortName = <T,>(a:T, b: T) => a > b ? 1 : -1;
    const sortLike = <T,>(a:T, b: T) => Number(a) - Number(b);
    const sortPeriod = (target: 'start' | 'end') => <T,>(a: T, b: T) => a[target] > b[target] ? 1 : -1;

    return (
        <SortableTable {...args}>
            <thead>
                <tr>
                    {keys.map((objKey) => (
                        <th key={objKey}>
                            <span>{objKey === "period" ? "시작 날짜 기준" : objKey}</span>
                            <input 
                                type="checkbox"
                                role='checkbox'
                                aria-label={objKey === "period" ? "period-start" : objKey}
                                name={objKey === "period" ? "period-start" : objKey}
                                id={objKey === "period" ? "period-start" : objKey}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        if (objKey === "name") {
                                            sort(objKey, sortName);
                                            return;
                                        }
                                        if (objKey === "like") {
                                            sort(objKey, sortLike);
                                            return;
                                        }
                                        if (objKey === "period") {
                                            sort(objKey, sortPeriod('start'));
                                            return;
                                        }
                                    }
                                    initializeSort();
                                }} 
                            />
                        </th>
                    ))}
                    <th>
                        <span>종료 날짜 기준</span>
                        <input 
                            type="checkbox"
                            role='checkbox'
                            aria-label={'period-end'}
                            name="period-end"
                            id="period-end"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    sort("period", sortPeriod('end'));
                                }
                            }}
                        />
                    </th>
                </tr>
            </thead>
            <tbody style={{textAlign: 'center'}}>
            {sortableData.map((obj, index) => (
                <tr key={obj.name} aria-label={`${index}-row`}>
                    <td>{obj.name}</td>
                    <td>{obj.like}</td>
                    <td colSpan={2}>
                        <span>{new Date(obj.period.start).toLocaleDateString()}</span>
                        <br />
                        <span>{new Date(obj.period.end).toLocaleDateString()}</span>
                    </td>
                </tr>
                )
            )}
            </tbody>
        </SortableTable>
    )
}

export const Default: Story = {
    args: { children: null },
    render: DefaultTemplete
}

export const Interactive: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const nameCheckbox = canvas.getByLabelText('name');
        const likeCheckbox = canvas.getByLabelText('like');
        const periodStartCheckbox = canvas.getByLabelText('period-start');
        const periodEndCheckbox = canvas.getByLabelText('period-end');

        // name을 클릭하여 정렬
        userEvent.click(nameCheckbox);

        await sleep(1000);
        let firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');

        expect(firstRowTdList[0]).toHaveTextContent('apple');

        // like를 클릭하여 정렬
        userEvent.click(likeCheckbox);

        await sleep(1000);
        firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');
        
        expect(firstRowTdList[0]).toHaveTextContent('orange');

        // period-start를 클릭하여 정렬
        userEvent.click(periodStartCheckbox);

        await sleep(1000);
        firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');
        
        expect(firstRowTdList[0]).toHaveTextContent('orange');

        // period-end를 클릭하여 정렬
        userEvent.click(periodEndCheckbox);

        await sleep(1000);
        firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');
        
        expect(firstRowTdList[0]).toHaveTextContent('orange');
    },
    args: { children: null },
    render: DefaultTemplete
}
