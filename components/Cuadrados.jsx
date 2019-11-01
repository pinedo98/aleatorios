import React from "react";
import Input from './Input'
import {generateWithCuadrados} from '../utils/algorithms'

export default class Cuadrados extends React.Component {
	state = {}

	generate() {
		let numbers = generateWithCuadrados(this.state.seed);
		let mediaTest = false;
		let varianzaTest = false;
		let independenciaTest = false;
		let uniformidadTest = false;

		let results = {
			numbers, mediaTest, varianzaTest, independenciaTest, uniformidadTest
		}

		console.log(results);

		this.props.onGenerate(results);
	}

	render() {
		return (
			<section className='container'>
				<div>
					<Input label='Semilla' onChange={e => this.setState({ seed: e.target.value }) }/>

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