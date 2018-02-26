import React from 'react'
import { Link } from 'react-router-dom'

export default function Comments(props) {

    console.log('comments', props.comments)

    const renderComments = comments => {

        return comments.map(comment => {
            let date = comment.date.split('T')
            let time = date[1]
            date = date[0]
            time = time.split('.')[0]
            
            return (
                <div className='comments-panel'>
                    <div>
                        <div className='comments-user'>
                            <Link to='/user'>
                                {comment.user.local.email}
                            </Link>
                        </div>
                        <div className='date'>
                            {date}
                        </div>
                    </div>
                    <div className='comment-body'>
                        {comment.comment}
                    </div>
                    <hr/>                    
                </div>
            )
        })
    }


    if (props.comments.length > 0) {
        return (
            <div>
                {renderComments(props.comments)}
            </div>
        )
    }
    else {
        return (
            <div className='no-comments'>
                No comments
            </div>
        )
    }

    
}