module.exports = (grunt) ->
    grunt.initConfig
        compass:
            dist:
                options:
                    config: "config.rb"

        cssmin:
            compress:
                files:
                    "./demo/css/style.min.css": [
                        "demo/css/*.css"
                        "!demo/css/style.min.css"
                    ]

        watch:
            sass:
                files: ["demo/sass/*.scss"]
                tasks: [
                    "compass"
                    "cssmin"
                ]

    grunt.loadNpmTasks "grunt-contrib-cssmin"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-compass"
    grunt.registerTask "default", "Log some stuff.", ->
    grunt.log.write("Logging some stuff...").ok()
