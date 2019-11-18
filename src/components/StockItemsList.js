import "./StockItemsList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import StockItemsListItem from "./StockItemsListItem";
import Preloader from "./Preloader";
import { Inputs } from "./Inputs"
const initialState = {
  addFormVisible: false,
  subtype: "",
  type: "",
  price: 0,
  material: "",
  submaterial: "",
  description: "",
  quantity: 1,
  isstocklive: 0,
  labelwritten: 0,
  soldquantity: 0
}
class StockItemsList extends Component {
  constructor () {
    super();
    this.state = {
      ...initialState,
      showLive:false,
      showNotLive:false,
      showQuantityZero: false,
      showLabeled:false,
      showUnlabeled:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFilter(type, val) {
    this.setState({showNotLive : false});
    this.setState({showQuantityZero : false});
    this.setState({showLabeled : false});
    this.setState({showUnlabeled : false});
    this.setState({showLive : false});
    this.setState({[type] : val});
  };

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleFormSubmit (event) {
    const { addStockitem, auth } = this.props;
    event.preventDefault();
    addStockitem({  subtype: this.state.subtype,
                    type: this.state.type, 
                    price: this.state.price,
                    material: this.state.material,
                    submaterial: this.state.submaterial,
                    description: this.state.description,
                    quantity: this.state.quantity,
                    isstocklive: this.state.isstocklive,
                    labelwritten: this.state.labelwritten,
                    soldquantity: this.state.soldquantity 
                  }, auth.uid);
    this.setState({ ...initialState, addFormVisible:true });
  };

  renderAddForm = () => {
    if (this.state.addFormVisible) {
      return (
        <div id="add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
          <Inputs name={"type"} type={"text"} label={"Type of item"} 
          onChange={this.handleChange} 
          value={this.state.type}
          /> 
          <Inputs name={"subtype"} type={"text"} label={"Subtype of item"} 
          onChange={this.handleChange} 
          value={this.state.subtype}
          /> 
          <Inputs name={"material"} type={"text"} label={"Material"} 
          onChange={this.handleChange} 
          value={this.state.material}
          />
          <Inputs name={"submaterial"} type={"text"} label={"Subtype of material"} 
          onChange={this.handleChange} 
          value={this.state.submaterial}
          />
          <Inputs name={"description"} type={"text"} label={"Description"}
          onChange={this.handleChange} 
          value={this.state.description}
          />
          <Inputs name={"isstocklive"} type={"number"} title={"Live?"} min={"0"} max={"1"}
          onChange={this.handleChange} 
          value={this.state.isstocklive}
          />
          <Inputs name={"quantity"} type={"number"} title={"Quantity"} min={"0"}
          onChange={this.handleChange} 
          value={this.state.quantity}
          />
          <Inputs name={"soldquantity"} type={"number"} title={"Sold Quantity"} min={"0"}
          onChange={this.handleChange} 
          value={this.state.soldquantity}
          />
          <Inputs name={"price"} type={"number"} title={"Price: £"} min={"0"}
          onChange={this.handleChange} 
          value={this.state.price}
          />
          <Inputs name={"labelwritten"} type={"number"} title={"Labeled?"} min={"0"} max={"1"}
          onChange={this.handleChange} 
          value={this.state.labelwritten}
          />
            <br/>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  };

  renderStockItems() {
    const { data } = this.props;
    const stockItems = _.map(data, (value, key) => {
      if(this.state.showLive&&value.isstocklive==1){
      return <StockItemsListItem key={key} stockItemId={key} stockItem={value}/>;
      }
      if(this.state.showNotLive&&value.isstocklive==0){
        return <StockItemsListItem key={key} stockItemId={key} stockItem={value}/>;
      }
      if(this.state.showLabeled&&value.labelwritten==1){
        return <StockItemsListItem key={key} stockItemId={key} stockItem={value}/>;
      }
      if(this.state.showUnlabeled&&value.labelwritten==0){
          return <StockItemsListItem key={key} stockItemId={key} stockItem={value}/>;
      }
      if(this.state.showQuantityZero&&value.quantity==0){
          return <StockItemsListItem key={key} stockItemId={key} stockItem={value}/>;
      }
      if(!this.state.showLive&&!this.state.showNotLive&&!this.state.showQuantityZero&&!this.state.showUnlabeled&&!this.state.showLabeled)
      {
        return <StockItemsListItem key={key} stockItemId={key} stockItem={value}/>;
      }  
    });
    
    const totalItems = _.size(stockItems);
    if (!_.isEmpty(stockItems)) {
      return ( <div>{stockItems}<div className="col s10 offset-s1" itemscount={totalItems}>num of items: {totalItems}</div> </div>) ;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing Items"
          id="nothing-was-found"
          src="/img/nothing.png"
        />
        <h4>No Items of stock found</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentDidMount() {
    const { auth } = this.props;
    this.props.fetchStockItems(auth.uid);
  }

  render() {
    const { addFormVisible, showLive, showNotLive, showQuantityZero, showLabeled, showUnlabeled } = this.state;
    if (this.props.data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }
    return (
      <div className="list-container">
        <div className="row">
        <br/>
         
          {this.renderAddForm()}
          {this.renderStockItems()}
         
        </div>
        <div className="fixed-action-btn">
      
        <button
        onClick={() => this.handleFilter("showQuantityZero", showQuantityZero?false:true)}
        className="teal txtBut">
          {showQuantityZero ? (<i>Show all</i>) : (<i>Filter by Quantity Zero</i>)}
        </button>

         <button
         onClick={() => this.handleFilter("showLive", showLive?false:true)}
         className="teal txtBut">
          {showLive ? (<i>Show all</i>) : (<i>Filter by Live</i>)}
         </button>
         
         <button
          onClick={() => this.handleFilter("showNotLive", showNotLive?false:true)}
          className="teal txtBut">
        {showNotLive ? (<i>Show all</i>) : (<i>Filter by not Live</i>)}
        </button>

        <button
            onClick={() => this.handleFilter("showLabeled", showLabeled?false:true)}
            className="teal txtBut" >
          {showLabeled ? (<i>Show all</i>) : (<i>Filter by Labeled</i>)}
          </button>

          <button
          onClick={() => this.handleFilter("showUnlabeled", showUnlabeled?false:true)}
          className="teal txtBut">
        {showUnlabeled ? (<i>Show all</i>) : (<i>Filter by UnLabeled</i>)}
        </button>

          <button
            onClick={this.props.signOut}
            id="sign-out-button"
            className="btn-floating btn-large teal darken-4">
            <i className="large material-icons">exit_to_app</i>
          </button>
      
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4">
            {addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
              <i className="large material-icons">add</i>
            )}
          </button>
          
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(StockItemsList);
