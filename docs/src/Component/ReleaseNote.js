import React, { useEffect, useState } from 'react';
import { Card, List, ListItem } from '@material-ui/core';
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

            setReleaseNoteList(res);

        })();
    },[]);

    return (
        <div className={'ReleaseNote'}>
            <h1>{'Release Note'}</h1>
            <List>
                {releaseNoteList.reverse().map((releaseNote) => (
                    <ListItem key={releaseNote.githubUrl}>
                        <Card className={'ReleaseNoteCard'}>
                            <h1 className={'ReleaseTitle'}>
                                <a href={releaseNote.githubUrl}>
                                    {releaseNote.title}
                                </a>
                            </h1>
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
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ReleaseNote;