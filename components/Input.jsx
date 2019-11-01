const Input = ({label, onChange}) => (
	<div className='container'>
		<span className='label'>{label}</span>
		<input className='input' type='number' name='seed' onChange={(e) => onChange(e)} />
		<style jsx>{`
			.label {
				margin-right: 10px;
			}

			.input {
				width: 70px;
			}

			.container {
				margin: 10px 0;
				width: 200px;
				display: flex;
				justify-content: space-between;
			}
		`}
		</style>
	</div>
)

export default Input;
