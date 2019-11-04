import React from "react";

import Congruencial from '../components/Congruencial'
import Cuadrados from '../components/Cuadrados'
import Multiplicador from '../components/Multiplicador'
import Step from '../components/Step'
import { validateMedias, validateUniformidad, validateVarianza, validateIndependencia } from '../utils/tests'
import Layout from "../components/Layout";

const TestResult = ({ name, results, conclussion }) => (
	<div className='container'>
		<h4 className="title">{name}</h4>
		<p>{results}</p>
		<p>{conclussion}</p>
		<style jsx>{`
			.container {
				margin: 20px 0;
				margin-right: 15px;
				width: 250px;
			}

			.title {
				margin-right: 10px;
			}
		`}
		</style>
	</div>
)


export default class Aleatorios extends React.Component {
	state = {
		algorithm: "cuadrados",
		percentage: "90"
	}

	runTests() {
		let tests = {};
		let alpha = (100 - this.state.percentage) / 100;
		tests.medias = validateMedias(alpha, this.state.results.numbers);
		tests.varianza = validateVarianza(alpha, this.state.results.numbers);
		tests.independencia = validateIndependencia(alpha, this.state.results.numbers);
		tests.uniformidad = validateUniformidad(alpha, this.state.results.numbers);
		tests.conclussion = tests.medias.success && tests.varianza.success && tests.independencia.success && tests.uniformidad.success;
		this.setState({ tests });
	}

	render() {
		return (
			<Layout>
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
							<Step number='3' title='Números generados'>
								<div className='numbers'>
									{this.state.results.numbers.map((number, index) => (
										<span className='number' key={index}>{number.toFixed(4)}</span>
									))}
								</div>
								Cantidad de números generados: {this.state.results.numbers.length}
							</Step>

							<Step number='4' title='Pruebas de aletoriedad'>
								Porcentaje de probabilidad
								<div className="percentage">
									<div className="slidecontainer">
										<input type="range" min="0" max="100" step="5" className="slider" value={this.state.percentage} onChange={e => this.setState(({ percentage: e.target.value }))} />
									</div>
									{this.state.percentage}%
								</div>

								<button onClick={() => this.runTests()}>Validar</button>
							</Step>
						</section>
					}

					{this.state.tests && <section>
						<Step number='5' title='Resultados de pruebas'>
							<div className='tests'>
								<TestResult {...this.state.tests.medias} />
								<TestResult  {... this.state.tests.varianza} />
								<TestResult {...this.state.tests.independencia} />
								<TestResult {...this.state.tests.uniformidad} />
							</div>
							<h3>Conclusión final</h3>
							<p>El conjunto generado <b>{this.state.tests.conclussion ? '' : 'no'}</b> cumple con las propiedades de los números pseudoaleatorios.</p>
						</Step>
					</section>}

					<section className='footer-container'>
						<p>Desarrollado por Fernando Pinedo</p>
						<h5>
							Para la materia de Simulación en el Instituto Tecnológico de Saltillo con la ayuda de MII. Adriana Cavazos Treviño
						</h5>
						<a href="https://github.com/pinedo98/aleatorios" target="_blank" >Repositorio en Github</a>
					</section>
				</section>
				<style jsx>{`

				.footer-container {
					display: flex;
					flex-direction: column;
					text-align: center;

					margin-top: 40px;
					
					justify-content: center;
					align-items: center;
					
					width: 100%; 
					bottom: 0;
				}

				.container {
					padding: 30px;
				}

				.percentage {
					display: flex;
					margin-bottom: 10px;
				}

				.number {
					margin-right: 20px;
				}

				.number:hover{
					font-size: larger;
				}

				.numbers {
					overflow-x: auto;
					height: 40px;
					display: flex;
					align-items: center;
					margin: 10px;
				}

				.slidecontainer {
					width: 70%; /* Width of the outside container */
					margin-right: 10px;
				}

				.tests {
					display: flex;
					flex-wrap: wrap;
				}

				.slider {
					-webkit-appearance: none;
					width: 90%;
					height: 2px;
					border-radius: 5px;
					background: #d3d3d3;
					outline: none;
					opacity: 0.7;
					-webkit-transition: .2s;
					-webkit-transition: opacity .2s;
					transition: opacity .2s;
				}

				.slider::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					width: 15px;
					height: 15px;
					border-radius: 50%; 
					background: #2661f8;
					cursor: pointer;
				}

				.slider::-moz-range-thumb {
					width: 15px;
					height: 15px;
					border-radius: 50%;
					background: #2661f8;
					cursor: pointer;
				}

			`}
				</style>

			</Layout>
		);
	}
}