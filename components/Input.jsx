const Input = ({label, onChange, ...props}) => (
	<div className='container'>
		<span className='label'>{label}</span>
		<input className='input' type='number' name='seed' onChange={(e) => onChange(e)} {...props} />
		<style jsx>{`
			.label {
				margin-right: 10px;
			}

			.input {
				max-width: 380px;
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
