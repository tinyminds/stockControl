import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteItem } from "../actions";
import { editStockitem } from "../actions";
import { addStockitem } from "../actions";
import { Inputs } from "./Inputs"

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
    //state won't update on null values
    if(!evt.target.value){this.setState({ [evt.target.name]: "nullState" });}
    else{this.setState({ [evt.target.name]: evt.target.value });}
    evt.preventDefault();
  };

  handleEditSave = editItemId => {
    const { editStockitem, auth } = this.props;
    this.setState({isEditable:""});

    let type = !this.state.type?this.props.stockItem.type:this.state.type;
    let subtype = !this.state.subtype?this.props.stockItem.subtype:this.state.subtype;
    let price= !this.state.price?this.props.stockItem.price:this.state.price;
    let material= !this.state.material?this.props.stockItem.material:this.state.material;
    let submaterial= !this.state.submaterial?this.props.stockItem.submaterial:this.state.submaterial;
    let description= !this.state.description?this.props.stockItem.description:this.state.description;
    let quantity= !this.state.quantity?this.props.stockItem.quantity:this.state.quantity;
    let isstocklive= !this.state.isstocklive?this.props.stockItem.isstocklive:this.state.isstocklive;  
    editStockitem({ subtype: subtype==="nullState"?"":subtype,
                    type: type==="nullState"?"":type, 
                    price: price==="nullState"?"":price,
                    material: material==="nullState"?"":material,
                    submaterial: submaterial==="nullState"?"":submaterial,
                    description: description==="nullState"?"":description,
                    quantity: quantity==="nullState"?"":quantity,
                    isstocklive: isstocklive==="nullState"?"":isstocklive  
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
              isstocklive: this.props.stockItem.isstocklive  
            }, auth.uid)
 };
  render() {
    const { stockItemId, stockItem } = this.props;
    if(this.state.isEditable === stockItemId)
    {
      return(      
      <div key="stockItemName" className="col s10 offset-s1 list-item purple">
      <p>item id : {stockItemId}</p>
       
        <div id="add-form" className="col s10 offset-s1">
        <form onSubmit={this.handleEditSave}>

        <Inputs name={"type"} type={"text"} label={"Type of item"} 
        onChange={this.handleChange} 
        defaultValue={stockItem.type}
        /> 
        <Inputs name={"subtype"} type={"text"} label={"Subtype of item"} 
        onChange={this.handleChange} 
        defaultValue={stockItem.subtype}
        /> 
        <Inputs name={"material"} type={"text"} label={"Material"} 
        onChange={this.handleChange} 
        defaultValue={stockItem.material}
        />
        <Inputs name={"submaterial"} type={"text"} label={"Subtype of material"} 
        onChange={this.handleChange} 
        defaultValue={stockItem.submaterial}
        />
        <Inputs name={"description"} type={"text"} label={"Description"}
        onChange={this.handleChange} 
        defaultValue={stockItem.description}
        />
        <Inputs name={"isstocklive"} type={"number"} title={"Live?"} min={"0"} max={"1"}
        onChange={this.handleChange} 
        defaultValue={stockItem.isstocklive}
        />
        <Inputs name={"quantity"} type={"number"} title={"Quantity"} min={"0"}
        onChange={this.handleChange} 
        defaultValue={stockItem.quantity}
        />
        <Inputs name={"price"} type={"number"} title={"Price: £"} 
        onChange={this.handleChange} 
        defaultValue={stockItem.price}
        />
        </form>
      </div>
        
        <span
        className="complete-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
        onClick={() => this.handleEditSave(stockItemId)} >
        <i className="large material-icons">save</i>
        </span>
        <span
        className="complete-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
        onClick={() => this.handleCopy(stockItemId)} >
        <i className="large material-icons">content_copy</i>
        </span>
      </div>
       );
    }
    else
    {
    return (
      <div key="stockItemName" className="col s10 offset-s1 list-item teal">
      <span
      className="complete-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
      onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteClick(stockItemId) } } >
      <i className="large material-icons">delete</i>
    </span>
    <span
      className="complete-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
      onClick={() => this.handleEditClick(stockItemId)} >
      <i className="large material-icons">edit</i>
    </span>
          {stockItem.subtype} {stockItem.type} {stockItem.material? "made from ":""}{stockItem.material}{stockItem.submaterial? ": ":""}{stockItem.submaterial}
          <br/>Price: £{stockItem.price} | Quantity: {stockItem.quantity} | { stockItem.isstocklive === 1 ? 'In shop' : 'Not in shop' }
          <br/>{stockItem.description? 'Description: ' : '' }{stockItem.description}
          <br/>
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
