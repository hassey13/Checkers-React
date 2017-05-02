import React, { Component } from 'react'

class Menu extends Component {

  startNewGame() {
    this.props.onDismiss()
    this.props.newBoard()
  }

  listRules() {
    this.props.onDismiss()
    this.props.showRules()
  }

  resignGame() {
    console.warn('Resignation coming soon, for now stick it out!')
    this.props.onDismiss()
  }

  render() {

    let className = this.props.show ? 'menu' : 'hide'

    return (
      <div className={ className } >
        <div className='menu-dismiss' onClick={ this.props.onDismiss } >X</div>
        <div className='menu-title'>Menu</div>
        <div className='menu-option' onClick={ this.startNewGame.bind( this ) }>New Game</div>
        <div className='menu-option' onClick={ this.props.continueGame }>Continue Game</div>
        <div className='menu-option' onClick={ this.listRules.bind( this ) }>Rules</div>
        <div className='menu-option' onClick={ this.resignGame.bind( this ) }>Resign</div>
      </div>
    )
  }
}

export default Menu
