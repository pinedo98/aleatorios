import React from "react";
import Input from './Input'

export default class Congruencial extends React.Component {
	state = {}

	render() {
		return (
			<section className='container'>
				<div>
					<Input label='Semilla' onChange={() => this.setState({ seed: e.target.value }) }/>
					<Input label='Constante Multiplicativa' onChange={() => this.setState({ constant: e.target.value }) }/>
					<Input label='Módulo' onChange={() => this.setState({ module: e.target.value }) }/>


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