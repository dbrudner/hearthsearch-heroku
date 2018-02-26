import React from 'react'
import wild from '../images/wild.svg'
import standard from '../images/standard.svg'
import ReactFitText from 'react-fittext'

export default class WildOrStandard extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            format: ''
        }
    }

    handleClick = event => {

        this.props.getFormat(event.target.name)
    }

    handleHover = event => {

        console.log(event.target.name)


        this.setState({
            format: event.target.name
        })
    }


    render() {
        return (
            <div className='wild-or-standard-cntr'>
                <div className='format-header'>
                </div>
                <div className='animated fadeIn format-hdr text-center'>
                    {this.state.format || 'Choose Format'}
                </div>  
                <div className='row'>
                    <div className='col-xs-6 col-sm-6 icon-cntr animated fadeIn'>
                        <div className='standard center-block'>
                            <img onMouseEnter={this.handleHover} name="Standard" onClick={this.handleClick} className='format-icon hvr-fade' src={standard} />
                        </div>
                    </div>
    
                    <div class='col-xs-6 col-sm-6 icon-cntr'>
                        <div className='wild center-block'>
                            <img onMouseEnter={this.handleHover} name="Wild" onClick={this.handleClick} className='format-icon hvr-fade' src={wild} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
    
}