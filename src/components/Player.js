import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
    faVolumeMute,
    faVolumeUp
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo }) => {
    // State
    const [isMuted, setIsMuted] = useState(false);

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
    };
    // Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            setIsPlaying(!isPlaying);
            audioRef.current.pause();
        } else {
            setIsPlaying(!isPlaying);
            audioRef.current.play();
        }
    };
    const getTime = (time) => {
        return (
            // Format the time
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        } 
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };
    const muteHandler = (mute) => {
        if (mute === 'mute') {
            audioRef.current.muted = true;
            setIsMuted(true);
        } else if (mute === 'unmute') {
            audioRef.current.muted = false;
            setIsMuted(false);
        }
    };
    //Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationedPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        type="range"
                        onChange={dragHandler}
                        value={songInfo.currentTime}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')}  className="skip-forward" size="2x" icon={faAngleRight} />
                {
                    isMuted ?
                    <FontAwesomeIcon onClick={() => muteHandler('unmute')} size="2x" icon={faVolumeMute} />
                    :
                    <FontAwesomeIcon onClick={() => muteHandler('mute')} size="2x" icon={faVolumeUp} />
                }
            </div>
        </div>
    );
};

export default Player;