import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, isPlaying, audioRef }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                <LibrarySong
                    id={song.id}
                    key={song.id}
                    songs={songs}
                    isPlaying={isPlaying}
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