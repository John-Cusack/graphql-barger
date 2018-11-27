import React from 'react'
import {Mutation} from 'react-apollo'
import Error from '../Error'
import {SIGNIN_USER} from '../../queries'

const initialState = {
    username: "",
    password: ""
}

class Signin extends React.Component {
    state = { ...initialState}

    clearState = () => {
        this.setState({...initialState})
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event, signinUser) => {
        event.preventDefault()
        signinUser().then(({data}) => {
            console.log(data)
            localStorage.setItem('token',data.signinUser.token)
            this.clearState()
        })
    }

    validateForm = () => {
        const {username, password} = this.state
        const isInvalid = !username || !password;
        return isInvalid;
    }

    render() {
        const {username, password} = this.state

        return (
            <div className="App">
            <h2 className="App">Signin</h2>
            <Mutation mutation={SIGNIN_USER} variables={{username, password}}>
                {(signinUser, {data, loading, error}) => {
                    return (
                        <form className='form' onSubmit={event => this.handleSubmit(event, signinUser)}>
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={username}/>
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password}/>
                        <button className="button-primary" disabled={loading || this.validateForm()}>Submit</button>
                        {error && <Error error={error}/>}
                    </form>
                    )
                }}
            </Mutation>
            </div>
        )
    }
}

export default Signin