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
  isstocklive: 1
}
class StockItemsList extends Component {
  constructor () {
    super();
    this.state = {
      ...initialState
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

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
                    isstocklive: this.state.isstocklive  
                  }, auth.uid);
    this.setState({ ...initialState, addFormVisible:true });
  };

  renderAddForm = () => {
    const { 
      addFormVisible,
      subtype,
      type,
      price,
      material,
      submaterial,
      description,
      quantity,
      isstocklive 
    } = this.state;
    if (addFormVisible) {
      return (
        <div id="add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
          <Inputs name={"type"} type={"text"} label={"Type of item"} 
          onChange={this.handleChange} 
          value={type}
          /> 
          <Inputs name={"subtype"} type={"text"} label={"Subtype of item"} 
          onChange={this.handleChange} 
          value={subtype}
          /> 
          <Inputs name={"material"} type={"text"} label={"Material"} 
          onChange={this.handleChange} 
          value={material}
          />
          <Inputs name={"submaterial"} type={"text"} label={"Subtype of material"} 
          onChange={this.handleChange} 
          value={submaterial}
          />
          <Inputs name={"description"} type={"text"} label={"Description"}
          onChange={this.handleChange} 
          value={description}
          />
          <Inputs name={"isstocklive"} type={"number"} title={"Live?"} min={"0"} max={"1"}
          onChange={this.handleChange} 
          value={isstocklive}
          />
          <Inputs name={"quantity"} type={"number"} title={"Quantity"} min={"0"}
          onChange={this.handleChange} 
          value={quantity}
          />
          <Inputs name={"price"} type={"number"} title={"Price: £"} min={"0"}
          onChange={this.handleChange} 
          value={price}
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

    //here is where i can reorder the list, make new const of map then sort then return
    const stockItems = _.map(data, (value, key) => {
      return <StockItemsListItem key={key} stockItemId={key} stockItem={value} />;
    });
    if (!_.isEmpty(stockItems)) {
      return stockItems;
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
    const { addFormVisible } = this.state;
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
          {this.renderAddForm()}
          {this.renderStockItems()}
        </div>
        <div className="fixed-action-btn">
          <button
            onClick={this.props.signOut}
            id="sign-out-button"
            className="btn-floating btn-large teal darken-4"
          >
            <i className="large material-icons">exit_to_app</i>
          </button>
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4"
          >
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
