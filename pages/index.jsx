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
		console.log(validateUniformidad(.05, [0.347, 0.832, 0.966, 0.472, 0.797, 0.101, 0.696, 0.966, 0.404, 0.603,
			0.993, 0.371, 0.729, 0.067, 0.189, 0.977, 0.843, 0.562, 0.549, 0.992,
			0.674, 0.628, 0.055, 0.494, 0.494, 0.235, 0.178, 0.775, 0.797, 0.252,
			0.426, 0.054, 0.022, 0.742, 0.674, 0.898, 0.641, 0.674, 0.821, 0.19,
			0.46, 0.224, 0.9, 0.786, 0.393, 0.461, 0.011, 0.977, 0.246, 0.881,
			0.189, 0.753, 0.73, 0.707, 0.292, 0.876, 0.707, 0.562, 0.562, 0.821,
			0.112, 0.191, 0.584, 0.347, 0.426, 0.057, 0.819, 0.303, 0.404, 0.64,
			0.37, 0.314, 0.731, 0.742, 0.213, 0.472, 0.641, 0.944, 0.28, 0.663,
			0.909, 0.764, 0.999, 0.303, 0.718, 0.933, 0.056, 0.415, 0.816, 0.444,
			0.178, 0.516, 0.437, 0.393, 0.268, 0.123, 0.945, 0.527, 0.459, 0.652]))
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