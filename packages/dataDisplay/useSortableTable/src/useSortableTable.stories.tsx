import React, { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import useSortableTable from './useSortableTable';

const SortableTable = () => {
    return <table></table>;
};

const meta = {
    title: 'data display/useSortableTable',
    component: SortableTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SortableTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: 스토리북 테스트를 위한 공용 파일로 분리
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type DummyType = { name: string; like: number; checked: boolean; period: { start: number; end: number } };

const dummy: DummyType[] = [
    { name: 'banana', like: 10, checked: true, period: { start: new Date(2024, 1, 1).setMilliseconds(1000), end: new Date(2024, 1, 30).setMilliseconds(1000) } },
    { name: 'apple', like: 100, checked: false, period: { start: new Date(2024, 1, 2).setMilliseconds(1000), end: new Date(2024, 1, 13).setMilliseconds(1000) } },
    { name: 'pineapple', like: 50, checked: true, period: { start: new Date(2024, 1, 3).setMilliseconds(1000), end: new Date(2024, 1, 12).setMilliseconds(1000) } },
    { name: 'cherry', like: 30, checked: true, period: { start: new Date(2024, 1, 5).setMilliseconds(1000), end: new Date(2024, 1, 20).setMilliseconds(1000) } },
    { name: 'orange', like: 1, checked: false, period: { start: new Date(2024, 1, 6).setMilliseconds(1000), end: new Date(2024, 1, 10).setMilliseconds(1000) } },
];

type ArrayDummyType = [string, number, number][];

const arrayDummy: ArrayDummyType = [
    ['banana', 1, 100],
    ['apple', 2, 99],
    ['cherry', 3, 98],
];

const fetchDummy = async (delay: number = 3000) => {
    await sleep(delay);
    return dummy;
};

const DefaultTemplete = ({ isAsyncDataFetch = false, delay }:{ isAsyncDataFetch?: boolean, delay?: number }) => {
    const keys = ['checked', 'name', 'like', 'period'] as const;

    const [data, setData] = useState<DummyType[]>(isAsyncDataFetch ? [] : dummy);

    useEffect(() => {
        if (!isAsyncDataFetch) {
            return;
        }

        (async () => {
            const res = await fetchDummy(delay);
            setData(res);
        })();
    }, []);

    const sortableTable = useSortableTable(data);
    return (
        <table>
            <thead>
                <tr>
                    {keys.map((objKey) => (
                        <th key={objKey}>
                            <span>{objKey === 'period' ? '시작 날짜 기준' : objKey}</span>
                            <input
                                type='checkbox'
                                role='checkbox'
                                aria-label={objKey === 'period' ? 'period-start' : objKey}
                                name={objKey === 'period' ? 'period-start' : objKey}
                                id={objKey === 'period' ? 'period-start' : objKey}
                                disabled={objKey === 'checked'}
                                onChange={(e) => {
                                    if (objKey === 'checked') {
                                        return;
                                    }

                                    if (e.target.checked) {
                                        if (objKey === 'name') {
                                            sortableTable.sort(objKey, (a: string, b: string) => a.localeCompare(b));
                                        }

                                        if (objKey === 'like') {
                                            sortableTable.sort(objKey, (a: number, b: number) => a - b);
                                        }

                                        if (objKey === 'period') {
                                            sortableTable.sort(objKey, (a: DummyType['period'], b: DummyType['period']) => a.start - b.start);
                                        }
                                        return;
                                    }
                                    sortableTable.initializeSort();
                                }}
                            />
                        </th>
                    ))}
                    <th>
                        <span>{'종료 날짜 기준'}</span>
                        <input
                            type='checkbox'
                            role='checkbox'
                            aria-label={'period-end'}
                            name='period-end'
                            id='period-end'
                            onChange={(e) => {
                                if (e.target.checked) {
                                    sortableTable.sort('period', (a: DummyType['period'], b: DummyType['period']) => a.end - b.end);
                                    return;
                                }
                                sortableTable.initializeSort();
                            }}
                        />
                    </th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
                {sortableTable.sortedData.map((obj, index) => (
                    <tr key={obj.name} aria-label={`${index}-row`}>
                        <td>{obj.checked ? 'check' : 'uncheck'}</td>
                        <td>{obj.name}</td>
                        <td>{obj.like}</td>
                        <td colSpan={2}>
                            <span>{new Date(obj.period.start).toLocaleDateString()}</span>
                            <br />
                            <span>{new Date(obj.period.end).toLocaleDateString()}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const ArrayTemplete = () => {
    const sortableTable = useSortableTable(arrayDummy);

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <span>name</span>
                        <input
                            type='checkbox'
                            role='checkbox'
                            aria-label='name'
                            name='name'
                            id='name'
                            onChange={(e) => {
                                if (e.target.checked) {
                                    sortableTable.sort('0', (a: string, b: string) => a.localeCompare(b));
                                    return;
                                }
                                sortableTable.initializeSort();
                            }}
                        />
                    </th>
                    <th>
                        <span>like</span>
                        <input
                            type='checkbox'
                            role='checkbox'
                            aria-label='like'
                            name='like'
                            id='like'
                            onChange={(e) => {
                                if (e.target.checked) {
                                    sortableTable.sort('1', (a: number, b: number) => (a - b > 0 ? -1 : 1));
                                    return;
                                }
                                sortableTable.initializeSort();
                            }}
                        />
                    </th>
                    <th>
                        <span>count</span>
                        <input
                            type='checkbox'
                            role='checkbox'
                            aria-label='count'
                            name='count'
                            id='count'
                            onChange={(e) => {
                                if (e.target.checked) {
                                    sortableTable.sort('2', (a: number, b: number) => a - b);
                                    return;
                                }
                                sortableTable.initializeSort();
                            }}
                        />
                    </th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
                {sortableTable.sortedData.map((obj, index) => (
                    <tr key={obj[0]} aria-label={`${index}-row`}>
                        <td>{obj[0]}</td>
                        <td>{obj[1]}</td>
                        <td>{obj[2]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const EmptyTemplete = () => {
    const sortableTable = useSortableTable<DummyType>([]);

    return (
        <table>
            <thead></thead>
            <tbody>
                {sortableTable.sortedData.map((obj) => (
                    <tr>
                        <td>{obj.name}</td>
                        <td>{obj.like}</td>
                        <td>{obj.period.start}</td>
                        <td>{obj.period.end}</td>
                    </tr>
                ))}
                {sortableTable.sortedData.length === 0 && (
                    <tr>
                        <td colSpan={4}>데이터가 없습니다.</td>
                    </tr>
                )}
                <tr>
                    <td>
                        <button onClick={() => sortableTable.sort('like', (a: number, b: number) => a - b)}>정렬</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={() => sortableTable.initializeSort()}>초기화</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const SortStoryWithDefaultData: Story = {
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

        expect(firstRowTdList[1]).toHaveTextContent('apple');

        // like를 클릭하여 정렬
        userEvent.click(likeCheckbox);

        await sleep(1000);
        firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');

        expect(firstRowTdList[1]).toHaveTextContent('orange');

        // period-start를 클릭하여 정렬
        userEvent.click(periodStartCheckbox);

        await sleep(1000);
        firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');

        expect(firstRowTdList[1]).toHaveTextContent('banana');

        // period-end를 클릭하여 정렬
        userEvent.click(periodEndCheckbox);

        await sleep(1000);
        firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');

        expect(firstRowTdList[1]).toHaveTextContent('orange');
    },
}

export const Default: Story = {
    render: DefaultTemplete,
};

export const AsyncDataFetch: Story = {
    play: async (context) => {
        const canvas = within(context.canvasElement);

        await sleep(3000 + 1000);

        const firstRowTdList = canvas.getByLabelText('0-row').getElementsByTagName('td');
        expect(firstRowTdList[1]).toHaveTextContent('banana');

        if (!!SortStoryWithDefaultData.play){
            await SortStoryWithDefaultData.play(context);
        }
    },
    args: {
        isAsyncDataFetch: true,
    },
    render: DefaultTemplete,
}

export const Array: Story = {
    render: ArrayTemplete,
};

export const Empty: Story = {
    render: EmptyTemplete,
};

export const Interactive: Story = {
    play: async (context) => {        
        if (!!SortStoryWithDefaultData.play){
            await SortStoryWithDefaultData.play(context);
        }
    },
    render: DefaultTemplete,
};

export const CreateAndRemoveData: Story = {
    render: () => {
        const [data, setData] = useState<DummyType[]>(dummy);
        const [inputData, setInputData] = useState<DummyType>({ name: '', like: 0, checked: false, period: { start: 0, end: 0 } });

        const [selectedSortKey, setSelectedSortKey] = useState<keyof DummyType | "">('');

        const addData = (newData: DummyType) => {
            setData([...data, newData]);
            setInputData({ name: '', like: 0, checked: false, period: { start: 0, end: 0 } });
        }

        const removeData = (index: number) => {
            setData(data.filter((_, i) => i !== index));
        }

        const sortableTable = useSortableTable(data);

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {(['checked', 'name', 'like', 'period'] as (keyof DummyType)[]).map((key) => <th key={key}>
                                <button 
                                    onClick={() => {
                                        setSelectedSortKey(key);
                                        if (key === 'name') {
                                            sortableTable.sort(key, (a: string, b: string) => a.localeCompare(b));
                                        }
                                        if (key === 'like') {
                                            sortableTable.sort(key, (a: number, b: number) => a - b);
                                        }
                                        if (key === 'period') {
                                            sortableTable.sort(key, (a: DummyType['period'], b: DummyType['period']) => a.start - b.start);
                                        }
                                    }} 
                                    style={selectedSortKey === key ? {color: 'red'} : {}}
                                >
                                    {key}
                                </button>
                            </th>)}
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortableTable.sortedData.map((obj, index) => 
                            <tr key={`${obj.name}:${obj.like}`}>
                                <td>{obj.checked ? "V" : "X"}</td>
                                <td>{obj.name}</td>
                                <td>{obj.like}</td>
                                <td>
                                    <span>{new Date(obj.period.start).toLocaleDateString()}</span>
                                    <br />
                                    <span>{new Date(obj.period.end).toLocaleDateString()}</span>
                                </td>
                                <td>
                                    <button onClick={() => removeData(index)}>삭제</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    <h3>새로운 데이터 추가</h3>
                    <label>
                        name
                        <input type="text" value={inputData.name} onChange={(e) => setInputData({...inputData, name: e.target.value})} />
                    </label>
                    <label>
                        like
                        <input type="number" value={inputData.like} onChange={(e) => setInputData({...inputData, like: Number(e.target.value)})} />
                    </label>
                    <label>
                        checked
                        <input type="checkbox" checked={inputData.checked} onChange={(e) => setInputData({...inputData, checked: e.target.checked})} />
                    </label>
                    <label>
                        period start
                        <input type="date" value={new Date(inputData.period.start).toISOString().split('T')[0]} onChange={(e) => setInputData({...inputData, period: {...inputData.period, start: new Date(e.target.value).getTime()}})} />
                    </label>
                    <label>
                        period end
                        <input type="date" value={new Date(inputData.period.end).toISOString().split('T')[0]} onChange={(e) => setInputData({...inputData, period: {...inputData.period, end: new Date(e.target.value).getTime()}})} />
                    </label>
                    <button onClick={() => addData(inputData)}>추가</button>
                </div>
            </div>
        )
    }
}


