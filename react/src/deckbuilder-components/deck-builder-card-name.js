import React from 'react'

export default function DeckCardName(props) {

    var source = `https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png`

    const removeCard = (event) => {
        console.log('hey')
        let cardName = props.name
        props.removeCard(cardName)
    }

    const mana = () => {


        if (!props.mana && !props.cost) {
           return <div className='card-deck-list-mana animated fadeInRight'>0</div>                        
        }

        if (props.mana === 0) {
           return <div className='card-deck-list-mana animated fadeInRight'>0</div>            
        }

        if (props.cost === 0) {
            return <div className='card-deck-list-mana animated fadeInRight'>0</div>                        
        }

        if (props.mana >= 10) {
            return <div className='card-deck-list-mana-10 animated fadeInRight'>{props.mana}</div>            
         }
 
         if (props.cost >= 10) {
             return <div className='card-deck-list-mana-10 animated fadeInRight'>{props.cost}</div>                        
         }

        

        if (props.mana) {
            return <div name={props.name} className='card-deck-list-mana animated fadeInRight'>{props.mana}</div>                                    
        }

        if (props.cost) {
            return <div name={props.name} className='card-deck-list-mana animated fadeInRight'>{props.cost}</div>
        }
        
    }

    // return (
    //     <div className='animated fadeInRight tile-container' name={props.card} onClick={removeCard}>
    //         <div>
    //             <div  className='deck-list-card-name animated fadeInRight'>
    //             {props.name} {(props.quantity === 2) ? (<span className='animated fadeInRight'>x{props.quantity}</span>) : null}
    //             </div>
    //         <div className='card-tile center-block animated fadeInRight' name={props.card}>
    //             <div className='gray-box animated fadeInRight' name={props.card} >
    //                 {mana()}
    //             </div>
    //             <div className='tile-img-cntr animated fadeInRight' name={props.card} >
    //                 <img name={props.name} alt={`${props.quantity} ${props.name}`} className='card-tile animated fadeInRight' src={source} />
    //             </div>
    //         </div> 
    //         </div>
    //     </div>
    // )
    
    return (
        <div className='animated fadeInRight deck-search-list-ctr' key={props.cardId} onClick={removeCard}> 
            <div className='' name={props.card} className='animated fadeInRight deck-list-tile-container'>
                <div>
                    <span  className='animated fadeInRight deck-list-cn'>
                    {props.name} {(props.quantity === 2) ? (<span className=''>x{props.quantity}</span>) : null}
                    </span>
                <div className='animated fadeInRight deck-card-tile center-block' name={props.card}>
                    <div className='deck-gray-box' name={props.card} >
                        {mana()}
                    </div>
                    <div className='animated fadeInRight tile-img-cntr' name={props.card} >
                        <img name={props.name} alt={`${props.quantity} ${props.name}`} className='animated fadeInRight deck-card-tile' src={source} />
                    </div>
                </div> 
                </div>
            </div>
        </div>
    )

}