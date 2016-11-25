module.exports =  function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			build: {
				src: ['app/*.js','app/*/*.js' ],
				dest: 'app_min.js'
			}
		}
	});
	
	grunt.registerTask('default', ['uglify']);
};