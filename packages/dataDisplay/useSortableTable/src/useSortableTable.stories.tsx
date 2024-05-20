import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import SortableTable from './SortableTable';
import useSortableTable from './useSortableTable';

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

const objectDummy: {name: string; like: number; checked: boolean; period: {start: number, end: number};}[] = [
    {name: "banana", like: 10, checked: true, period: {start: new Date(2024, 1, 1, 11).setMilliseconds(1000), end: new Date(2024, 1, 1, 12).setMilliseconds(1000)} },
    {name: "apple", like: 100, checked: false, period: {start: new Date(2024, 1, 2).setMilliseconds(1000), end: new Date(2024, 1, 4).setMilliseconds(1000)} },
    {name: "pineapple", like: 50, checked: true, period: {start: new Date(2024, 1, 3).setMilliseconds(1000), end: new Date(2024, 1, 10).setMilliseconds(1000)} },
    {name: "cherry", like: 30, checked: true, period: {start: new Date(2024, 1, 1).setMilliseconds(1000), end: new Date(2024, 1, 20).setMilliseconds(1000)} },
    {name: "orange", like: 1, checked: false, period: {start: new Date(2024, 1, 1, 0).setMilliseconds(1000), end: new Date(2024, 1, 1, 10).setMilliseconds(1000)},  },
];

const DefaultTemplete = ({...args}) => {
    const keys = ["checked", "name", "like", "period"] as const;

    const { sort, sortableData, initializeSort } = useSortableTable(objectDummy);

    const sortCompareFn = (key: typeof keys[number] | "period-end") => {
        if (key === "name") {

            return (a, b) => {
                return a.localeCompare(b);
            }
        }

        if (key === "like") {
            return (a, b) => a - b;
        }

        if (key === "period") {
            return (a, b) => a.start - b.start;
        }

        if (key === "period-end") {
            return (a, b) => a.end - b.end;
        }

        throw new Error("key is not valid");
    }

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
                                    if (objKey === "checked") {
                                        return;
                                    }

                                    if (e.target.checked) {
                                        if (objKey === "name") {
                                            sort(objKey, sortCompareFn(objKey));
                                        }
                                        return;
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
                                    sort("period", sortCompareFn('period-end'));
                                }
                            }}
                        />
                    </th>
                </tr>
            </thead>
            <tbody style={{textAlign: 'center'}}>
            {sortableData.map((obj, index) => (
                <tr key={obj.name} aria-label={`${index}-row`}>
                    <td>{obj.checked ? "check" : "uncheck"}</td>
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
