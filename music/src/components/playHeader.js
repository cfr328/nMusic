import React from 'react';
import styles from './playHeader.scss';

class PlayHeader extends React.PureComponent{
    render() {
        let {
            isPlay,
            picUrl,
            name,
            alName,
            alia
        } = this.props;
        return <React.Fragment>
            <div className={styles.bg}>
                <img className={isPlay?styles.picUrl:styles.disable} src={picUrl}/> 
            </div>
            <div className={styles.tit}>
                <h3 className={styles.songName}>{name}</h3>
                <h6>{alName}</h6>
                <h6>{alia}</h6>
            </div>
        </React.Fragment>
    }

}

export default PlayHeader;