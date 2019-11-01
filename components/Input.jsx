const Input = ({label, onChange, ...props}) => (
	<div className='container'>
		<span className='label'>{label}</span>
		<input className='input' type='number' name='seed' onChange={(e) => onChange(e)} {...props} />
		<style jsx>{`
			.label {
				margin-right: 10px;
			}

			.input {
			}

			.container {
				margin: 10px 0;
				max-width: 380px;
				display: flex;
				justify-content: space-between;
			}
		`}
		</style>
	</div>
)

export default Input;
