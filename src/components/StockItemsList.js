import "./StockItemsList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import StockItemsListItem from "./StockItemsListItem";
import Preloader from "./Preloader";
const initialState = {
  addFormVisible: false,
  subtype: "",
  type: "",
  price: 0,
  material: "",
  submaterial: "",
  description: "",
  quantity: 1,
  soldquantity: 0,
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
                    soldquantity: this.state.soldquantity,
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
      soldquantity,
      isstocklive 
    } = this.state;
    if (addFormVisible) {
      return (
        <div id="add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <input name="type"
                value={type}
                onChange={this.handleChange}
                id="type"
                type="text"
              />
              <label htmlFor="type">Type of item</label>
              </div>
    
              <div className="input-field">
              <input name="subtype"
              value={subtype}
              onChange={this.handleChange}
              id="subtype"
              type="text"
            />
            <label htmlFor="subtype">SubType of item</label>
            </div>

            <div className="input-field">
              <input name="material"
              value={material}
              onChange={this.handleChange}
              id="material"
              type="text"
            />
            <label htmlFor="material">Material</label>
            </div>

            <div className="input-field">
              <input name="submaterial"
              value={submaterial}
              onChange={this.handleChange}
              id="submaterial"
              type="text"
            />
            <label htmlFor="submaterial">SubType of material</label>
            </div>

            <div className="input-field">
              <input name="description"
              value={description}
              onChange={this.handleChange}
              id="description"
              type="text"
            />
            <label htmlFor="description">Description</label>
            </div>

            <span className="input-field">Is stock in a shop?
              <input name="isstocklive"
              value={isstocklive}
              onChange={this.handleChange}
              type="number" min="0" max="1"
            />
            </span>

            <span className="input-field">Quantity:
              <input name="quantity"
              value={quantity}
              onChange={this.handleChange}
              id="quantity"
              type="number" min="0"
            />
            </span>

            <span className="input-field">Sold Quantity:
              <input name="soldquantity"
              value={soldquantity}
              onChange={this.handleChange}
              id="soldquantity"
              type="number"  min="0"
            />
            </span>

            <span className="input-field">Price: £
            <input name="price"
            value={price}
            onChange={this.handleChange}
            id="price"
            type="number" 
            />
            </span>
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
      <div className="to-do-list-container">
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
