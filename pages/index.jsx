import React from "react";
import Head from 'next/head';

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

	render() {
		console.log(this.state)

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
										<span className='number' key={index}>{number}</span>
									))}
								</div>
							</Step>

							<Step number='4' title='Pruebas de aletoriedad'>
								Porcentaje de probabilidad
								<div className="percentage">
									<div className="slidecontainer">
										<input type="range" min="1" max="100" className="slider" value={this.state.percentage} onChange={e => this.setState(({ percentage: e.target.value }))} />
									</div>
									{this.state.percentage}%
								</div>

								<button onClick={() => this.setState(({ tests: true }))}>Validar</button>
							</Step>
						</section>
					}

					{this.state.tests && <section>
						<Step number='5' title='Resultados de pruebas'>
							<div className='tests'>
								<TestResult {...validateMedias((100 - this.state.percentage) / 100, this.state.results.numbers)} />
								<TestResult {...validateVarianza((100 - this.state.percentage) / 100, this.state.results.numbers)} />
								<TestResult {...validateUniformidad((100 - this.state.percentage) / 100, this.state.results.numbers)} />
								<TestResult {...validateIndependencia((100 - this.state.percentage) / 100, this.state.results.numbers)} />
							</div>
						</Step>
					</section>}

					<section className='footer-container'>
						<p>Desarrollado por Fernando Pinedo</p>
						<h5>
							Para la materia de Simulación en el Instituto Tecnológico de Saltillo con la ayuda de MII. Adriana Cavazos Treviño
						</h5>
						<a href="https://github.com/pinedo98/aleatorios">Repositorio en Github</a>
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
					overflow-x: scroll;
					height: 40px;
					display: flex;
					align-items: center;
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