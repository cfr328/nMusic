import React from 'react';
import styles from './LoginPage.scss'

class LoginPage extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            phone: '12345678900',
            password: '123456'
        }
    }

    submit() { //手机密码验证
        if(!/\d{11}/.test(this.state.phone)){
            alert('输入正确手机号')
            return;
        }
        if(!/\s{6, 20}/.test(this.state.password)){
            alert('输入正确密码')
            return;
        }
        this.props.login({
            phone: this.state.phone,
            password: this.state.password
        })
    }

    render(){
        return <React.Fragment>
            <div>
                <div className={styles.head}>手机号登录</div>
            </div>
            <div className={styles.box}>
                <input placeholder="手机号" maxLength="11" value={this.state.phone} onChange={e=>this.setState({phone: e.target.value})}/>
                <input placeholder="密码" type="password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})}/>
                <button onClick={this.submit.bind(this)}>登录</button>
            </div>
            
        </React.Fragment>
    }
}

export default LoginPage;
