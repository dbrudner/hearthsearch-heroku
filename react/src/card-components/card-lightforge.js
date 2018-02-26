import React from 'react';

const LightForge = (props) => {
    

    if (props.lightForge.length > 0) {
        return (
            <div className='lightforge-score'>
                {/* {props.lightForge[0].Hero || "Neutral"}: {props.lightForge[0].Score} */}
                Lightforge: {props.lightForge[0].Score}
                
            </div>
        )
    } else {
        return (
            <div className='lightforge-score-empty'>
                No LightForge Score
            </div>
        )
    }

    
}
 
export default LightForge;