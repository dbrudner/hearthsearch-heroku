import React from 'react'
import ClassLightForge from './class-lightforge'

export default function ClassBreakdown(props) {
    
    const classes = ["Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"]

    const tribe = ["Beast", "Demon", "Dragon", "Elemental", "Mech", "Murloc", "Pirate", "Totem"]
    const abilities = ["Charge", "Taunt", "Divine Shield", "Deathrattle", "Battlecry", "Silence", "Choose one", "Combo", "Adapt", "Discover", "Freeze", "Enrage", "Inspire", "Lifesteal", "Overload", "Windfury", "Poisonous", "Quest", "Stealth", "Draw", "Can't be targeted", "Discard"].sort()

    const lightForgeScores = {}

    classes.forEach(hero => {
        const score = props.cards.reduce((acc, card) => {

            if (card.lightForgeScore[0]) {
                if (card.playerClass.toLowerCase() === hero.toLowerCase() && card.lightForgeScore[0].Score > 0) {
                    return acc + card.lightForgeScore[0].Score
                } else {
                    return acc
                }
            } else {
                return acc
            }
        }, 0)

        const totalCards = props.cards.reduce((acc, card) => {

            if (card.lightForgeScore[0]) {
                if (card.playerClass.toLowerCase() === hero.toLowerCase() && card.lightForgeScore[0].Score > 0) {
                    return acc + 1
                } else {
                    return acc
                }
            } else {
                return acc
            }
        }, 0)

        const meanLightforgeScore = (score/totalCards).toFixed(2)

        const lightForgeAnalysis = {score, totalCards, meanLightforgeScore}

        lightForgeScores[hero] = lightForgeAnalysis
    })

    console.log(lightForgeScores)


    return (
        <div>
            <ClassLightForge/>
        </div>
    )
}