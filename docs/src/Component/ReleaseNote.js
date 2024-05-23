import React, { useEffect, useState } from 'react';
import { Card, List, ListItem } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

import ReactMarkdown from 'react-markdown';
import { getReleaseNote } from '../Data/Release';

import './ReleaseNote.css';

const ReleaseNote = () => {

    const [releaseNoteList, setReleaseNoteList] = useState([]);

    useEffect(()=>{
        (async () => {
            const res = await getReleaseNote();
            
            if (!res) {
                return;
            }

            setReleaseNoteList(res.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));

        })();
    },[]);

    return (
        <div className={'ReleaseNote'}>
            <h1>{'Release Note'}</h1>
            <List>
                {releaseNoteList.map((releaseNote) => {
                    const updateDate = new Date(releaseNote.updatedAt);
                    const updateDateString = `${updateDate.getFullYear()}-${updateDate.getMonth() + 1}-${updateDate.getDate()} ${updateDate.getHours()}:${updateDate.getMinutes()}`;
                    return (
                        <ListItem key={releaseNote.githubUrl}>
                            <Card className={'ReleaseNoteCard'}>
                                <details>
                                    <summary>
                                        <div className={'ReleaseTitle'}>
                                            <h1 >
                                                <a href={releaseNote.githubUrl}>
                                                    {releaseNote.title}
                                                </a>
                                            </h1>
                                            <span>{`update time: ${updateDateString}`}</span>
                                        </div>
                                        <KeyboardArrowUp className={'Arrow'}/>
                                    </summary>
                                    <div className={'ReleaseBody'}>
                                        <ReactMarkdown
                                            children={releaseNote.body}
                                            components={{
                                                h1: `h2`,
                                                h2: `h3`,
                                                h3: `h4`,
                                            }}
                                        />
                                    </div>
                                    <a href={`/${releaseNote.branch}`}>{'storybook preview'}</a>
                                </details>
                            </Card>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}

export default ReleaseNote;