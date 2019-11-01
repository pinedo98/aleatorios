import React from "react";
import Congruencial from '../components/Congruencial'
import Cuadrados from '../components/Cuadrados'
import Multiplicador from '../components/Multiplicador'
import Step from '../components/Step'

import { getProbability } from '../utils/tests'
import Input from "../components/Input";



export default class Aleatorios extends React.Component {
	state = {
		algorithm: "cuadrados"
	}

	runTests() {
		
	}

	render() {
		getProbability(15.95);

		console.log(this.state)

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
					{this.state.algorithm == 'congruencial' && <Congruencial onGenerate={results => this.setState({ results })} />}
					{this.state.algorithm == 'multiplicador' && <Multiplicador onGenerate={results => this.setState({ results })} />}
					{this.state.algorithm == 'cuadrados' && <Cuadrados onGenerate={results => this.setState({ results })} />}
				</Step>

				{this.state.results &&
					<section>
						<Step number='3' title='Resultados'>
							<div className='numbers'>
								{this.state.results.numbers.map((number, index) => (
									<span className='number' key={index}>{number}</span>
								))}
							</div>
						</Step>

						<Step number='4' title='Pruebas de aletoriedad'>
							<Input label="Porcentaje de probabilidad" onChange={e => this.setState({ probability: e.target.value })} />
							<button onClick={() => this.runTests()}>Validar</button>
						</Step>
					</section>
				}




				<style jsx>{`
					.container {
						padding: 30px;
					}

					.number {
						margin-right: 20px;
					}

					.number:hover{
						font-size: larger;
					}

					.numbers {
						overflow-x: scroll;
						height: 40px;
						display: flex;
						align-items: center;
					}
				`}
				</style>
			</section>
		);
	}
}