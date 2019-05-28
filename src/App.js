import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import FolderMain from './FolderMain';
import FolderSidebar from './FolderSidebar';
import MainMain from './MainMain';
import MainSidebar from './MainSidebar';
import NoteMain from './NoteMain';
import NoteSidebar from './NoteSidebar';
import dummyStore from './dummy-store';
// Add Not Found route
import './App.css';


class App extends Component {
  state={
    folders:[],
    notes:[]
  }

  componentWillMount() {
    this.setState(dummyStore);
  }
  
  navRoutes() {
    return (
      <Switch>
        <Route 
          exact 
          path='/' 
          render={() =>
            <MainSidebar
              folders={this.state.folders}
            />
          }
        />

        <Route 
          path='/folder/:folderId' 
          render={() =>
            <FolderSidebar
              folders={this.state.folders}
            />
          } 
        />

        <Route 
          path='/note/:noteId' 
          render={(routeProps) => {

            return (
            <NoteSidebar
              folderName={
                // params
                // routeProps.match.params.noteId
                // match to notes
                // this.state.notes.find()
                // match folder to folder
                this.state.folders.find(folder => folder.name === this.state.notes.find(note => note.id === routeProps.match.params.noteId)
                )
              }
            />);
          }
          } 
        />
      </Switch>
    );
  }

  mainRoutes() {
    return (
      <Switch>
        <Route 
          exact
          path='/' 
          render={() =>
            <MainMain
              folders={this.state.folders}
            />
          }
        />

        <Route 
          path='/folder/:folderId' 
          render={() =>
            <FolderMain
              folders={this.state.folders}
            />
          } 
        />

        <Route 
          path='/note/:noteId' 
          render={(routeProps) =>
            <NoteMain
              findNote={this.state.notes.find(note => note.id === routeProps.match.params.noteId)}
            />
          } 
        />
        {/* Make a Not Found route */}
      </Switch>
    );
  }

  render() {
    <React.Fragment>
      <header className='appHeader'>
        <h1>
          <Link to='/'>Noteful</Link>
        </h1>  
      </header>

      <nav className='appNav'>
        {this.navRoutes()}
      </nav>
      
      <main className='appMain'>
        {this.mainRoutes()}  
      </main>
    </React.Fragment>
  }
}

export default App;
