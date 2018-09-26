
const gulp = require("gulp");
const babel = require("gulp-babel");

// gulp.task("es6", function(){
//     return gulp.src("app.js").pipe(babel({
//         presets: ['@babel/env']
//     })).pipe(gulp.dest("dist"))
// });

// gulp.task("watch", function(){
//     gulp.watch(["app.js",["es"]]);
// });

// gulp.task("default",["watch"]);

gulp.task('default', function () {
    console.log(111);
    
    return gulp.src('app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
}

);