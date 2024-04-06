import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import Explore from "../explore/explore"
import Login from "../signin/login"
import SignUpForm from "../signin/signup"
import Sites from "../sites/site"
import Building from "../buildings/building"
import Labour from "../labours/labours"
import Finance from "../finance/fin"
import Emicalc from "../emicalc/emicalc"
import Legal from "../legal/legal"
import Contractors from "../home/team/Team"
const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUpForm} />
          <Route exact path='/site' component={Sites} />
          <Route exact path='/buildings' component={Building} />
          <Route exact path='/labours' component={Labour} />
          <Route exact path='/finance' component={Finance}/>
          <Route exact path='/emi-calculator' component={Emicalc}/>
          <Route exact path='/legal' component={Legal}/>
          <Route exact path='/contractors' component={Contractors}/>
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
