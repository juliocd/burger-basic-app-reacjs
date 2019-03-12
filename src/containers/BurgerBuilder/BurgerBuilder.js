import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PROCES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    beacon: 0.8
}

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4.0,
        purchasable: false,
        purchasing: false
    }

    purchasingHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0)

        this.setState({purchasable: sum > 0});
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceAddition = INGRIDIENT_PROCES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        })
        this.updatePurchaseState(updateIngredients);
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCounted = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceDeduction = INGRIDIENT_PROCES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingridientAdd={this.addIngridientHandler}
                    ingridientRemove={this.removeIngridientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disableInfo}
                    ordered={this.purchasingHandler}
                     />
            </Aux>
        );
    }
}

export default BurgerBuilder;