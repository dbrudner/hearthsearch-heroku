import React from 'react'
import sounds from './card-sounds-by-id'

export default function(props) {

    var result = []

    for (var key in sounds) {
        // console.log(typeof key);
        if (key === props.cardId) {
            result.push(sounds[key]);
        }
    }

    function playIntroSound() {

        if (result[0].play.length > 1) {

            {
                let tag = result[0].play[0].name
                let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
                let audio = new Audio(url);
                audio.play();            
            }
    
            {
                let tag = result[0].play[1].name
                let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
                let audio = new Audio(url);
                audio.play();    
            }
        }

        if (result[0].play.length === 1) {
            let tag = result[0].play[0].name
            let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
            let audio = new Audio(url);
            audio.play();
        }

    }

    function playAttackSound() {
        let tag = result[0].attack[0].name
        let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
        let audio = new Audio(url);
        audio.play()
    }

    function playDeathSound() {
        let tag = result[0].death[0].name
        let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
        let audio = new Audio(url);
        audio.play()
    }

    return (

        <div className='center-block text-center snd-brd-container'>
                <span className='' onClick={playAttackSound}>
                    <button className='hvr-fade btn snd-brd-btn'><i className="fas fa-play"></i> Attack</button>
                </span>
                <span className='' onClick={playIntroSound}>
                    <button className='hvr-fade btn snd-brd-btn margin-left-sbrd'><i className="fas fa-play"></i> Intro</button>
                </span>
                <span className='snd-brd-left-mrg' onClick={playDeathSound} >
                    <button className='hvr-fade btn snd-brd-btn'><i className="fas fa-play"></i> Death</button>
                </span>
        </div>
    )
}