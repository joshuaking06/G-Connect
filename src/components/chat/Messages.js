import React from 'react'
import ChatRoom from './ChatRoom'
import Inbox from './Inbox'
import axios from 'axios'

class Messages extends React.Component {
    constructor() {
        super()
        this.handleSumbit = this.handleSumbit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        global.socket.on('RECEIVE_MESSAGE', (msg) => {
            const messages = [...this.state.showChatroom.messages, msg.messages[0]]
            const showChatroom = { ...this.state.showChatroom, messages }
            console.log(showChatroom)

            this.setState({ ...this.state, showChatroom })
        }
        )
    }
    componentDidMount() {
        console.log('here')
        const queryString = `
            {    
                showIndexChatroom(query: "5cb61d12744c127fb5cd972d"){
                  _id
                  user{_id,username}
                },
                showChatroom(query: "5cd1da11759d102c3b2f6bdc"){
                    _id
                    messages{
                        text
                        user
                      }
                }
              }
                    `
        axios
            .post('/api/graphql', { query: queryString })
            .then((data) => this.setState(data.data.data))
    }

    handleChange({ target: { name, value } }) {
        this.setState({ ...this.state, [name]: value })
    }

    // {user:"5cd1da11759d102c3b2f6bdc" , message: {user: "5cb51dc4452adb56b8127eeb",text: "lool"} }
    handleSumbit(e) {
        e.preventDefault()
        if (this.state.message) {
            global.socket.emit('chat message', { user: "5cd1da11759d102c3b2f6bdc", message: { "user": "5cb51dc4452adb56b8127eeb", "text": this.state.message } })
            this.setState({ ...this.state, message: '' })
        }

    }
    render() {
        if (!this.state) return <h1>loading</h1>
        return (
            <section className="section has-margin">
                <div className="container container-full-screen" >
                    <h2 className="title is-4">Messaging</h2>
                    <div className="columns Messaging">
                        <div className="column is-one-third">
                            <h3 className="title is-5">Recent</h3>
                            <div className="inbox">
                                {this.state.showIndexChatroom.map((number, index) =>
                                    < Inbox key={index} {...number} />
                                )
                                }

                            </div>
                        </div>
                        <ChatRoom data={this.state.showChatroom} handleSumbitEvent={this.handleSumbit} handleChangeEvent={this.handleChange} message={this.state.message} />


                    </div>
                </div>
            </section>

        )
    }
}

export default Messages