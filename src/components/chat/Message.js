import React from 'react'
import moment from 'moment'

const Message = ({ _id, text, createdAt }) => {
    let cssName
    if (_id === '5cb727fc08b7103341940947') {
        cssName = 'send'
    }

    return (
        <div className="media">
            {/* <figure className="media-left">
                <p className="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
            </figure> */}
            <div className="media-content">
                <div className={`content message ${cssName}`}>
                    <p>
                        {text}
                    </p>
                </div>
                <p className={`${cssName}`}><small>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</small></p>

            </div>

        </div>
    )
}

export default Message