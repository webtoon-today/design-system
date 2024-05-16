import React, { useEffect, useState } from 'react';
import { getRelease } from '../Data/Release';
import { parseMD } from '../Utils/Functions';
import { Card, List, ListItem } from '@material-ui/core';

const ReleaseNote = () => {

    const [releaseLogList, setReleaseLogList] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getRelease();
            const blockList = res.trim().split('\n\n');
            const parsedJSXBlock = blockList.map((block) => parseMD(block).flat());
            setReleaseLogList(parsedJSXBlock);
        })();
    }, []);

    return (
        <div>
            <h1>{'Release Note'}</h1>
            <List>
                {releaseLogList.reverse().map((releaseLog, index) =>
                    <ListItem key={index}>
                        <Card style={{ padding: 8 }}>{releaseLog}</Card>
                    </ListItem>)}
            </List>
        </div>
    )
}

export default ReleaseNote;