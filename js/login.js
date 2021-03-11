const plugin = $B.init({
	name: 'loginV2',
	load: 'template_engine',
	device: true,
		// TO TEST ON LAB -> USER: real@real.com
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'+
	'eyJkZXYiOnRydWUsImFsaWFzIjoic2hfZ3ZQcUlkV1FoQUlJY21TRUliIiwi'+
	'ZGF0ZSI6IjIwMjEtMDItMjRUMDY6MDU6MjAuNjA1WiIsImlhdCI6MTYxNDE0NjcyMH0.'+
	'S6FWVZTzwAqnqyy1-3GL3BuE5cMGRLmHT_ww0MlsOWY',
		// TO TEST ON LAB -> USER: real@real.com
	pluginId: 'plugin-FmIcrbLdoKOCYuRY6045ecab4b851fXONChsCBtNuPDBf',
	framework: 'framework7'
});

plugin.then(function(loaded){

	bim.app.template({
	  id: bim.plugin.id.get(),
		html: 'templates/signup.html',
	  context: {
			lang: 'lang/signup-en',
			detect: false
		},
	  name: bim.plugin.name.get()
	})
	.then(function(compiled){

		if(!compiled.error) $B.append({$:'.page-content'}, compiled.template);
	})

	// CREATE A NEW SCREEN

	$B.event({$:'.show-login', on:'click'}, function(){

		var page = {
			page:{
				name: 'login',
				context: {
					lang: 'lang/login-en',
					detect: false
				},
				content: 'templates/login.html',
				animate: true
			},
		};

		bim.app.page(page, function(){

			console.log('trigger after opened ', this);
		});
	});

	$B.event({$:'.signup', on:'click'}, function(){
		
		var formData =  app.formToData('.signup-form');

		var date = new Date();
		var datetime = date.getTime();

		var params = {
		 query:[
		  {
		   // Query type to be executed: UPDATE, INSERT, DELETE
		   query:  'INSERT',
		   // Table created called 'feeds'
		   table: 'loginV2',
		   rows:{
		    // title and object are the row names of the table created
		    // Example rows:{ myTableRowName: 'custom value to insert' }
		    email: formData.email,
		    pass: formData.password,
				username: formData.username,
				uid: 'uid-87bksj7bsbdMLDSMS',
				date: date,
				datetime: datetime,
				active: 1
		   }
		  }
		 ],
		 env: 'dev',
		 pluginId: bim.plugin.id.get()
		};

		bim.db.query(params,  function(res){

		  console.log(res);
		  if(res.error) app.alert(res.message);
		});
	});
});

// SIGNUP
$B.event({$:'.login', on:'click'}, function(){

	var formData =  app.formToData('.login-form');

	var date = new Date();
	var datetime = date.getTime();

	var params = {
	 query:[
		{
		 // Query type to be executed: UPDATE, INSERT, DELETE
		 query:  'SELECT',
		 // Table created called 'feeds'
		 table: 'loginV2',
		 where: {
			 email: formData.email,
			 pass: formData.password
		 }
		}
	 ],
	 env: 'dev',
	 pluginId: bim.plugin.id.get()
	};

	bim.db.query(params,  function(res){

		if(res.error) app.alert(res.message);

		bim.app.session({user: res[0].data[0].username, uid: res[0].data[0].uid}, function(r){

			console.log('user ', r);
			// leave empty to close plugin and load next
			// plugin on the storyboard
			bim.plugin.close();
			// If run specific screen
			// bim.plugin.close({screen: 'screenId'});
			// If run specific plugin
			// bim.plugin.close({plugin: 'pluginId'});
		});

		return;
	});
});
