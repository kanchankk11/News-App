import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'

export default class News extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>Top headlines</h2>

        <div className='row'>
            <div className='col-md-4 col-sm-12'>
                <Newsitem title="mytitle" desc="my desc"/>
            </div>

            <div className='col-md-4 col-sm-12'>
                <Newsitem title="mytitle" desc="my desc"/>
            </div>

            <div className='col-md-4 col-sm-12'>
                <Newsitem title="mytitle" desc="my desc" />
            </div>
        </div>
        
      </div>
    )
  }
}
