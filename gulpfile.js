// Gulp.js configuration
const
    // modules
    gulp = require("gulp"),
    header = require("gulp-header"),
    htmlmin = require("gulp-htmlmin"),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    pump = require("pump");

    // development mode?
    devBuild = (process.env.NODE_ENV !== "production"),

    // HTML processing
    gulp.task("html-min", function(cb) {
        pump([
            gulp.src("index.html"),
            htmlmin({
                collapseWhitespace: true,
                conservativeCollapse: true
            }),
            header("<!-- To see the unminified version visit https://github.com/oskarwilczynski/day-or-night/blob/master/index.html -->\n\n"),
            gulp.dest("dist/")
        ], cb);
    });

    // CSS processing
    gulp.task("css-min", function(cb) {
        pump([
            gulp.src("css/main.css"),
            autoprefixer(),
            cssnano(),
            header("/* To see the unminified version visit https://github.com/oskarwilczynski/day-or-night/blob/master/css/main.css */\n\n"),
            gulp.dest("dist/css/")
        ], cb);
    });

    // JS + Babel processing
    gulp.task("js-min", function(cb) {
        pump([
            gulp.src("js/main.js"),
            babel({presets: ["@babel/preset-env"]}),
            uglify(),
            header("// To see the unminified version visit https://github.com/oskarwilczynski/day-or-night/blob/master/js/main.js\n\n"),
            gulp.dest("dist/js/")
        ], cb);
    });

    // run all tasks
    gulp.task("min-all", gulp.parallel("html-min", "css-min", "js-min"));

;
