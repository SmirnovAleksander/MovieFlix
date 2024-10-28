import {useEffect, useState} from "react";
import styles from './VideoPlayer.module.css'
import classNames from "classnames"

const VideoPlayer = () => {
    const [scriptHtml, setScriptHtml] = useState('');
    const dataUrl = window.location.href;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('//pleer.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&tti=&ru=' + dataUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.text();

                const match = data.match(/<iframe.*<\/iframe>/gm);
                if (match && match[1]) {
                    setScriptHtml(match[1]);
                } else {
                    console.warn("Iframe not found in response.");
                }
            } catch (error) {
                console.error("Error fetching player data:", error);
            }
        };

        fetchData();
    }, [dataUrl])

    return (
        <div className={classNames("uitools", styles.video)}
             id="videoplayers"
             dangerouslySetInnerHTML={{__html: scriptHtml}}
        >
        </div>
    );
};

export default VideoPlayer;