import React from "react"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Text } from "@fluentui/react-components";

export const Event = ({
    place,
    clickCallback,
    ind,
}) => (<div className={ind % 2 === 0 ? 'event-wrapper' : 'event-wrapper light-bg'}>
    <div>
        <Text>
            {place.length > 15 ? place.substring(0, 12)+'...' : place}
        </Text>
    </div>
    <FullscreenIcon onClick={clickCallback} style={{color: 'inherit'}} className="opening-icon" />
</div>)