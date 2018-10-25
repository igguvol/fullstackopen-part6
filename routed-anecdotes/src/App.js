import React from 'react'
import {Route, Switch, NavLink, Link, BrowserRouter as Router} from 'react-router-dom'
import { Button, Label, Input, Col, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import Anecdote from './components/Anecdote'

const Menu = () => {
  const activeStyle = {backgroundColor:'steelblue', border:'1px solid black', padding:'1em', color:'white', fontWeight:'bold'}
  return (
    <div style={{backgroundColor:'lightblue', padding:'1em'}}>
      <NavLink activeStyle={activeStyle} exact to='/'>anecdotes</NavLink>&nbsp;
      <NavLink activeStyle={activeStyle} exact to='/create'>create new</NavLink>&nbsp;
      <NavLink activeStyle={activeStyle} exact to='/about'>about</NavLink>&nbsp;
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  
  const className="list-group-item";
  return (
    <div>
      <h2>Anecdotes</h2>
      <ListGroup>
        {anecdotes.map(anecdote => <ListGroupItem className={className} key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
      </ListGroup>
    </div>
  );
}

const About = () => (
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>About anecdote app</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6" style={{margin:'auto'}}>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      <div class="col-sm-4" style={{margin:'auto'}}>
        <img style={{maxWidth:'100%'}} src="https://i.ytimg.com/vi/jUibaPTXSHk/hqdefault.jpg" />
      </div>
    </div>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.setNotification( `a new anecdote ${this.state.content} created!` )
  }

  render() {
    console.log('history:',this.props.history);
    return(
        <div>
          <h2>create a new anecdote</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='content'>
              content
              </Label> 
              <Input id='content' type='textarea' style={{marginLeft:'auto'}} name='content' value={this.state.content} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup row>
              <Label for='author' sm={2}>
                author
              </Label>  
              <Col sm={10}>
                <Input id='author' name='author' value={this.state.author} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row> 
              <Label for='info' sm={2}>
                url for more info
              </Label> 
              <Col sm={10}>
                <Input id='info' name='info' value={this.state.info} onChange={this.handleChange} />
              </Col>
            </FormGroup> 
            <Button>create</Button>
          </Form  >
        </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  setNotification = (notification) => {
    this.setState( {notification:notification} );
    setTimeout( () => this.setState( {notification:'' } ), 10000 )
    }



  render() {
    //console.log('App.state ', this.state)
    const notificationStyle = { border:"1px solid green", borderRadius:"5px", padding:'1em', margin:'1em' }
    return (
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              {this.state.notification!==''&&(<div style={notificationStyle}>{this.state.notification}</div>)}
              <Switch>
                <Route exact path='/'>
                  <AnecdoteList anecdotes={this.state.anecdotes} />
                </Route>
                <Route exact path='/anecdotes/:id' render={({match}) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} />
                } >
                </Route>
                <Route exact path='/about'>
                  <About />      
                </Route>
                <Route exact path='/create' render={({history}) => 
                  <CreateNew addNew={this.addNew} history={history} setNotification={this.setNotification}/>
                }>
                </Route>
              </Switch>
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;
