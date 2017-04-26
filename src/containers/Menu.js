import React, { Component } from 'react'

class Menu extends Component {

  constructor() {
    super()

    this.state = {
      board: null
    }
  }

  startNewGame() {
    this.props.onDismiss()
    this.props.updateBoard()
  }

  loadGame() {
    this.props.onDismiss()
    this.props.updateBoard()
  }

  listRules() {
    this.props.onDismiss()
  }

  resignGame() {
    this.props.onDismiss()
  }

  render() {

    let className = this.props.show ? 'menu' : 'hide'

    return (
      <div className={ className } >
        <div className='menu-dismiss' onClick={ this.props.onDismiss } >X</div>
        <div className='menu-title'>Menu</div>
        <div className='menu-option' onClick={ this.startNewGame.bind( this ) }>New Game</div>
        <div className='menu-option' onClick={ this.loadGame.bind( this ) }>Continue Game</div>
        <div className='menu-option' onClick={ this.listRules.bind( this ) }>Rules</div>
        <div className='menu-option' onClick={ this.resignGame.bind( this ) }>Resign</div>
      </div>
    )
  }
}

export default Menu
