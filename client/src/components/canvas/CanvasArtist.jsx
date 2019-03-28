import React, { PureComponent } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { SwatchesPicker } from 'react-color'
import { connect } from 'react-redux'
import { updateGame } from '../../actions/games'
import Scoreboard from '../scoreboard/Scoreboard';

class CanvasArtist extends PureComponent {

    state = {
        color: "",
        background: '#fff',
        //ref: null
    }

    handleChangeColor = (color) => {
        this.setState({ color : color.hex })
    }

    //updateDrawing = () => {
        // const data = this.state.ref.lines
        // // const {ref} = this.state
        // // const data = ref.getSaveData()
        // console.log('data', data)
        // return updateGame(data)
    //}

    updateDrawing = () => {
        console.log('props update drawing', this.props.gameId)
        console.log('state update drawing', this.state)
        const { updateGame } = this.props //games,
        localStorage.setItem(
            "savedDrawing", this.saveableCanvas.getSaveData()
        )
        const drawing = localStorage.getItem("savedDrawing")
        updateGame(this.props.gameId, drawing)

        console.log('drawing updatedrawing', drawing)
        console.log('this.props.gameId',this.props.gameId)


        //console.log('games updatedrawing', games[1])

    }

    render() {
        console.log('canvasArtist State',this.state)
        console.log('canvasArtist Props',this.props)
        
        return (
            <div id='canvas' onClick={this.updateDrawing}>

                <div>
                <CanvasDraw 
                    id='canvasdraw'
                    style={{    display: 'flex', 
                                border:'1px solid' ,
                                margin: '0 auto' }} 

                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)
                        // canvasDraw => { 
                        // if(this.state.ref !== null) return
                        // this.setState({ ref: canvasDraw })
                        //}
                    }
                    canvasWidth={500}
                    canvasHeight={300}
                    brushColor={this.state.color}
                    brushRadius={6}
                    lazyRadius={0}
                    />
                </div>   

                <div>
                <SwatchesPicker onChangeComplete={this.handleChangeColor}
                                style={{    display: 'flex', 
                                            border:'1px solid' ,
                                            margin: '0 auto',
                                            height: 300,
                                            width: 500
                                            }} />    
                <button onClick={() => { this.saveableCanvas.clear() }} >
                    Clear
                </button>
                <button
                        onClick={() => { this.saveableCanvas.undo() }} >
                    Undo
                </button>
                </div>

                <div>
                    <Scoreboard />
                </div>
                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    
    games: state.games,
    
})

const mapDispatchToProps ={
    updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasArtist)