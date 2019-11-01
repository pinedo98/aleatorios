import React from "react";
import Head from 'next/head';


export default class Layout extends React.Component {
	render() {
		return (
			<section>
				<Head>
          <meta charSet='UTF-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
          <title>Números aleatorios</title>

          {/* <link rel='apple-touch-icon' sizes='57x57' href='/static/images/favicons/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/static/images/favicons/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/static/images/favicons/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/static/images/favicons/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/static/images/favicons/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/static/images/favicons/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/static/images/favicons/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/static/images/favicons/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/images/favicons/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='192x192' href='/static/images/favicons/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/images/favicons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/static/images/favicons/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/images/favicons/favicon-16x16.png' />
          <link rel='manifest' href='/static/images/favicons/manifest.json' /> */}
          <meta name='msapplication-TileColor' content='#ffffff' />
          {/* <meta name='msapplication-TileImage' content='/static/images/favicons/ms-icon-144x144.png' /> */}
          <meta name='theme-color' content='#ffffff' />
        </Head>
        
        {this.props.children}

				<style jsx global>{`
					@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap');

					body {
            font-family: 'Roboto', sans-serif;
          }

          h1 {
            font-size: 26px;
          }

          hr {
            
          }

          button {
            background: #2661f8;
            border-radius: 3px;
            box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
            color: white;
            font-size: 14px;
            font-family: 'Roboto', sans-serif;
            padding: 10px;
            padding-left: 20px;
            white-space: nowrap;
            padding-right: 20px;
            border: none;
            text-align: center;
            outline: none;
            cursor: pointer;
            margin-top: 20px;
          }

          input, select {
            -webkit-transition: all 0.2s ease-in-out;
            -moz-transition: all 0.2s ease-in-out;
            -ms-transition: all 0.2s ease-in-out;
            -o-transition: all 0.2s ease-in-out;
            background: #ffffff;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            padding-left: 10px;
            outline: none;
            border: 1px solid #dddddd;
            font-size: 14px;
          }

          @media only screen and (max-width: 700px) {
            button {
							width: 100%;
						}
          }
				`}
				</style>
			</section>
		);
	}
}