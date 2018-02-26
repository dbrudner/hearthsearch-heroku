import React from 'react'
import potato from './images/potato.svg'

export default function Banner(props) {
    return (
        <div className='banner'>
            <div className='banner-header'>
                <div className='banner-border'>
                    <div>
                        <strong>HearthTato</strong>
                    </div>
                    <div>
                        <img src={potato} className='potato'/>
                    </div>
                </div>
            </div>
        </div>
    )
}