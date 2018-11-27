import React from 'react'
import {Mutation} from 'react-apollo'
import Error from '../Error'
import {SIGNUP_USER} from '../../queries'

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

class Signup extends React.Component {
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

    handleSubmit = (event, signupUser) => {
        event.preventDefault()
        signupUser().then(data => {
            console.log(data)
            localStorage.setItem('token',data.signupUser.token)
            this.clearState()
        })
    }

    validateForm = () => {
        const {username, email, password, passwordConfirmation} = this.state
        const isInvalid = !username || !email || !password ||password !== passwordConfirmation;
        return isInvalid;
    }

    render() {
        const {username, email, password, passwordConfirmation} = this.state

        return (
            <div className="App">
            <h2 className="App">Signup</h2>
            <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
                {(signupUser, {data, loading, error}) => {
                    return (
                        <form className='form' onSubmit={event => this.handleSubmit(event, signupUser)}>
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={username}/>
                        <input type="email" name="email" placeholder="Email Address" onChange={this.handleChange} value={email}/>
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password}/>
                        <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation}/>
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

export default Signup