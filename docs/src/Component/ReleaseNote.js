import React, { useState } from 'react';
import { Card, List, ListItem } from '@material-ui/core';

const ReleaseNote = () => {

    const [releaseLogList, setReleaseLogList] = useState([]);

    return (
        <div>
            <h1>{'Release Note'}</h1>
            <List>
                {releaseLogList.reverse().map((releaseLog, index) => (
                    <ListItem key={index}>
                        <Card style={{ padding: 8 }}>{releaseLog}</Card>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ReleaseNote;