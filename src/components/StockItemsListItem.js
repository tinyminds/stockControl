import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteItem } from "../actions";
import { editStockitem } from "../actions";
import { addStockitem } from "../actions";
const Thetype = (props) => {
  return (
    <span>{props.type}</span>
  );
};
class StockItemsListItem extends Component {
  constructor () {
    super();
    this.state = {
      isEditable : ""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleDeleteClick = deleteItemId => {
    const { deleteItem, auth } = this.props;
    deleteItem(deleteItemId, auth.uid);
  };

  handleEditClick = editItemId => {
     this.setState({isEditable:editItemId});
  };
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    evt.preventDefault();
  };

  handleEditSave = editItemId => {
    const { editStockitem, auth } = this.props;
    this.setState({isEditable:""});
    let type = !this.state.type?this.props.stockItem.type:this.state.type;
    let subtype = !this.state.subtype?this.props.stockItem.subtype:this.state.subtype;
    let price=!this.state.price?this.props.stockItem.price:this.state.price;
    let material=!this.state.material?this.props.stockItem.material:this.state.material;
    let submaterial=!this.state.submaterial?this.props.stockItem.submaterial:this.state.submaterial;
    let description=!this.state.description?this.props.stockItem.description:this.state.description;
    let quantity= !this.state.quantity?this.props.stockItem.quantity:this.state.quantity;
    let soldquantity= !this.state.soldquantity?this.props.stockItem.soldquantity:this.state.soldquantity;
    let isstocklive= !this.state.isstocklive?this.props.stockItem.isstocklive:this.state.isstocklive;  
    editStockitem({ subtype: subtype,
                    type: type, 
                    price: price,
                    material: material,
                    submaterial: submaterial,
                    description: description,
                    quantity: quantity,
                    soldquantity: soldquantity,
                    isstocklive: isstocklive  
                  }, auth.uid, this.props.stockItemId);
 };
 handleCopy = editItemId => {
  const { addStockitem, auth } = this.props;
  this.setState({isEditable:""});
 addStockitem({
              subtype: this.props.stockItem.subtype,
              type: this.props.stockItem.type, 
              price: this.props.stockItem.price,
              material: this.props.stockItem.material,
              submaterial: this.props.stockItem.submaterial,
              description: this.props.stockItem.description,
              quantity: this.props.stockItem.quantity,
              soldquantity: this.props.stockItem.soldquantity,
              isstocklive: this.props.stockItem.isstocklive  
            }, auth.uid)
 };
  render() {
    const { stockItemId, stockItem } = this.props;
    if(this.state.isEditable === stockItemId)
    {
      return(      
      <div key="stockItemName" className="col s10 offset-s1 to-do-list-item purple">
      <p>item id : {stockItemId}</p>
       
        <div id="add-form" className="col s10 offset-s1">
        <form onSubmit={this.handleEditSave}>
          <div className="input-field">
            <input name="type"
            defaultValue={stockItem.type}
              onChange={this.handleChange}
              id="type"
              type="text"
            />
            <label htmlFor="type">Type of item</label>
            </div>
  
            <div className="input-field">
            <input name="subtype"
            defaultValue={stockItem.subtype}
            onChange={this.handleChange}
            id="subtype"
            type="text"
          />
          <label htmlFor="subtype">SubType of item</label>
          </div>

          <div className="input-field">
            <input name="material"
            defaultValue={stockItem.material}
            onChange={this.handleChange}
            id="material"
            type="text"
          />
          <label htmlFor="material">Material</label>
          </div>

          <div className="input-field">
            <input name="submaterial"
            defaultValue={stockItem.submaterial}
            onChange={this.handleChange}
            id="submaterial"
            type="text"
          />
          <label htmlFor="submaterial">SubType of material</label>
          </div>

          <div className="input-field">
            <input name="description"
            defaultValue={stockItem.description}
            onChange={this.handleChange}
            id="description"
            type="text"
          />
          <label htmlFor="description">Description</label>
          </div>

          <span className="input-field">Live?
            <input name="isstocklive"
            defaultValue={stockItem.isstocklive}
            onChange={this.handleChange}
            id="isstocklive"
            type="number" max="1" min="0"
          />
          </span>

          <span className="input-field">Quantity:
            <input name="quantity"
            defaultValue={stockItem.quantity}
            onChange={this.handleChange}
            id="quantity"
            type="number" min="0"
          />
          </span>

          <span className="input-field">Sold Quantity:
            <input name="soldquantity"
            defaultValue={stockItem.soldquantity}
            onChange={this.handleChange}
            id="soldquantity"
            type="number"  min="0"
          />
          </span>

          <span className="input-field">Price: £
          <input name="price"
          defaultValue={stockItem.price}
          onChange={this.handleChange}
          id="price"
          type="number"
          />
          </span>
         
        </form>
      </div>
        
        <p>
        <button type="submit"
        className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
        onClick={() => this.handleEditSave(stockItemId)} >
        <i className="large material-icons">save</i>
        </button>
        <button type="button"
        className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
        onClick={() => this.handleCopy(stockItemId)} >
        <i className="large material-icons">content_copy</i>
        </button>
        </p> 
      </div>
       );
    }
    else
    {
    return (
      <div key="stockItemName" className="col s10 offset-s1 to-do-list-item teal">
        <p>
        <Thetype type={stockItem.type}/> - {stockItem.subtype}. made from: {stockItem.material} - {stockItem.submaterial}
          <br/>{stockItem.description}
          <span
            className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteClick(stockItemId) } } >
            <i className="large material-icons">delete</i>
          </span>
          <span
            className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
            onClick={() => this.handleEditClick(stockItemId)} >
            <i className="large material-icons">edit</i>
          </span>
        </p>
        <p>Price: {stockItem.price} | Quanity: {stockItem.quantity} | Amount Sold: {stockItem.soldquantity} | Is in shop: { stockItem.isstocklive == 1 ? 'Yes' : 'No' }</p>
      </div>
    );}
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { deleteItem, editStockitem, addStockitem })(StockItemsListItem);
