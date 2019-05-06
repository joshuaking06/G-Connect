import React from 'react'
import Message from './Message'

class ChatRoom extends React.Component {
    constructor() {
        super()
        this.state = {
            message: '',
            messages: [{ "_id": "5cb727fc08b7103341940947", "text": "hello", "createdAt": "2019-04-17T13:19:56.831Z" }]
        }
        this.handleSumbit = this.handleSumbit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        global.socket.on('connect', function () {
            console.log('connected')

        })

        global.socket.on('RECEIVE_MESSAGE', (msg) => {
            const messages = [...this.state.messages, msg]
            this.setState({ ...this.state, messages })
            this.scrollToBottom();
        }
        )
    }


    handleChange({ target: { name, value } }) {
        this.setState({ ...this.state, [name]: value })
    }

    handleSumbit(e) {
        e.preventDefault()
        if (this.state.message) {
            global.socket.emit('chat message', { "_id": "", "text": this.state.message })
            this.setState({ ...this.state, message: '' })
        }

    }
    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView();
    }
    render() {
        return (
            <div className="column">
                <div className="inbox">
                    {this.state.messages.map((elemn, index) =>

                        < Message key={index}  {...elemn} />

                    )

                    }
                    <div ref={el => { this.el = el; }} />
                </div>

                <form className="form" onSubmit={this.handleSumbit}>
                    <div className="field has-addons">
                        <p className="control">
                            <input className="input is-large" name="message" value={this.state.message} onChange={this.handleChange} type="text" placeholder="Write your message..." />
                        </p>
                        <p className="control">
                            <button className="button is-link is-outlined is-large">
                                Send
                            </button>
                        </p>
                    </div>

                </form>
            </div>)
    }
}

export default ChatRoom