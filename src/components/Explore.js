import React, { Component, PropTypes } from 'react'

const GITHUB_REPO = 'https://github.com/reactjs/redux'

export default class Explore extends Component {
  state = { inputValue: '' }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ inputValue: nextProps.value })
    }
  }

  handleChange = ({ target }) => this.setState({ inputValue: target.value })

  handleGoClick = () => {
    this.props.onChange(this.state.inputValue)
  }

  render() {
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <input size="45"
               id="search-input"
               value={this.state.inputValue}
               ref="input"
               onChange={this.handleChange} />
        <button onClick={this.handleGoClick}>
          Go!
        </button>
        <p>
          Code on <a href={GITHUB_REPO} target="_blank">Github</a>.
        </p>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}
