import ReactPlayer from "react-player";
import React from "react";
interface TrailerPlayerProps {
    videoUrl: string
}
const TrailerPlayer: React.FC<TrailerPlayerProps> = ({videoUrl}) => {
    console.log(videoUrl)
    return (
        <ReactPlayer
            url={videoUrl}
            width="800px"
            height="450px"
            autoPlay={true}
            controls={true}
        />
    );
};

export default TrailerPlayer;