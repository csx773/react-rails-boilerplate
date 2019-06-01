import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Chat from './Chat.jsx';
import AnswererDeck from './AnswererDeck.jsx';
import QuestionerDeck from './QuestionerDeck.jsx';
import History from './History';
import QuestionSection from './QuestionSection.jsx';
import AnswerSection from './AnswerSection.jsx';
import { API_ROOT, API_WS_ROOT, HEADERS } from "./constants";
import actioncable from "actioncable";

//pass this cable prop down to any component that needs socket connections
const cable = actioncable.createConsumer(API_WS_ROOT);

const style = {
  marginTop: '5px',
  border: '1px solid',
  padding: '15px',
  borderRadius: '5px'
};

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // roominfo: (this.props.location.state || {}).info,
      gameTable: {}

    }
    // being passed down from parent component, will setup the sockect connection
    // Cable is working for now, but wrong channel
    cable.subscriptions.create({ channel: "GamesChannel", room: `${this.props.match.params.id}`}, {
      received: (data) => {
        // console.log('CABLE PROP DATA', data)
        console.log('INSIDE WS cable.subscription', data)
        this.handleRecievedGame(data)
      }
    })
  }

  handleRecievedGame(data) {
    // for incoming WS broadcasting to this room only
    console.log('INSIDE WS handleRecievedGame')
    console.log('data is:',data)
  }

  componentDidMount() {
    // http GET request to api/games
    const gameRoomId = this.props.match.params.id;
    console.log('roominfo: ',this.props.match.params.id)
    axios.get(`${API_ROOT}/games/${gameRoomId}`).then(res => {
      console.log("ComponentDidMount - GAME DATA", res.data);
      this.setState({gameTable: res.data})
    });

  }
  
  render() {
    console.log('PROPS:',this.props);
    console.log('State:',this.state);
    const gameTable = (this.state.gameTable)? this.state.gameTable : 'loading...'
 
    return (
      <div>
        {
          !Object.keys(this.state.gameTable).length 
            ? <div>loadinng</div> 
            : <div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3  border-bottom shadow-sm nav-bar-in-game">
                <div className="my-0 mr-md-auto font-weight-normal">
                  <h6 className='room-name'>Room: {gameTable.id} </h6>
                  <h3> {gameTable.theme}</h3>
                </div>
                <nav className="my-2 my-md-1 mr-md-3 game-round">
                  <div className="p-5">
                    <h6>Round: {gameTable.gameState.gameInfo.currentRound} / {gameTable.maxRound}</h6>
                    <h6>Players: {gameTable.gameState.gameInfo.currentPlayers} / {gameTable.maxPlayers}</h6>
                  </div>
                </nav>
                <nav className="my-2 my-md-1 mr-md-3">
                  <button className="btn btn-dark btn-md p-2">Start</button>
                </nav>
                <nav className="my-2 my-md-1 mr-md-3">
                  <Link to='/lobby'><button className="btn btn-dark btn-md p-2">Leave Room</button></Link>
                </nav>
              </div>
    
              <div className="ingame-room container">
                <form>
                  <div>
                    <div className="questioner col-9" style={style}>
                      <QuestionSection />
                    </div>
                    <div className='status-message'>
                    { <h6>{gameTable.gameState.gameInfo.status}</h6> }
                    </div>
                    <div className='play-card-button'>
                      <button className='btn btn-dark btn-md p-2'>Play Card</button>
                    </div>
                    <div className="answerers col-9" style={style}>
                      <AnswerSection userStatus={gameTable.gameState.playersInfo} currentQuestioner= {gameTable.gameState.gameInfo.currentQuestioner} maxPlayers={gameTable.maxPlayers}/>
                    </div>
                    <br />
                  </div>
                </form>
              </div>
              <div className="chat-history-bar">
                <div>
                  <History />
                </div>
                <div>
                  <Chat />
                </div>
              </div>
            </div>    
        }
      </div>
    )
      


    // return (
    //   <div>
    //     <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3  border-bottom shadow-sm nav-bar-in-game">
    //       <div className="my-0 mr-md-auto font-weight-normal">
    //         <h6 className='room-name'>>Room #{gameRoomInfo.id}: </h6>
    //         <h3> {gameRoomInfo.theme}</h3>
    //       </div>
    //       <nav className="my-2 my-md-1 mr-md-3 game-round">
    //         <div className="p-5">
    //           <h6>Round: {gameRoomInfo.games[0].gameState.gameInfo.currentRound} / {gameRoomInfo.games[0].gameState.maxRound}</h6>
    //         </div>
    //       </nav>
    //       <nav className="my-2 my-md-1 mr-md-3">
    //         <button className="btn btn-dark btn-md p-2">Start</button>
    //       </nav>
    //       <nav className="my-2 my-md-1 mr-md-3">
    //         <Link to='/lobby'><button className="btn btn-dark btn-md p-2">Leave Room</button></Link>
    //       </nav>
    //     </div>

    //     <div className="ingame-room container">
    //       <form>
    //         <div>
    //           <div className="questioner col-9" style={style}>
    //             <QuestionerDeck />
    //           </div>
    //           <div className='status-message'>
    //             <h6>Status Message</h6>
    //           </div>
    //           <div className='play-card-button'>
    //             <button className='btn btn-dark btn-md p-2'>Play Card</button>
    //           </div>
    //           <div className="answerers col-9" style={style}>
    //             <AnswererDeck />
    //           </div>
    //           <br />
    //         </div>
    //       </form>
    //     </div>
    //     <div className="chat-history-bar">
    //       <div>
    //         <History />
    //       </div>
    //       <div>
    //         <Chat />
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default Game;
