import ReactDOM from 'react-dom'
import React from 'react'

class App extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<h1>Hello World</h1>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
