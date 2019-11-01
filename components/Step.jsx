const Step = ({number, title, children}) => (
	<div className='container'>
		<div className='title-container'>
			<h3 className='title'>{number}</h3>
			<h3>{title}</h3>
		</div>
		<hr />
		{children}
		<style jsx>{`
			.container {
				margin: 20px 0;
			}

			.title-container {
				display: flex;
			}

			.title {
				margin-right: 10px;

			}
		`}
		</style>
	</div>
)

export default Step;
