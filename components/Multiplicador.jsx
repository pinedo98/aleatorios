import React from "react";
import Input from './Input'
import { generateWithMultiplicador } from "../utils/algorithms";

export default class Multiplicador extends React.Component {
	state = {}

	generate() {
		let numbers = generateWithMultiplicador(this.state.seed, this.state.a);

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
					<Input label='Semilla' onChange={e => this.setState({ seed: e.target.value }) } placeholder='Más de 3 dígitos'/>
					<Input label='Constante Multiplicativa a' onChange={e => this.setState({ a: e.target.value }) } placeholder='Más de 3 dígitos'/>

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