import React from 'react'
import DropDown from './dropdown'


export default function DeckSearchFilters(props) {

	const getFilter = (filterName, filterValue) => {
		props.getFilter(filterName, filterValue)
	}

	const renderFilters = () => {


		const classes = ["Neutral", "Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()
        const sorting = ["Name", "LightForge Score", "Standard Usage", "Wild Usage", "Mana"]
        const format = ['Standard', 'Wild']
        
        return (
            <div className='row'>
                <div className='col-sm-12 '>
                    <h4 className='text-center filters-container-header'>Filters</h4>
                    <DropDown filterName='Class' filter='hero' onChange={getFilter}  options={classes}/>
                </div>
                <div className='col-sm-12 '>
                    <DropDown filterName='Format' filter='format' onChange={getFilter}  options={format}/>
                </div>
                <div className='col-sm-12 '>
                    <DropDown filterName='Archetype' filter='archetype' onChange={getFilter}  options={props.archetypes || []}/>
                </div>
            </div>
        )
    }
    
    return (
        <div className='deck-search-fltrs-panel'>
            <div className='panel panel-default'>
                <div className='panel-heading filter-panel-heading'>
                    <div className='filter-heading-cntr'>
                        <div className='filters-hdr'>
                            Filters
                        </div>
                    </div>
                </div>
                <div className='panel-body'>
                    {renderFilters()}
                </div>
            </div>
        </div>
    )
}