import React from 'react';
import LibrarySong from './LibrarySong';
import { library } from '@fortawesome/fontawesome-svg-core';

const Library = ({ songs, setCurrentSong, isPlaying, setSongs, libraryStatus, audioRef }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library': ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                <LibrarySong
                    id={song.id}
                    key={song.id}
                    songs={songs}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                    setCurrentSong={setCurrentSong}
                    song={song}
                    audioRef={audioRef}
                />
                ))}
            </div>
        </div>
    )
}

export default Library;