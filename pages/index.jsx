import React from "react";
import Congruencial from '../components/Congruencial'
import Step from '../components/Step'


export default class Aleatorios extends React.Component {
	state = {}
	
	render() {
		return (
			<section className='container'>
				<h1>Generador de números pseudoaleatorios</h1>
				<Step number='1' title='Algoritmo'>
					<select onChange={(e) => this.setState({ algorithm: e.target.value })}>
						<option value="cuadrados">Cuadrados Medios</option>
						<option value="congruencial">Congruencial Multiplicativo</option>
						<option value="multiplicador">Multiplicador Constante</option>
					</select>
				</Step>

				<Step number='2' title='Parámetros'>
					{this.state.algorithm == 'congruencial' && <Congruencial />}
				</Step>
				<style jsx>{`
					.container {
						padding: 30px;
					}
				`}
				</style>
			</section>
		);
	}
}