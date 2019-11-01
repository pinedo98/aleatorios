import React from "react";
import Input from './Input'
import {generateWithCongruencial} from '../utils/algorithms'

export default class Congruencial extends React.Component {
	state = {}

	generate() {
		let numbers = generateWithCongruencial(this.state.seed, this.state.constant, this.state.mod, this.state.add);

		let results = {
			numbers
		}

		console.log(results);

		this.props.onGenerate(results);
	}

	render() {
		return (
			<section className='container'>
				<div>
					<Input label='Semilla' onChange={e => this.setState({ seed: e.target.value }) }/>
					<Input label='Constante Multiplicativa K' onChange={e => this.setState({ constant: e.target.value }) }/>
					<Input label='A sumar' onChange={e => this.setState({ add: e.target.value }) }/>
					<Input label='Módulo' onChange={e => this.setState({ mod: e.target.value }) }/>

					<button onClick={() => this.generate()}> Generar </button>
				</div>
				<style jsx>{`
					.container {
					
					}
				`}
				</style>
			</section>
		);
	}
}