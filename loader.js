class Loader {
	#count = 0;
	#status = {};

	constructor ( params )
	{
		this.params = Object.assign ( {
			parent: document.body,
			type: "spin",
			size: 80,
			thickness: 10,
			background: undefined,
		}, params );


		this.domEls = {
			text: {},
			main: undefined,
			spin: undefined,
			content: undefined,
		};

		this.domEls.main = document.createElement ( "div" );
		this.params.parent.appendChild ( this.domEls.main );
		Object.assign ( this.domEls.main.style, {
			height: this.params.size+"px",
			width: this.params.size+"px",
			position: "fixed",
			top: "calc( 50% - 40px )",
			left: "calc( 50% - 40px )",
			display: "none",
		});

		this.domEls.spin = document.createElement ( "div" );
		this.domEls.main.appendChild ( this.domEls.spin );
		Object.assign (this.domEls.spin.style, {
			position: "absolute",
			top: "-"+this.params.thickness+"px",
			left: "-"+this.params.thickness+"px",
			background: this.params.background,

			border: "solid "+this.params.thickness+"px rgba(0, 0, 0, 0.5)",
			borderBottomColor: "rgb(255, 0, 0)",
			borderRadius: "50%",
			width: "100%",
			height: "100%",
			animation: "1.5s linear infinite spinner",
		} );

		this.domEls.spin.animate([
				// key frames
				{ transform: 'rotate(0deg)' },
				{ transform: 'rotate(360deg)' }
			], {
				// sync options
				duration: 1500,
				iterations: Infinity
			});


		this.domEls.content = document.createElement ( "div" );
		this.domEls.main.appendChild ( this.domEls.content );
		Object.assign (this.domEls.content.style, {
			position: "absolute",
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			top: 0,
			left: 0,
		} );
	}

	/// \param [ in ] status :
	///     true : loading
	///     false : done
	/// \param [ in ] test : text who should be deisplayed
	/// \param [ in ] id : id of the loader status, used if multiple loading in parallele
	show ( status, text = undefined, id = 0 )
	{
		this.updateText ( text, id );

		if ( status == this.#status[ id ] )
		{ // nothing to be done
		}
		else if ( status )
		{
			this.#count ++;
		}
		else
		{
			this.#count --;
		}

		this.#status[ id ] = status;

		this.domEls.main.style.display = ( this.#count != 0 )? "": "none";
	}

	/// \param [ in ] test : text who should be deisplayed
	/// \param [ in ] id : id of the loader status, used if multiple loading in parallele
	updateText ( text = undefined, id = 0 )
	{
		if ( undefined == id )
		{
			throw "Id couldn't be set as undefined";
		}

		if ( !text
			&& this.domEls.text[ id ] )
		{
			this.domEls.text[ id ].parentNode.removeChild ( this.domEls.text[ id ] );
			delete this.domEls.text[ id ];
		}
		else if ( !this.domEls.text[ id ] )
		{
			this.domEls.text[ id ] = document.createElement ( "div" );
			this.domEls.content.appendChild ( this.domEls.text[ id ] );
		}

		if ( this.domEls.text[ id ] )
		{
			this.domEls.text[ id ].innerText = text;
		}
	}
}