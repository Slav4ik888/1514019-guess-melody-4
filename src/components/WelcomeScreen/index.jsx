import React from 'react';


class WelcomeScreen extends React.PureComponent {

    render() {
        const { errorValue } = this.props;

        return (
            <>
                <div>Добро пожаловать!!!</div>
                <div>Сейчас у вас { errorValue } ошибки</div>
            </>
        )
    }
}

export default WelcomeScreen;